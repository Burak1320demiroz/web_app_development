const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// JSON'u ayrıştırmak için ara yazılım
app.use(bodyParser.json());

// Statik dosyaları serve et
app.use(express.static(path.join(__dirname, 'public')));

// Ana sayfa - herkes erişebilir
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Kullanıcı rollerini tanımla
const ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

// Örnek veritabanı - 2 farklı kullanıcı eklendi
let users = [
  { 
    email: 'user@example.com', 
    password: 'User.123', 
    name: 'Regular', 
    lastName: 'User', 
    role: ROLES.USER
  },
  { 
    email: 'admin@example.com', 
    password: 'Admin.123', 
    name: 'Super', 
    lastName: 'Admin', 
    role: ROLES.ADMIN
  }
];

// Kullanıcı girişi
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(400).json({ status: false, errorMessage: 'Invalid email or password' });
  }
  
  res.status(200).json({ 
    status: true, 
    errorMessage: '', 
    user: {
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      role: user.role
    }
  });
});

// User endpoint'i - Sadece giriş yapmış kullanıcılar erişebilir
app.get('/user', (req, res) => {
  const { email, password } = req.query;
  
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ status: false, errorMessage: 'Unauthorized' });
  }
  
  res.status(200).json({
    message: "User dashboard",
    user: {
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      role: user.role
    }
  });
});

// Admin endpoint'i - Sadece admin erişebilir
app.get('/admin', (req, res) => {
  const { email, password } = req.query;
  
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ status: false, errorMessage: 'Unauthorized' });
  }
  
  if (user.role !== ROLES.ADMIN) {
    return res.status(403).json({ status: false, errorMessage: 'Forbidden - Admin access required' });
  }
  
  res.status(200).json({
    message: "Admin dashboard",
    users: users.map(user => ({
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      role: user.role
    }))
  });
});

// Şifre karmaşıklığını kontrol eden fonksiyon
function isPasswordValid(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChars
  );
}

// Email formatını kontrol eden fonksiyon
function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Kullanıcı kayıt endpoint'i
app.post('/register', (req, res) => {
  const { email, password, name, lastName } = req.body;

  // Gerekli alan kontrolü
  if (!email || !password || !name || !lastName) {
    return res.status(400).json({
      status: false,
      errorMessage: 'Tüm alanlar zorunludur (email, password, name, lastName)'
    });
  }

  // Email format kontrolü
  if (!isEmailValid(email)) {
    return res.status(400).json({
      status: false,
      errorMessage: 'Geçersiz email formatı'
    });
  }

  // Şifre karmaşıklık kontrolü
  if (!isPasswordValid(password)) {
    return res.status(400).json({
      status: false,
      errorMessage: 'Şifre en az 8 karakter uzunluğunda olmalı ve büyük harf, küçük harf, sayı ve özel karakter içermelidir'
    });
  }

  // Email'in zaten kayıtlı olup olmadığını kontrol et
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({
      status: false,
      errorMessage: 'Bu email adresi zaten kayıtlı'
    });
  }

  // Yeni kullanıcı oluştur (varsayılan rol: user)
  const newUser = {
    email,
    password, // Gerçek uygulamada burada şifreyi hashlemelisiniz!
    name,
    lastName,
    role: ROLES.USER // Varsayılan olarak user rolü atanır
  };

  users.push(newUser);

  res.status(201).json({
    status: true,
    errorMessage: '',
    user: {
      email: newUser.email,
      name: newUser.name,
      lastName: newUser.lastName,
      role: newUser.role
    }
  });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Test kullanıcıları:');
  console.log('1. User - email: user@example.com, password: User.123');
  console.log('2. Admin - email: admin@example.com, password: Admin.123');
});