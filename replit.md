# Urban Planning Hub Libya

## Overview

A comprehensive web platform for the Libyan Urban Planning Authority featuring a modern React frontend with TypeScript and a Node.js/Express backend. The system provides document management, request processing, user authentication, and administrative capabilities for urban planning resources. The platform supports Arabic RTL design and includes features for browsing documents, submitting requests, and managing library resources.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18.3.1 with TypeScript and Vite build system
- **Styling**: Tailwind CSS with RTL support for Arabic content
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Routing**: React Router DOM v6 for client-side navigation
- **State Management**: React Context API for authentication, React hooks for local state
- **HTTP Client**: Axios with automatic token injection and error handling
- **Form Handling**: React Hook Form for form validation and submission

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Prisma ORM for type-safe database operations
- **Authentication**: JWT-based authentication with role-based access control (Admin, User)
- **File Handling**: Multer middleware for secure file uploads with type validation
- **Email Service**: SendGrid integration for automated notifications
- **Security**: Helmet for security headers, CORS, rate limiting, and input validation

### Database Design
- **Users**: Authentication and profile management with role-based permissions
- **Documents**: File metadata, categorization, and access control
- **Document Requests**: User request tracking with status management and admin workflow
- **Audit Logging**: Download tracking and activity monitoring

### API Structure
- RESTful endpoints with standardized response format
- Protected routes with JWT middleware
- File serving with download tracking
- Admin-only endpoints for content management
- Input validation using express-validator

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React, React Router DOM, React Hook Form
- **UI Libraries**: Radix UI components, Lucide React icons, Tailwind CSS
- **Backend Framework**: Express.js, Prisma ORM, PostgreSQL
- **Authentication**: JWT, bcryptjs for password hashing
- **File Processing**: Multer for uploads, file type validation

### Third-Party Services
- **Email Service**: SendGrid for automated email notifications
- **Database**: PostgreSQL as primary data store
- **File Storage**: Local file system with upload directory management

### Development Tools
- **Build System**: Vite for frontend bundling and development server
- **Type Safety**: TypeScript for both frontend and backend
- **Code Quality**: ESLint, TypeScript compiler for type checking
- **Development**: Nodemon for backend hot reloading, ts-node for TypeScript execution

### Security and Monitoring
- **Security**: Helmet middleware, CORS configuration, rate limiting
- **Validation**: Express-validator for input sanitization
- **Logging**: Morgan for HTTP request logging, custom download tracking
- **Error Handling**: Centralized error handling with appropriate HTTP status codes