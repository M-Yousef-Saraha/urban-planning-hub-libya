# Urban Planning Hub Libya - Backend API

A comprehensive backend API for the Urban Planning Hub Libya document management system. This API provides endpoints for user authentication, document management, request handling, and administrative functions.

## Features

- **User Authentication**: Registration, login, and profile management
- **Document Management**: CRUD operations for documents with file upload
- **Request System**: Users can request documents with email notifications
- **Admin Panel**: Administrative functions for managing requests and documents
- **Email Integration**: Automated email notifications using SendGrid
- **File Management**: Secure file upload and serving
- **Database**: PostgreSQL with Prisma ORM
- **Security**: JWT authentication, input validation, rate limiting

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: SendGrid
- **File Upload**: Multer
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- SendGrid account for email services

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd urban-planning-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/urban_planning_db?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# SendGrid
SENDGRID_API_KEY="your-sendgrid-api-key"
FROM_EMAIL="noreply@urbanplanninghub.ly"
ADMIN_EMAIL="admin@urbanplanninghub.ly"

# Server
PORT=3001
NODE_ENV="development"

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR="./uploads"
```

4. Set up the database:
```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Documents
- `GET /api/documents` - Get all documents (with pagination and filtering)
- `GET /api/documents/:id` - Get specific document
- `GET /api/documents/categories` - Get document categories
- `POST /api/documents` - Create new document (admin only)
- `PUT /api/documents/:id` - Update document (admin only)
- `DELETE /api/documents/:id` - Delete document (admin only)

### Document Requests
- `POST /api/requests` - Create new document request
- `GET /api/requests` - Get user's document requests
- `GET /api/requests/:id` - Get specific request
- `PUT /api/requests/:id/cancel` - Cancel request

### Admin
- `GET /api/admin/requests` - Get all requests (admin only)
- `PUT /api/admin/requests/:id/status` - Update request status (admin only)
- `GET /api/admin/stats/requests` - Get request statistics (admin only)
- `GET /api/admin/stats/documents` - Get document statistics (admin only)

### Files
- `GET /api/files/:filename` - Serve uploaded files
- `DELETE /api/files/:filename` - Delete uploaded file (admin only)

## Database Schema

### Users
- `id` - Unique identifier
- `name` - User's full name
- `email` - User's email (unique)
- `phone` - User's phone number (optional)
- `password` - Hashed password
- `role` - User role (USER, ADMIN)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Documents
- `id` - Unique identifier
- `title` - Document title
- `description` - Document description (optional)
- `category` - Document category (GUIDES, LAWS, STANDARDS, REPORTS, MAPS, STUDIES)
- `filePath` - File system path
- `fileName` - Original file name
- `fileSize` - File size in bytes
- `mimeType` - File MIME type
- `isActive` - Whether document is active
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Document Requests
- `id` - Unique identifier
- `userId` - Reference to user
- `documentId` - Reference to document
- `purpose` - Purpose of request
- `urgency` - Urgency level (LOW, MEDIUM, HIGH, URGENT)
- `notes` - Additional notes (optional)
- `status` - Request status (PENDING, APPROVED, REJECTED, COMPLETED)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Email Templates

The system includes bilingual (Arabic/English) email templates for:

1. **Request Confirmation**: Sent to users when they submit a document request
2. **Admin Notification**: Sent to administrators when new requests are received
3. **Document Delivery**: Sent to users with requested documents attached

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Input Validation**: Express Validator for request validation
- **Rate Limiting**: Protection against brute force attacks
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers for Express
- **File Upload Security**: File type validation and size limits

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

### Project Structure

```
src/
├── controllers/     # Request handlers
├── middleware/      # Custom middleware
├── routes/         # Route definitions
├── services/       # Business logic services
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
└── index.ts        # Application entry point
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Set up production environment variables

3. Run database migrations:
```bash
npm run prisma:migrate
```

4. Start the production server:
```bash
npm start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `JWT_EXPIRES_IN` | JWT token expiration time | 7d |
| `SENDGRID_API_KEY` | SendGrid API key | Required |
| `FROM_EMAIL` | Sender email address | Required |
| `ADMIN_EMAIL` | Administrator email | Required |
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment mode | development |
| `MAX_FILE_SIZE` | Maximum file upload size | 10485760 |
| `UPLOAD_DIR` | File upload directory | ./uploads |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.

