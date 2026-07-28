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
- **Error Responses**: None expected under normal operation.
- **Example Request (JavaScript)**:
  ```javascript
  const res = await fetch('http://localhost:3001/api/health');
  const data = await res.json();
  ```

---

### 2. General Contact / Consultation Inquiry

- **Method**: `POST`
- **Path**: `/api/contact`
- **Purpose**: Receive contact inquiries and consultation requests from healthcare providers, doctors, and practice managers.
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
- **Field Constraints & Zod Validation**:
  - `name`: `string`, required, 2-100 characters.
  - `email`: `string`, required, valid email format, max 255 characters.
  - `phone`: `string`, required, 7-20 characters (digits, spaces, hyphens, plus sign allowed).
  - `practiceName`: `string`, optional, max 150 characters.
  - `serviceNeeded`: `string`, required, enum: `["medical-billing", "medical-transcription", "credentialing", "rcm-services", "ar-followup", "other"]`.
  - `message`: `string`, required, 10-2000 characters.
- **Query Parameters**: None
- **Success Response** (`201 Created`):
  ```json
  {
    "success": true,
    "data": {
      "id": "cnt_9a8b7c6d5e",
      "message": "Thank you for reaching out. A Care2Solutions specialist will contact you within 24 hours."
    }
  }
  ```
- **Validation Errors** (`400 Bad Request`):
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Invalid request payload",
      "fields": {
        "email": "Invalid email address format",
        "message": "Message must be at least 10 characters long"
      }
    }
  }
  ```
- **Internal Server Error** (`500 Internal Server Error`):
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

### 3. Free RCM Audit & Pricing Quote Request

- **Method**: `POST`
- **Path**: `/api/audit-quote`
- **Purpose**: Receive requests for a free Revenue Cycle Management (RCM) billing audit or custom pricing quote.
- **Request Body**:
  ```json
  {
    "providerName": "Dr. Robert Chen",
    "email": "rchen@cardiologygroup.com",
    "phone": "+1-555-987-6543",
    "specialty": "Cardiology",
    "monthlyBillingVolume": "100k-250k",
    "notes": "Interested in reducing our current 12% denial rate."
  }
  ```
- **Field Constraints & Zod Validation**:
  - `providerName`: `string`, required, 2-100 characters.
  - `email`: `string`, required, valid email format.
  - `phone`: `string`, required, 7-20 characters.
  - `specialty`: `string`, required, 2-100 characters.
  - `monthlyBillingVolume`: `string`, optional, enum: `["under-50k", "50k-100k", "100k-250k", "250k-500k", "over-500k"]`.
  - `notes`: `string`, optional, max 1000 characters.
- **Query Parameters**: None
- **Success Response** (`201 Created`):
  ```json
  {
    "success": true,
    "data": {
      "id": "aud_1f2e3d4c5b",
      "message": "Your RCM audit request has been submitted successfully. Our team will prepare your custom analysis."
    }
  }
  ```
- **Validation Errors** (`400 Bad Request`):
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Invalid request payload",
      "fields": {
        "specialty": "Specialty is required"
      }
    }
  }
  ```
