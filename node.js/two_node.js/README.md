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
