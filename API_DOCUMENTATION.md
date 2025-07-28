# Laravel Backend API Documentation

## Overview
This document outlines the complete API structure for the Urban Planning website backend. The system consists of two main parts:
1. **Main Website Content Management** - News, services, projects, contact
2. **Document Request System** - Library management and document requests

## Database Schema

### 1. Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor', 'viewer') DEFAULT 'viewer',
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. News Articles Table
```sql
CREATE TABLE news_articles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    image_url VARCHAR(500),
    author_id BIGINT,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);
```

### 3. Services Table
```sql
CREATE TABLE services (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100) NOT NULL,
    color VARCHAR(7) DEFAULT '#3B82F6',
    accent_color VARCHAR(7) DEFAULT '#1D4ED8',
    status ENUM('active', 'inactive') DEFAULT 'active',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 4. Projects Table
```sql
CREATE TABLE projects (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    status ENUM('planning', 'in_progress', 'completed', 'on_hold') DEFAULT 'planning',
    progress INT DEFAULT 0,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    beneficiaries INT DEFAULT 0,
    budget DECIMAL(15,2) NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 5. Documents Table
```sql
CREATE TABLE documents (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(10) NOT NULL,
    file_size VARCHAR(20) NOT NULL,
    download_count INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 6. Document Tags Table
```sql
CREATE TABLE document_tags (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    document_id BIGINT NOT NULL,
    tag VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);
```

### 7. Document Requests Table
```sql
CREATE TABLE document_requests (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    document_id BIGINT NOT NULL,
    requester_name VARCHAR(255) NOT NULL,
    requester_email VARCHAR(255) NOT NULL,
    requester_phone VARCHAR(20) NOT NULL,
    purpose TEXT NOT NULL,
    urgency ENUM('low', 'medium', 'high') DEFAULT 'medium',
    additional_notes TEXT,
    status ENUM('pending', 'approved', 'sent', 'rejected') DEFAULT 'pending',
    processed_at TIMESTAMP NULL,
    processed_by BIGINT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE,
    FOREIGN KEY (processed_by) REFERENCES users(id) ON DELETE SET NULL
);
```

### 8. Contact Messages Table
```sql
CREATE TABLE contact_messages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('unread', 'read', 'replied') DEFAULT 'unread',
    replied_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 9. Settings Table
```sql
CREATE TABLE settings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/login
```json
{
  "email": "admin@example.com",
  "password": "password"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin"
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  }
}
```

#### POST /api/auth/logout
**Headers:** `Authorization: Bearer {token}`
**Response:**
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

### News Endpoints

#### GET /api/news
**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page (default: 10)
- `status` (optional): published, draft, archived

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "عنوان الخبر",
      "content": "محتوى الخبر...",
      "excerpt": "ملخص الخبر",
      "slug": "news-slug",
      "image_url": "https://example.com/image.jpg",
      "author": {
        "id": 1,
        "name": "اسم الكاتب"
      },
      "status": "published",
      "published_at": "2024-01-15T10:00:00Z",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_items": 50,
    "per_page": 10
  }
}
```

#### GET /api/news/{id}
**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "عنوان الخبر",
    "content": "محتوى الخبر الكامل...",
    "excerpt": "ملخص الخبر",
    "slug": "news-slug",
    "image_url": "https://example.com/image.jpg",
    "author": {
      "id": 1,
      "name": "اسم الكاتب"
    },
    "status": "published",
    "published_at": "2024-01-15T10:00:00Z",
    "created_at": "2024-01-15T10:00:00Z"
  }
}
```

#### POST /api/news (Admin only)
**Headers:** `Authorization: Bearer {token}`
```json
{
  "title": "عنوان الخبر الجديد",
  "content": "محتوى الخبر...",
  "excerpt": "ملخص الخبر",
  "image_url": "https://example.com/image.jpg",
  "status": "published"
}
```

#### PUT /api/news/{id} (Admin only)
**Headers:** `Authorization: Bearer {token}`

#### DELETE /api/news/{id} (Admin only)
**Headers:** `Authorization: Bearer {token}`

### Services Endpoints

#### GET /api/services
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "التخطيط العمراني",
      "description": "خدمات التخطيط العمراني المتقدمة",
      "icon": "Building",
      "color": "#3B82F6",
      "accent_color": "#1D4ED8",
      "status": "active",
      "sort_order": 1
    }
  ]
}
```

#### POST /api/services (Admin only)
#### PUT /api/services/{id} (Admin only)
#### DELETE /api/services/{id} (Admin only)

### Projects Endpoints

#### GET /api/projects
**Query Parameters:**
- `page`, `limit`, `status`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "مشروع التطوير العمراني - المنطقة الشرقية",
      "description": "وصف المشروع...",
      "location": "طرابلس، ليبيا",
      "status": "in_progress",
      "progress": 65,
      "start_date": "2024-01-01",
      "end_date": "2024-12-31",
      "beneficiaries": 50000,
      "budget": 1500000.00,
      "image_url": "https://example.com/project.jpg"
    }
  ]
}
```

### Documents Endpoints

#### GET /api/documents
**Query Parameters:**
- `page`, `limit`
- `category` (optional): Filter by category
- `search` (optional): Search in title, description, tags

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "دليل التخطيط العمراني المستدام",
      "description": "دليل شامل للتخطيط العمراني...",
      "category": "أدلة",
      "file_type": "PDF",
      "file_size": "2.5 MB",
      "download_count": 245,
      "tags": ["تخطيط", "استدامة", "بيئة"],
      "status": "active",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### GET /api/documents/categories
**Response:**
```json
{
  "success": true,
  "data": ["أدلة", "قوانين", "معايير", "تقارير", "خرائط", "دراسات"]
}
```

#### POST /api/documents (Admin only)
**Headers:** `Authorization: Bearer {token}`
**Content-Type:** `multipart/form-data`
```
title: دليل جديد
description: وصف الدليل
category: أدلة
tags[]: تخطيط
tags[]: عمراني
file: [PDF file]
```

### Document Requests Endpoints

#### POST /api/document-requests
```json
{
  "document_id": 1,
  "requester_name": "أحمد محمد",
  "requester_email": "ahmed@example.com",
  "requester_phone": "+218912345678",
  "purpose": "بحث أكاديمي",
  "urgency": "medium",
  "additional_notes": "ملاحظات إضافية"
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم إرسال طلبك بنجاح",
  "data": {
    "request_id": 123,
    "estimated_delivery": "24 ساعة"
  }
}
```

#### GET /api/document-requests (Admin only)
**Headers:** `Authorization: Bearer {token}`
**Query Parameters:**
- `page`, `limit`
- `status` (optional): pending, approved, sent, rejected

#### PUT /api/document-requests/{id}/status (Admin only)
**Headers:** `Authorization: Bearer {token}`
```json
{
  "status": "approved"
}
```

### Contact Endpoints

#### POST /api/contact
```json
{
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "message": "رسالة التواصل"
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم إرسال رسالتك بنجاح"
}
```

#### GET /api/contact (Admin only)
**Headers:** `Authorization: Bearer {token}`

### Settings Endpoints

#### GET /api/settings
**Response:**
```json
{
  "success": true,
  "data": {
    "site_name": "وزارة التخطيط العمراني",
    "contact_email": "info@planning.ly",
    "contact_phone": "+218123456789",
    "address": "طرابلس، ليبيا"
  }
}
```

#### PUT /api/settings (Admin only)
**Headers:** `Authorization: Bearer {token}`

## Error Responses

All endpoints return errors in this format:
```json
{
  "success": false,
  "message": "رسالة الخطأ",
  "errors": {
    "field_name": ["تفاصيل الخطأ"]
  }
}
```

## HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `422`: Validation Error
- `500`: Internal Server Error

## File Upload Guidelines

### Document Files
- **Allowed types:** PDF, DOC, DOCX
- **Max size:** 10MB
- **Storage path:** `storage/app/public/documents/`
- **URL pattern:** `/storage/documents/{filename}`

### Images
- **Allowed types:** JPG, JPEG, PNG, WebP
- **Max size:** 5MB
- **Storage path:** `storage/app/public/images/`
- **URL pattern:** `/storage/images/{filename}`

## Email Configuration

Configure Laravel to send emails for:
1. Document request notifications (to admin)
2. Document delivery emails (to requesters)
3. Contact form submissions

Required email templates:
- `emails.document-request-notification.blade.php`
- `emails.document-delivery.blade.php`
- `emails.contact-form.blade.php`

## Security Considerations

1. **Authentication:** Use Laravel Sanctum for API authentication
2. **Rate Limiting:** Implement rate limiting for public endpoints
3. **File Validation:** Strictly validate uploaded files
4. **Input Sanitization:** Sanitize all user inputs
5. **CORS:** Configure CORS for frontend domain
6. **HTTPS:** Enforce HTTPS in production

## Laravel Middleware

1. **auth:sanctum** - For protected routes
2. **throttle:60,1** - Rate limiting
3. **cors** - CORS handling
4. **admin** - Custom middleware for admin-only routes

## Queue Jobs

Implement queue jobs for:
1. Email sending
2. File processing
3. Document delivery

## Storage Configuration

```php
// config/filesystems.php
'disks' => [
    'public' => [
        'driver' => 'local',
        'root' => storage_path('app/public'),
        'url' => env('APP_URL').'/storage',
        'visibility' => 'public',
    ],
]
```

## Environment Variables

```
APP_NAME="Urban Planning Ministry"
APP_ENV=production
APP_KEY=base64:...
APP_DEBUG=false
APP_URL=https://yoursite.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=urban_planning
DB_USERNAME=your_username
DB_PASSWORD=your_password

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@planning.ly
MAIL_FROM_NAME="Urban Planning Ministry"
```