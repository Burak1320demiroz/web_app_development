# Node.js API Documentation

## User Login

**Endpoint:** `POST http://localhost:3000/login`

### Request
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "user@example.com",
  "password": "User.123"
}
```

### Responses
**Success (200 OK):**
```json
{
  "status": true,
  "errorMessage": "",
  "user": {
    "email": "user@example.com",
    "name": "Regular",
    "lastName": "User",
    "role": "user"
  }
}
```

**Error (400 Bad Request) - Invalid credentials:**
```json
{
  "status": false,
  "errorMessage": "Invalid email or password"
}
```

---

## User Dashboard

**Endpoint:** `GET http://localhost:3000/user`

### Request
**Query Parameters:**
```
email=user@example.com&password=User.123
```

### Responses
**Success (200 OK):**
```json
{
  "message": "User dashboard",
  "user": {
    "email": "user@example.com",
    "name": "Regular",
    "lastName": "User",
    "role": "user"
  }
}
```

**Error (401 Unauthorized):**
```json
{
  "status": false,
  "errorMessage": "Unauthorized"
}
```

---

## Admin Dashboard (Admin Only)

**Endpoint:** `GET http://localhost:3000/admin`

### Request
**Query Parameters:**
```
email=admin@example.com&password=Admin.123
```

### Responses
**Success (200 OK):**
```json
{
  "message": "Admin dashboard",
  "users": [
    {
      "email": "user@example.com",
      "name": "Regular",
      "lastName": "User",
      "role": "user"
    },
    {
      "email": "admin@example.com",
      "name": "Super",
      "lastName": "Admin",
      "role": "admin"
    }
  ]
}
```

**Error (401 Unauthorized):**
```json
{
  "status": false,
  "errorMessage": "Unauthorized"
}
```

**Error (403 Forbidden - Not Admin):**
```json
{
  "status": false,
  "errorMessage": "Forbidden - Admin access required"
}
```

---

## Test Users

1. **Regular User:**
   - Email: `user@example.com`
   - Password: `User.123`

2. **Admin User:**
   - Email: `admin@example.com`
   - Password: `Admin.123`

## Kullanıcı Kayıt (Register) Endpoint'i

**Endpoint:** `POST http://localhost:3000/register`

### İstek Örneği
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "yeni@kullanici.com",
  "password": "GucluSifre123!",
  "name": "Yeni",
  "lastName": "Kullanıcı"
}
```

### Başarılı Yanıt (201 Created)
```json
{
  "status": true,
  "errorMessage": "",
  "user": {
    "email": "yeni@kullanici.com",
    "name": "Yeni",
    "lastName": "Kullanıcı",
    "role": "user"
  }
}
```

### Hata Yanıtları

**400 Bad Request - Eksik Alanlar**
```json
{
  "status": false,
  "errorMessage": "Tüm alanlar zorunludur (email, password, name, lastName)"
}
```

**400 Bad Request - Geçersiz Email Formatı**
```json
{
  "status": false,
  "errorMessage": "Geçersiz email formatı"
}
```

**400 Bad Request - Zayıf Şifre**
```json
{
  "status": false,
  "errorMessage": "Şifre en az 8 karakter uzunluğunda olmalı ve büyük harf, küçük harf, sayı ve özel karakter içermelidir"
}
```

**400 Bad Request - Email Zaten Kayıtlı**
```json
{
  "status": false,
  "errorMessage": "Bu email adresi zaten kayıtlı"
}
```

## Şifre Karmaşıklık Kuralları

- En az 8 karakter
- En az 1 büyük harf (A-Z)
- En az 1 küçük harf (a-z)
- En az 1 sayı (0-9)
- En az 1 özel karakter (!@#$%^&*(),.?":{}|<>)
