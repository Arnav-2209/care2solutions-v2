# Care2Solutions v2 Backend API Documentation

## Base URL

During local development:
`http://localhost:3001/api`

---

## Response Formats

### Standard Success Response
```json
{
  "success": true,
  "data": {}
}
```

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request payload",
    "fields": {
      "email": "Invalid email address format"
    }
  }
}
```

### Rate Limit Error Response (`429 Too Many Requests`)
```json
{
  "success": false,
  "error": {
    "code": "TOO_MANY_REQUESTS",
    "message": "Rate limit exceeded. Maximum 10 submissions allowed per 15 minutes. Please try again later."
  }
}
```

### Server Error Response (`500 Internal Server Error`)
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred. Please try again later."
  }
}
```

---

## Database Architecture (PostgreSQL + Drizzle ORM)

### Lead Lifecycle Status Enum
`NEW` | `CONTACTED` | `IN_REVIEW` | `QUALIFIED` | `CLOSED` (Default: `NEW`)

### Tables
1. **`contact_inquiries`**:
   - `id`: `uuid` (Primary Key)
   - `name`: `varchar(100)`
   - `email`: `varchar(255)`
   - `phone`: `varchar(20)`
   - `practice_name`: `varchar(150)` (Nullable)
   - `service_needed`: `varchar(50)`
   - `message`: `text`
   - `status`: `varchar(20)` (Default: `'NEW'`)
   - `utm_source`: `varchar(100)` (Nullable)
   - `utm_medium`: `varchar(100)` (Nullable)
   - `utm_campaign`: `varchar(100)` (Nullable)
   - `referrer_url`: `text` (Nullable)
   - `landing_page`: `text` (Nullable)
   - `ip_address`: `varchar(45)` (Nullable)
   - `user_agent`: `text` (Nullable)
   - `created_at`: `timestamp`

2. **`audit_quote_requests`**:
   - `id`: `uuid` (Primary Key)
   - `request_id`: `varchar(50)` (Unique)
   - `provider_name`: `varchar(100)`
   - `email`: `varchar(255)`
   - `phone`: `varchar(20)`
   - `specialty`: `varchar(100)`
   - `monthly_billing_volume`: `varchar(50)` (Nullable)
   - `notes`: `text` (Nullable)
   - `status`: `varchar(20)` (Default: `'NEW'`)
   - `utm_source`: `varchar(100)` (Nullable)
   - `utm_medium`: `varchar(100)` (Nullable)
   - `utm_campaign`: `varchar(100)` (Nullable)
   - `referrer_url`: `text` (Nullable)
   - `landing_page`: `text` (Nullable)
   - `ip_address`: `varchar(45)` (Nullable)
   - `user_agent`: `text` (Nullable)
   - `created_at`: `timestamp`

### Migration Commands
- Generate SQL migrations: `npm run db:generate`
- Apply migrations to DB: `npm run db:push`

---

## Endpoints

### 1. Health Liveness Check

- **Method**: `GET`
- **Path**: `/api/health`
- **Purpose**: Verify backend API server process status.
- **Request Body**: None
- **Query Parameters**: None
- **Success Response** (`200 OK`):
  ```json
  {
    "status": "ok"
  }
  ```

---

### 2. Database Readiness Check

- **Method**: `GET`
- **Path**: `/api/health/ready`
- **Purpose**: Test live PostgreSQL database connection via query ping.
- **Request Body**: None
- **Query Parameters**: None
- **Success Response** (`200 OK`):
  ```json
  {
    "status": "ok",
    "database": "connected"
  }
  ```
- **Error Response** (`503 Service Unavailable`):
  ```json
  {
    "status": "error",
    "database": "disconnected",
    "message": "Database query ping failed"
  }
  ```

---

### 3. General Contact / Consultation Inquiry

- **Method**: `POST`
- **Path**: `/api/contact`
- **Purpose**: Receive contact inquiries and store in PostgreSQL database.
- **Request Body**:
  ```json
  {
    "name": "Dr. Sarah Jenkins",
    "email": "sarah.jenkins@exampleclinic.com",
    "phone": "+1-555-234-5678",
    "practiceName": "Jenkins Internal Medicine",
    "serviceNeeded": "medical-billing",
    "message": "We are looking to outsource our billing and RCM for a 4-provider practice."
  }
  ```
- **Success Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Thank you for reaching out. A Care2Solutions specialist will contact you within 24 hours."
  }
  ```

---

### 4. Free RCM Audit & Pricing Quote Request

- **Method**: `POST`
- **Path**: `/api/audit-quote`
- **Purpose**: Receive requests for a free Revenue Cycle Management (RCM) billing audit and store in PostgreSQL database.
- **Request Body**:
  ```json
  {
    "providerName": "Dr. Robert Chen",
    "email": "rchen@cardiologygroup.com",
    "phone": "+1-555-987-6543",
    "specialty": "Cardiology",
    "monthlyBillingVolume": "$100k+",
    "notes": "Interested in reducing our current 12% denial rate."
  }
  ```
- **Success Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Your RCM audit request has been submitted successfully. Our team will prepare your custom analysis.",
    "requestId": "aud_1f2e3d4c5b"
  }
  ```

---

## 🔐 Administrative & Lead Portal APIs (JWT Protected)

### 1. Admin Login
- **Method**: `POST`
- **Path**: `/api/admin/login`
- **Request Body**: `{"username": "admin", "password": "..."}`
- **Success Response** (`200 OK`): `{"success": true, "token": "jwt_bearer_token"}`

### 2. List Contact Inquiries
- **Method**: `GET`
- **Path**: `/api/admin/inquiries`
- **Header**: `Authorization: Bearer <token>`
- **Query Params**: `status` (optional), `page` (default 1), `limit` (default 10)
- **Success Response** (`200 OK`): `{"success": true, "data": {"items": [...], "total": 42, "page": 1, "totalPages": 5}}`

### 3. List Audit Quote Requests
- **Method**: `GET`
- **Path**: `/api/admin/audit-quotes`
- **Header**: `Authorization: Bearer <token>`
- **Query Params**: `status` (optional), `page` (default 1), `limit` (default 10)

### 4. Update Inquiry Status
- **Method**: `PATCH`
- **Path**: `/api/admin/inquiries/:id`
- **Header**: `Authorization: Bearer <token>`
- **Request Body**: `{"status": "CONTACTED"}`

### 5. Export Leads to CSV
- **Method**: `GET`
- **Path**: `/api/admin/export?type=inquiries` (or `type=audit-quotes`)
- **Header**: `Authorization: Bearer <token>`
- **Response**: `200 OK` (`Content-Type: text/csv`)

