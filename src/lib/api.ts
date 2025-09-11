import axios from 'axios';
import Cookies from 'js-cookie';

// API Base URL - use Replit domain in production, fallback to localhost:3001
const getApiBaseUrl = () => {
  // In production (Replit), use the domain with backend port
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL as string;
  }
  
  // Check if we're in Replit environment
  const domain = typeof window !== 'undefined' ? window.location.hostname : '';
  if (domain.includes('replit.dev')) {
    return `https://${domain.replace('-5000', '-3001')}`;
  }
  
  // Local development fallback
  return 'http://localhost:3001';
};

export const API_BASE_URL = getApiBaseUrl();

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth token and redirect to login
      Cookies.remove('authToken');
      Cookies.remove('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  category: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentRequest {
  id: string;
  userId: string;
  documentId: string;
  purpose: string;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  notes?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
  user?: User;
  document?: Document;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface CreateRequestData {
  documentId: string;
  purpose: string;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  notes?: string;
}

// Auth API
export const authAPI = {
  login: async (data: LoginRequest) => {
    const response = await api.post('/api/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest) => {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  updateProfile: async (data: Partial<User>) => {
    const response = await api.put('/api/auth/profile', data);
    return response.data;
  },
};

// Documents API
export const documentsAPI = {
  getAll: async (params?: { category?: string; search?: string; page?: number; limit?: number }) => {
    const response = await api.get('/api/documents', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/api/documents/${id}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/api/categories/filter');
    return response.data;
  },
};

// Document Requests API
export const requestsAPI = {
  create: async (data: CreateRequestData) => {
    const response = await api.post('/api/requests', data);
    return response.data;
  },

  getUserRequests: async () => {
    const response = await api.get('/api/requests');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/api/requests/${id}`);
    return response.data;
  },

  cancel: async (id: string) => {
    const response = await api.delete(`/api/requests/${id}`);
    return response.data;
  },
};

// Admin API
export const adminAPI = {
  getAllRequests: async (params?: { status?: string; page?: number; limit?: number }) => {
    const response = await api.get('/api/admin/requests', { params });
    return response.data;
  },

  updateRequestStatus: async (id: string, status: string, notes?: string) => {
    const response = await api.put(`/api/admin/requests/${id}/status`, { status, notes });
    return response.data;
  },

  approveRequest: async (id: string, adminNotes?: string) => {
    const response = await api.put(`/api/admin/requests/${id}/approve`, { adminNotes });
    return response.data;
  },

  rejectRequest: async (id: string, adminNotes: string) => {
    const response = await api.put(`/api/admin/requests/${id}/reject`, { adminNotes });
    return response.data;
  },

  generateDownloadLink: async (id: string) => {
    const response = await api.post(`/api/admin/requests/${id}/download-link`);
    return response.data;
  },

  getRequestDetails: async (id: string) => {
    const response = await api.get(`/api/admin/requests/${id}`);
    return response.data;
  },

  getRequestStats: async () => {
    const response = await api.get('/api/admin/stats/requests');
    return response.data;
  },

  getDocumentStats: async () => {
    const response = await api.get('/api/admin/stats/documents');
    return response.data;
  },

  // User Management
  getAllUsers: async (params?: { page?: number; limit?: number; role?: string; search?: string }) => {
    const response = await api.get('/api/admin/users', { params });
    return response.data;
  },

  updateUserRole: async (id: string, role: string) => {
    const response = await api.put(`/api/admin/users/${id}/role`, { role });
    return response.data;
  },

  toggleUserStatus: async (id: string) => {
    const response = await api.put(`/api/admin/users/${id}/toggle-status`);
    return response.data;
  },

  // System Settings
  getSystemSettings: async () => {
    const response = await api.get('/api/admin/settings');
    return response.data;
  },

  updateSystemSettings: async (settings: any) => {
    const response = await api.put('/api/admin/settings', settings);
    return response.data;
  },

  // Media Management
  getMediaFiles: async () => {
    const response = await api.get('/api/admin/media');
    return response.data;
  },

  deleteMediaFile: async (filename: string) => {
    const response = await api.delete(`/api/admin/media/${filename}`);
    return response.data;
  },

  // Bulk Operations
  bulkUpdateRequests: async (data: { requestIds: string[]; action: string; status?: string; adminNotes?: string }) => {
    const response = await api.put('/api/admin/requests/bulk', data);
    return response.data;
  },

  bulkUpdateDocuments: async (data: { documentIds: string[]; action: string; isActive?: boolean; category?: string }) => {
    const response = await api.put('/api/admin/documents/bulk', data);
    return response.data;
  },

  // Analytics
  getAnalytics: async (period?: string) => {
    const response = await api.get('/api/admin/analytics', { params: { period } });
    return response.data;
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;

