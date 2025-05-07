const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

// JSON'u ayrıştırmak için ara yazılım
app.use(bodyParser.json());

// Statik dosyaları serve et
app.use(express.static(path.join(__dirname, 'public')));

// Ana sayfa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const SECRET_KEY = "your_secret_key"; // Güvenli bir secret belirleyin

// Kullanıcı rollerini tanımla
const ROLES = {
  VISITOR: 'visitor',
  USER: 'user',
  ADMIN: 'admin'
};

// Örnek veritabanı - 3 farklı kullanıcı eklendi
let users = [
  { 
    email: 'visitor@example.com', 
    password: 'Visitor.123', 
    name: 'Visitor', 
    lastName: 'Anonymous', 
    dob: '01-01-2000',
    role: ROLES.VISITOR,
    permissions: ['read'] 
  },
  { 
    email: 'user@example.com', 
    password: 'User.123', 
    name: 'Regular', 
    lastName: 'User', 
    dob: '02-02-1995',
    role: ROLES.USER,
    permissions: ['read', 'write'] 
  },
  { 
    email: 'admin@example.com', 
    password: 'Admin.123', 
    name: 'Super', 
    lastName: 'Admin', 
    dob: '03-03-1990',
    role: ROLES.ADMIN,
    permissions: ['read', 'write', 'delete', 'admin'] 
  }
];

// Yetki kontrol middleware'i
function checkPermission(requiredPermission) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ status: false, errorMessage: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const user = users.find(u => u.email === decoded.email);
      
      if (!user) {
        return res.status(404).json({ status: false, errorMessage: 'User not found' });
      }
      
      if (!user.permissions.includes(requiredPermission)) {
        return res.status(403).json({ status: false, errorMessage: 'Forbidden - Insufficient permissions' });
      }
      
      req.user = user; // Kullanıcı bilgisini request'e ekle
      next();
    } catch (err) {
      res.status(401).json({ status: false, errorMessage: 'Invalid token' });
    }
  };
}

// Kullanıcı kaydı
app.post('/user/register', (req, res) => {
  const { email, password, name, lastName, dob } = req.body;

  // E-posta kontrolü
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ status: false, errorMessage: 'Email already registered' });
  }

  // Parola uzunluğu doğrulama
  if (password.length < 3 || password.length > 12) {
    return res.status(400).json({ status: false, errorMessage: 'Password must be between 3 and 12 characters' });
  }

  // Varsayılan olarak USER rolü atanır
  const newUser = { 
    email, 
    password, 
    name, 
    lastName, 
    dob,
    role: ROLES.USER,
    permissions: ['read', 'write'] // Varsayılan izinler
  };
  
  users.push(newUser);
  res.status(200).json({ status: true, errorMessage: '' });
});

// Kullanıcı girişi
app.post('/user/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(400).json({ status: false, errorMessage: 'Invalid email or password', token: '' });
  }

  const token = jwt.sign({ 
    email: user.email, 
    name: user.name,
    role: user.role,
    permissions: user.permissions 
  }, SECRET_KEY, { expiresIn: '1h' });
  
  res.status(200).json({ 
    status: true, 
    errorMessage: '', 
    token,
    user: {
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      role: user.role
    }
  });
});

// Kullanıcı bilgilerini getirme (sadece oturum açanlar)
app.get('/user/me', checkPermission('read'), (req, res) => {
  const user = req.user;
  res.status(200).json({ 
    id: user.email, 
    name: user.name, 
    lastName: user.lastName, 
    dob: user.dob,
    role: user.role
  });
});

// Kullanıcı bilgilerini güncelleme (sadece yazma izni olanlar)
app.put('/user/me', checkPermission('write'), (req, res) => {
  const user = req.user;
  const { name, lastName, dob } = req.body;
  
  if (name) user.name = name;
  if (lastName) user.lastName = lastName;
  if (dob) user.dob = dob;
  
  res.status(200).json({ status: true, errorMessage: '' });
});

// Sadece adminlerin erişebileceği kullanıcı listesi
app.get('/admin/users', checkPermission('admin'), (req, res) => {
  // Şifreleri göstermeden kullanıcı listesini döndür
  const userList = users.map(user => ({
    email: user.email,
    name: user.name,
    lastName: user.lastName,
    dob: user.dob,
    role: user.role,
    permissions: user.permissions
  }));
  
  res.status(200).json(userList);
});

// Admin paneli için HTML sayfası
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Fonksiyon denemesi için test endpoint'i
app.get('/test', (req, res) => {
  // Farklı kullanıcı tiplerini test etmek için fonksiyon
  const testFunction = () => {
    return {
      visitor: users.find(u => u.role === ROLES.VISITOR),
      user: users.find(u => u.role === ROLES.USER),
      admin: users.find(u => u.role === ROLES.ADMIN)
    };
  };
  
  const testResults = testFunction();
  res.status(200).json({
    message: "Fonksiyon testi başarılı",
    results: testResults
  });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Test kullanıcıları:');
  console.log('1. Visitor - email: visitor@example.com, password: Visitor.123');
  console.log('2. Regular User - email: user@example.com, password: User.123');
  console.log('3. Admin - email: admin@example.com, password: Admin.123');
});