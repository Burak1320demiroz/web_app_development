# Node.js API 
**URL:** `http://localhost:3000/user/register`  


**Request Body (JSON):**
```json
{
  "email": "test@example.com",
  "password": "Test.123",
  "name": "John",
  "lastName": "Doe",
  "dob": "01-01-1999"
}
```

**Responses:**
- Success:
```json
{
  "status": true,
  "errorMessage": ""
}
```
- Error (Email exists):
```json
{
  "status": false,
  "errorMessage": "Email already registered"
}
```


## User Login
**URL:** `http://localhost:3000/user/login`  
**Method:** POST  
**Headers:**
```
Content-Type: application/json
```

**Request Body (JSON):**
```json
{
  "email": "burak@gmail.com",
  "password": "Test.123"
}
```

**Response (Success):**
```json
{
  "status": true,
  "errorMessage": "",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1cmFrQGdtYWlsLmNvbSIsIm5hbWUiOiJCdXJhayIsImlhdCI6MTc0MzU0ODYyNCwiZXhwIjoxNzQzNTUyMjI0fQ.iGKwpQ2kkByi_D9rtusRqdsONwPZYMyySmxroK9eHIc"
}
```

---

## Get User Profile
**URL:** `http://localhost:3000/user/me`  
**Method:** GET  
**Headers:**
```
Authorization: Bearer {token}
```
Example:  
`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1cmFrQGdtYWlsLmNvbSIsIm5hbWUiOiJCdXJhayIsImlhdCI6MTc0MzU0ODYyNCwiZXhwIjoxNzQzNTUyMjI0fQ.iGKwpQ2kkByi_D9rtusRqdsONwPZYMyySmxroK9eHIc`

**Response (Success):**
```json
{
  "id": "burak@gmail.com",
  "name": "Burak",
  "lastName": "Demiroz",
  "dob": "01-01-1999"
}
```

**Response (Error - Invalid token):**
```json
{
  "status": false,
  "errorMessage": "Unauthorized"
}
```
