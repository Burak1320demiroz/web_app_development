# Node.js API Documentation

## User Registration

**Endpoint:** `POST http://localhost:3000/user/register`

### Request
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "test@example.com",
  "password": "Test.123",
  "name": "John",
  "lastName": "Doe",
  "dob": "01-01-1999"
}
```

### Responses
**Success (200 OK):**
```json
{
  "status": true,
  "errorMessage": ""
}
```

**Error (400 Bad Request) - Email exists:**
```json
{
  "status": false,
  "errorMessage": "Email already registered"
}
```

**Error (400 Bad Request) - Invalid password length:**
```json
{
  "status": false,
  "errorMessage": "Password must be between 3 and 12 characters"
}
```

---

## User Login

**Endpoint:** `POST http://localhost:3000/user/login`

### Request
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "burak@gmail.com",
  "password": "Test.123"
}
```

### Responses
**Success (200 OK):**
```json
{
  "status": true,
  "errorMessage": "",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1cmFrQGdtYWlsLmNvbSIsIm5hbWUiOiJCdXJhayIsImlhdCI6MTc0MzU0ODYyNCwiZXhwIjoxNzQzNTUyMjI0fQ.iGKwpQ2kkByi_D9rtusRqdsONwPZYMyySmxroK9eHIc",
  "user": {
    "email": "burak@gmail.com",
    "name": "Burak",
    "lastName": "Demiroz",
    "role": "user"
  }
}
```

**Error (400 Bad Request) - Invalid credentials:**
```json
{
  "status": false,
  "errorMessage": "Invalid email or password",
  "token": ""
}
```

---

## Get User Profile

**Endpoint:** `GET http://localhost:3000/user/me`

### Request
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Example:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1cmFrQGdtYWlsLmNvbSIsIm5hbWUiOiJCdXJhayIsImlhdCI6MTc0MzU0ODYyNCwiZXhwIjoxNzQzNTUyMjI0fQ.iGKwpQ2kkByi_D9rtusRqdsONwPZYMyySmxroK9eHIc
```

### Responses
**Success (200 OK):**
```json
{
  "id": "burak@gmail.com",
  "name": "Burak",
  "lastName": "Demiroz",
  "dob": "01-01-1999",
  "role": "user"
}
```

**Error (401 Unauthorized) - Missing/invalid token:**
```json
{
  "status": false,
  "errorMessage": "Unauthorized"
}
```

**Error (404 Not Found) - User not found:**
```json
{
  "status": false,
  "errorMessage": "User not found"
}
```

---

## Update User Profile

**Endpoint:** `PUT http://localhost:3000/user/me`

### Request
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Updated Name",
  "lastName": "Updated Lastname",
  "dob": "02-02-2000"
}
```

### Responses
**Success (200 OK):**
```json
{
  "status": true,
  "errorMessage": ""
}
```

**Error (401 Unauthorized) - Missing/invalid token:**
```json
{
  "status": false,
  "errorMessage": "Unauthorized"
}
```

**Error (403 Forbidden) - Insufficient permissions:**
```json
{
  "status": false,
  "errorMessage": "Forbidden - Insufficient permissions"
}
```

---

## Admin - Get All Users (Admin Only)

**Endpoint:** `GET http://localhost:3000/admin/users`

### Request
**Headers:**
```
Authorization: Bearer {admin_token}
Content-Type: application/json
```

### Responses
**Success (200 OK):**
```json
[
  {
    "email": "visitor@example.com",
    "name": "Visitor",
    "lastName": "Anonymous",
    "dob": "01-01-2000",
    "role": "visitor",
    "permissions": ["read"]
  },
  {
    "email": "user@example.com",
    "name": "Regular",
    "lastName": "User",
    "dob": "02-02-1995",
    "role": "user",
    "permissions": ["read", "write"]
  },
  {
    "email": "admin@example.com",
    "name": "Super",
    "lastName": "Admin",
    "dob": "03-03-1990",
    "role": "admin",
    "permissions": ["read", "write", "delete", "admin"]
  }
]
```

**Error (401 Unauthorized) - Missing/invalid token:**
```json
{
  "status": false,
  "errorMessage": "Unauthorized"
}
```

**Error (403 Forbidden) - Admin access required:**
```json
{
  "status": false,
  "errorMessage": "Forbidden - Insufficient permissions"
}
```

---

## Test Endpoint

**Endpoint:** `GET http://localhost:3000/test`

### Responses
**Success (200 OK):**
```json
{
  "message": "Fonksiyon testi başarılı",
  "results": {
    "visitor": {
      "email": "visitor@example.com",
      "name": "Visitor",
      "role": "visitor"
    },
    "user": {
      "email": "user@example.com",
      "name": "Regular",
      "role": "user"
    },
    "admin": {
      "email": "admin@example.com",
      "name": "Super",
      "role": "admin"
    }
  }
}
```