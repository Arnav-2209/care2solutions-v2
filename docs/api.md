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

---

## Database Architecture (PostgreSQL + Drizzle ORM)

### Tables
1. **`contact_inquiries`**:
   - `id`: `uuid` (Primary Key)
   - `name`: `varchar(100)`
   - `email`: `varchar(255)`
   - `phone`: `varchar(20)`
   - `practice_name`: `varchar(150)` (Nullable)
   - `service_needed`: `varchar(50)`
   - `message`: `text`
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
   - `created_at`: `timestamp`

### Migration Commands
- Generate SQL migrations: `npm run db:generate`
- Apply migrations to DB: `npm run db:push`

---

## Endpoints

### 1. Health Check

- **Method**: `GET`
- **Path**: `/api/health`
- **Purpose**: Verify backend API server status without database connectivity.
- **Request Body**: None
- **Query Parameters**: None
- **Success Response** (`200 OK`):
  ```json
  {
    "status": "ok"
  }
  ```

---

### 2. General Contact / Consultation Inquiry

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

### 3. Free RCM Audit & Pricing Quote Request

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
