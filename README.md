# PDF Signing Application

A web application for uploading, signing, and managing PDF documents with role-based access for Uploaders and Signers.

## Features

- **Role-Based Access**: Supports `UPLOADER` (uploads PDFs) and `SIGNER` (signs PDFs).
- **Signature Capture**: Uses `react-signature-canvas` for digital signatures.
- **File Storage**: Stores PDFs and signatures in AWS S3.
- **Database**: MongoDB for user, document, and assignment data.
- **Authentication**: JWT-based.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, `react-signature-canvas`, `react-icons`
- **Backend**: Node.js, Express, MongoDB, Mongoose, AWS SDK
- **Authentication**: bcrypt, jsonwebtoken
- **File Upload**: Multer, AWS S3

## Prerequisites

- Node.js (>= 18.x)
- MongoDB (local or MongoDB Atlas)
- AWS account with S3 bucket
- Git

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd pdf-signing-app
   ```

2. **Install dependencies**:

   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. **Set up environment variables**:

   - Create `.env` in `/server`:
     ```env
     MONGO_URI=mongodb://localhost:27017/pdf-signing
     JWT_SECRET=your_jwt_secret
     AWS_REGION=your_aws_region
     AWS_ACCESS_KEY_ID=your_aws_access_key
     AWS_SECRET_ACCESS_KEY=your_aws_secret_key
     AWS_S3_BUCKET=your_s3_bucket_name
     PORT=3000
     ```
   - Create `.env` in `/client`:
     ```env
     VITE_API_URL=http://localhost:5000
     ```

4. **Run the application**:
   - Start MongoDB: `mongod`
   - Start backend: `cd server && npm run dev`
   - Start frontend: `cd client && npm run dev`
   - Access at `http://localhost:5173`

**--------------------------------------------------------------**

## API Documentation

### Authentication

- **POST /api/auth/register**
  - Body: `{ "email": string, "password": string, "name": string, "role": "UPLOADER" | "SIGNER" }`
  - Response: `201 { message: "User registered successfully" }`
  - Sets token with JWT.
- **POST /api/auth/login**
  - Body: `{ "email": string, "password": string }`
  - Response: `200 { message: "Login successful" }`
  - Sets token with JWT.
- **POST /api/auth/logout**
  - Response: `200 { message: "Logged out successfully" }`
  - Clears token.
- **GET /api/users/me**
  - Headers: `Cookie: token=<jwt>`
  - Response: `200 { _id: string, email: string, name: string, role: string }`
  - Requires authentication.

### Documents

- **POST /api/documents/upload**
  - Headers: `token=<jwt>`, `Content-Type: multipart/form-data`
  - Body: `{ file: File, docname: string, signatureFields: JSON string }`
  - Response: `201 { document: { _id, uploaderId, originalUrl, docname, status, signatureFields } }`
  - Requires `UPLOADER` role.
- **POST /api/documents/:id/sign**
  - Headers: `token=<jwt>`, `Content-Type: application/json`
  - Body: `{ signature: string (base64 PNG), name: string, email: string, date: string }`
  - Response: `200 { document: { _id, signedUrl, status, signatureFields } }`
  - Requires `SIGNER` role.
- **GET /api/documents**
  - Headers: `token=<jwt>`
  - Response: `200 { documents: [{ _id, uploaderId, originalUrl, docname, status, signatureFields }] }`
  - Requires authentication.

### Assignments

- **POST /api/assignments**
  - Headers: `token=<jwt>`, `Content-Type: application/json`
  - Body: `{ documentId: string, signerId: string }`
  - Response: `201 { assignment: { _id, documentId, signerId } }`
  - Requires `UPLOADER` role.
- **GET /api/assignments**
  - Headers: `token=<jwt>`
  - Response: `200 { assignments: [{ _id, documentId: { _id, docname, originalUrl, status }, signerId }] }`
  - Requires `SIGNER` role.

**---------------------------------------------**

## UI Flow

1. **Login/Register** (`/login`, `/register`):
   - Users log in or register with email, password, name, and role (`UPLOADER` or `SIGNER`).
   - Redirects to `/dashboard/uploader` or `/dashboard/signer` based on role.
2. **Uploader Dashboard** (`/dashboard/uploader`):
   - Upload PDFs.
   - Assign documents using `Email` to Signers via `POST /api/assignments`.
   - View uploaded documents and their status.
3. **Signer Dashboard** (`/dashboard/signer`):
   - Displays assigned documents with status (`PENDING` or `SIGNED`).
   - Users draw signatures using a canvas, submit via `POST /api/documents/:id/sign`.
   - Signature Document is saved to S3, and document status updates to `SIGNED`.
4. **Logout**:
   - Clears token and redirects to `/login`.

## Debugging

- **Network Tab**: Check `GET /api/users/me` and `POST /api/auth/login` for errors.
- **Console Logs**: Look for errors in `getUserFromToken` or `signDocument`.
- **MongoDB**: Ensure user exists with `name` and `email`:
  ```javascript
  db.users.findOne({ email: "signer@test.com" });
  ```

## Thank you
