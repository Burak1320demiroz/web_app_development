const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// JSON'u ayrıştırmak için ara yazılım
app.use(bodyParser.json());

const SECRET_KEY = "your_secret_key"; // Güvenli bir secret belirleyin

// Örnek veritabanı
let users = [
  { email: 'burak@gmail.com', password: 'Test.123', name: 'Burak', lastName: 'Demiroz', dob: '01-01-1999' }
];

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

  // Kullanıcı kaydet
  users.push({ email, password, name, lastName, dob });
  res.status(200).json({ status: true, errorMessage: '' });
});

// Kullanıcı girişi
app.post('/user/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(400).json({ status: false, errorMessage: 'Invalid email or password', token: '' });
  }

  const token = jwt.sign({ email: user.email, name: user.name }, SECRET_KEY, { expiresIn: '1h' });
  res.status(200).json({ status: true, errorMessage: '', token });
});

// Kullanıcı bilgilerini getirme
app.get('/user/me', (req, res) => {
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
    res.status(200).json({ id: user.email, name: user.name, lastName: user.lastName, dob: user.dob });
  } catch (err) {
    res.status(401).json({ status: false, errorMessage: 'Invalid token' });
  }
});

// Kullanıcı bilgilerini güncelleme
app.put('/user/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: false, errorMessage: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    let user = users.find(u => u.email === decoded.email);
    if (!user) {
      return res.status(404).json({ status: false, errorMessage: 'User not found' });
    }
    
    const { name, lastName, dob } = req.body;
    if (name) user.name = name;
    if (lastName) user.lastName = lastName;
    if (dob) user.dob = dob;
    
    res.status(200).json({ status: true, errorMessage: '' });
  } catch (err) {
    res.status(401).json({ status: false, errorMessage: 'Invalid token' });
  }
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
