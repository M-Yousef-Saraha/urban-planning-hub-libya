# Laravel Backend Integration Guide
## Urban Planning Hub - React Frontend to Laravel Backend

This comprehensive guide covers the complete integration of the React frontend with the Laravel backend API for the Urban Planning Hub website.

## Table of Contents
1. [Overview](#overview)
2. [Backend Setup](#backend-setup)
3. [Frontend API Integration](#frontend-api-integration)
4. [Authentication System](#authentication-system)
5. [Data Models & Types](#data-models--types)
6. [API Service Layer](#api-service-layer)
7. [Error Handling](#error-handling)
8. [File Upload Integration](#file-upload-integration)
9. [Real-time Features](#real-time-features)
10. [Testing Strategy](#testing-strategy)
11. [Deployment Configuration](#deployment-configuration)
12. [Security Considerations](#security-considerations)

## Overview

The integration connects a React TypeScript frontend with a Laravel 10+ backend API, providing:
- Complete CRUD operations for all entities
- JWT-based authentication
- File upload capabilities
- Real-time notifications
- Admin dashboard functionality
- Document management system

## Backend Setup

### 1. Laravel Installation & Configuration

```bash
# Create new Laravel project
composer create-project laravel/laravel urban-planning-backend

# Install required packages
composer require laravel/sanctum
composer require spatie/laravel-permission
composer require intervention/image
composer require maatwebsite/excel
composer require pusher/pusher-php-server

# Install development packages
composer require --dev laravel/telescope
composer require --dev barryvdh/laravel-debugbar
```

### 2. Environment Configuration

```env
# .env
APP_NAME="Urban Planning Hub"
APP_ENV=production
APP_KEY=base64:your-app-key
APP_DEBUG=false
APP_URL=https://your-domain.com

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=urban_planning_hub
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Sanctum
SANCTUM_STATEFUL_DOMAINS=localhost:5173,localhost:3000,your-frontend-domain.com
SESSION_DRIVER=database
SESSION_LIFETIME=120

# CORS
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com,http://localhost:5173

# File Storage
FILESYSTEM_DISK=public
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@urbanplanning.ly
MAIL_FROM_NAME="Urban Planning Hub"

# Pusher (for real-time features)
PUSHER_APP_ID=your-pusher-app-id
PUSHER_APP_KEY=your-pusher-key
PUSHER_APP_SECRET=your-pusher-secret
PUSHER_APP_CLUSTER=mt1
```

### 3. Database Migrations

```php
// database/migrations/2024_01_01_000001_create_users_table.php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('role', ['admin', 'editor', 'viewer'])->default('viewer');
            $table->string('phone')->nullable();
            $table->boolean('is_active')->default(true);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
};
```

```php
// database/migrations/2024_01_01_000002_create_projects_table.php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('location');
            $table->enum('status', ['planning', 'in_progress', 'completed', 'on_hold'])->default('planning');
            $table->integer('progress')->default(0);
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->integer('beneficiaries')->default(0);
            $table->decimal('budget', 15, 2)->nullable();
            $table->string('image_url')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('projects');
    }
};
```

## Frontend API Integration

### 1. Enhanced API Client

```typescript
// src/lib/api.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      Cookies.remove('auth_token');
      Cookies.remove('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 2. TypeScript Interfaces

```typescript
// src/types/api.ts
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'editor' | 'viewer';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  location: string;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  progress: number;
  start_date: string;
  end_date?: string;
  beneficiaries: number;
  budget?: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  image_url?: string;
  author_id: number;
  author?: User;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  accent_color: string;
  status: 'active' | 'inactive';
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: number;
  title: string;
  description: string;
  category: string;
  file_path: string;
  file_type: string;
  file_size: string;
  download_count: number;
  status: 'active' | 'inactive';
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface DocumentRequest {
  id: number;
  document_id: number;
  document?: Document;
  requester_name: string;
  requester_email: string;
  requester_phone: string;
  purpose: string;
  urgency: 'low' | 'medium' | 'high';
  additional_notes?: string;
  status: 'pending' | 'approved' | 'sent' | 'rejected';
  processed_at?: string;
  processed_by?: number;
  processed_by_user?: User;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  replied_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    per_page: number;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
```

### 3. API Service Layer

```typescript
// src/services/apiService.ts
import api from '../lib/api';
import {
  User, Project, NewsArticle, Service, Document, DocumentRequest,
  ContactMessage, ApiResponse, PaginatedResponse, ApiError
} from '../types/api';

// Auth Service
export const authService = {
  login: async (email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData: Partial<User> & { password: string }): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (userData: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  },
};

// Projects Service
export const projectsService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<PaginatedResponse<Project>> => {
    const response = await api.get('/projects', { params });
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Project>> => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  create: async (projectData: Partial<Project>): Promise<ApiResponse<Project>> => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  update: async (id: number, projectData: Partial<Project>): Promise<ApiResponse<Project>> => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};

// News Service
export const newsService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<PaginatedResponse<NewsArticle>> => {
    const response = await api.get('/news', { params });
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<NewsArticle>> => {
    const response = await api.get(`/news/${id}`);
    return response.data;
  },

  getBySlug: async (slug: string): Promise<ApiResponse<NewsArticle>> => {
    const response = await api.get(`/news/slug/${slug}`);
    return response.data;
  },

  create: async (articleData: Partial<NewsArticle>): Promise<ApiResponse<NewsArticle>> => {
    const response = await api.post('/news', articleData);
    return response.data;
  },

  update: async (id: number, articleData: Partial<NewsArticle>): Promise<ApiResponse<NewsArticle>> => {
    const response = await api.put(`/news/${id}`, articleData);
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/news/${id}`);
    return response.data;
  },
};

// Services Service
export const servicesService = {
  getAll: async (): Promise<ApiResponse<Service[]>> => {
    const response = await api.get('/services');
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Service>> => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  create: async (serviceData: Partial<Service>): Promise<ApiResponse<Service>> => {
    const response = await api.post('/services', serviceData);
    return response.data;
  },

  update: async (id: number, serviceData: Partial<Service>): Promise<ApiResponse<Service>> => {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },
};

// Documents Service
export const documentsService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }): Promise<PaginatedResponse<Document>> => {
    const response = await api.get('/documents', { params });
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Document>> => {
    const response = await api.get(`/documents/${id}`);
    return response.data;
  },

  getCategories: async (): Promise<ApiResponse<string[]>> => {
    const response = await api.get('/documents/categories');
    return response.data;
  },

  download: async (id: number): Promise<Blob> => {
    const response = await api.get(`/documents/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  create: async (documentData: FormData): Promise<ApiResponse<Document>> => {
    const response = await api.post('/documents', documentData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id: number, documentData: Partial<Document>): Promise<ApiResponse<Document>> => {
    const response = await api.put(`/documents/${id}`, documentData);
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/documents/${id}`);
    return response.data;
  },
};

// Document Requests Service
export const documentRequestsService = {
  create: async (requestData: Partial<DocumentRequest>): Promise<ApiResponse<DocumentRequest>> => {
    const response = await api.post('/document-requests', requestData);
    return response.data;
  },

  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<DocumentRequest>> => {
    const response = await api.get('/document-requests', { params });
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<DocumentRequest>> => {
    const response = await api.get(`/document-requests/${id}`);
    return response.data;
  },

  updateStatus: async (id: number, status: string, notes?: string): Promise<ApiResponse<DocumentRequest>> => {
    const response = await api.put(`/document-requests/${id}/status`, { status, notes });
    return response.data;
  },
};

// Contact Service
export const contactService = {
  sendMessage: async (messageData: Partial<ContactMessage>): Promise<ApiResponse<ContactMessage>> => {
    const response = await api.post('/contact', messageData);
    return response.data;
  },

  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<ContactMessage>> => {
    const response = await api.get('/contact', { params });
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<ContactMessage>> => {
    const response = await api.get(`/contact/${id}`);
    return response.data;
  },

  updateStatus: async (id: number, status: string): Promise<ApiResponse<ContactMessage>> => {
    const response = await api.put(`/contact/${id}/status`, { status });
    return response.data;
  },
};
```

## Authentication System

### 1. Auth Context Integration

```typescript
// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/api';
import { authService } from '../services/apiService';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = Cookies.get('auth_token');
      const storedUser = Cookies.get('user');

      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          
          // Verify token with backend
          const response = await authService.getProfile();
          if (response.success) {
            setUser(response.data);
            Cookies.set('user', JSON.stringify(response.data), { expires: 7 });
          } else {
            // Token is invalid, clear auth data
            clearAuthData();
          }
        } catch (error) {
          console.error('Auth verification failed:', error);
          clearAuthData();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const clearAuthData = () => {
    setUser(null);
    setToken(null);
    Cookies.remove('auth_token');
    Cookies.remove('user');
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      if (response.success) {
        const { user: userData, token: authToken } = response.data;
        setUser(userData);
        setToken(authToken);
        Cookies.set('auth_token', authToken, { expires: 7 });
        Cookies.set('user', JSON.stringify(userData), { expires: 7 });
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    try {
      const response = await authService.register(userData);
      if (response.success) {
        const { user: newUser, token: authToken } = response.data;
        setUser(newUser);
        setToken(authToken);
        Cookies.set('auth_token', authToken, { expires: 7 });
        Cookies.set('user', JSON.stringify(newUser), { expires: 7 });
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthData();
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      const response = await authService.updateProfile(userData);
      if (response.success) {
        setUser(response.data);
        Cookies.set('user', JSON.stringify(response.data), { expires: 7 });
      } else {
        throw new Error(response.message || 'Profile update failed');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    updateProfile,
    isLoading,
    isAuthenticated: !!user && !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

## Error Handling

### 1. Global Error Handler

```typescript
// src/hooks/useErrorHandler.ts
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface ErrorHandler {
  error: string | null;
  handleError: (error: any) => void;
  clearError: () => void;
}

export const useErrorHandler = (): ErrorHandler => {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((error: any) => {
    let errorMessage = 'An unexpected error occurred';

    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    setError(errorMessage);
    toast.error(errorMessage);
    console.error('Error:', error);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
};
```

### 2. API Error Types

```typescript
// src/types/errors.ts
export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  status_code: number;
}

export class ApiError extends Error {
  public status: number;
  public errors?: Record<string, string[]>;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}
```

## File Upload Integration

### 1. File Upload Hook

```typescript
// src/hooks/useFileUpload.ts
import { useState, useCallback } from 'react';
import { documentsService } from '../services/apiService';

interface FileUploadOptions {
  onSuccess?: (document: any) => void;
  onError?: (error: any) => void;
  onProgress?: (progress: number) => void;
}

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFile = useCallback(async (
    file: File,
    documentData: {
      title: string;
      description: string;
      category: string;
      tags?: string[];
    },
    options?: FileUploadOptions
  ) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', documentData.title);
      formData.append('description', documentData.description);
      formData.append('category', documentData.category);
      
      if (documentData.tags) {
        documentData.tags.forEach(tag => {
          formData.append('tags[]', tag);
        });
      }

      const response = await documentsService.create(formData);
      
      if (response.success) {
        options?.onSuccess?.(response.data);
        setUploadProgress(100);
      } else {
        throw new Error(response.message || 'Upload failed');
      }
    } catch (error) {
      options?.onError?.(error);
      throw error;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, []);

  return {
    uploadFile,
    isUploading,
    uploadProgress,
  };
};
```

## Real-time Features

### 1. WebSocket Integration

```typescript
// src/hooks/useWebSocket.ts
import { useEffect, useState, useCallback } from 'react';
import Pusher from 'pusher-js';

interface WebSocketOptions {
  onNotification?: (notification: any) => void;
  onDocumentRequestUpdate?: (request: any) => void;
  onProjectUpdate?: (project: any) => void;
}

export const useWebSocket = (options?: WebSocketOptions) => {
  const [isConnected, setIsConnected] = useState(false);
  const [pusher, setPusher] = useState<Pusher | null>(null);

  useEffect(() => {
    const pusherClient = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      encrypted: true,
    });

    pusherClient.connection.bind('connected', () => {
      setIsConnected(true);
    });

    pusherClient.connection.bind('disconnected', () => {
      setIsConnected(false);
    });

    // Subscribe to channels
    const notificationsChannel = pusherClient.subscribe('notifications');
    const documentRequestsChannel = pusherClient.subscribe('document-requests');
    const projectsChannel = pusherClient.subscribe('projects');

    // Bind events
    notificationsChannel.bind('new-notification', (data: any) => {
      options?.onNotification?.(data);
    });

    documentRequestsChannel.bind('request-updated', (data: any) => {
      options?.onDocumentRequestUpdate?.(data);
    });

    projectsChannel.bind('project-updated', (data: any) => {
      options?.onProjectUpdate?.(data);
    });

    setPusher(pusherClient);

    return () => {
      pusherClient.disconnect();
    };
  }, [options]);

  const sendMessage = useCallback((channel: string, event: string, data: any) => {
    if (pusher) {
      pusher.trigger(channel, event, data);
    }
  }, [pusher]);

  return {
    isConnected,
    sendMessage,
  };
};
```

## Testing Strategy

### 1. API Service Tests

```typescript
// src/services/__tests__/apiService.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { projectsService } from '../apiService';
import api from '../../lib/api';

// Mock axios
vi.mock('../../lib/api');

describe('Projects Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch all projects', async () => {
    const mockResponse = {
      data: {
        success: true,
        data: [
          {
            id: 1,
            title: 'Test Project',
            description: 'Test Description',
            location: 'Test Location',
            status: 'in_progress',
            progress: 50,
            start_date: '2024-01-01',
            beneficiaries: 1000,
          },
        ],
        pagination: {
          current_page: 1,
          total_pages: 1,
          total_items: 1,
          per_page: 10,
        },
      },
    };

    (api.get as any).mockResolvedValue(mockResponse);

    const result = await projectsService.getAll();

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
    expect(result.data[0].title).toBe('Test Project');
  });

  it('should handle API errors', async () => {
    const mockError = new Error('API Error');
    (api.get as any).mockRejectedValue(mockError);

    await expect(projectsService.getAll()).rejects.toThrow('API Error');
  });
});
```

## Deployment Configuration

### 1. Environment Variables

```env
# Frontend (.env.production)
VITE_API_BASE_URL=https://api.urbanplanning.ly
VITE_PUSHER_APP_KEY=your-pusher-key
VITE_PUSHER_APP_CLUSTER=mt1
VITE_APP_NAME=Urban Planning Hub
```

### 2. Docker Configuration

```dockerfile
# Dockerfile.frontend
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "80:80"
    environment:
      - VITE_API_BASE_URL=http://backend:8000/api
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DB_HOST=db
      - DB_DATABASE=urban_planning_hub
      - DB_USERNAME=root
      - DB_PASSWORD=password
    depends_on:
      - db

  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=urban_planning_hub
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

## Security Considerations

### 1. CORS Configuration

```php
// config/cors.php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:5173',
        'https://your-frontend-domain.com',
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

### 2. Rate Limiting

```php
// app/Http/Kernel.php
protected $middlewareGroups = [
    'api' => [
        'throttle:60,1', // 60 requests per minute
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ],
];
```

### 3. Input Validation

```php
// app/Http/Requests/ProjectRequest.php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'status' => 'required|in:planning,in_progress,completed,on_hold',
            'progress' => 'integer|min:0|max:100',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'beneficiaries' => 'integer|min:0',
            'budget' => 'nullable|numeric|min:0',
            'image_url' => 'nullable|url',
        ];
    }
}
```

This comprehensive integration guide provides everything needed to connect your React frontend with a Laravel backend, including authentication, CRUD operations, file uploads, real-time features, and deployment configurations.

