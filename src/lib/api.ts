import axios from 'axios';

// API Base URL - prefer explicit VITE_API_BASE_URL; otherwise use relative paths to leverage Vite proxy
const getApiBaseUrl = () => {
  // Explicit env override from Vite
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL as string;
  }
  // Local development fallback: use same-origin so `/api/*` hits Vite proxy
  return '';
};

export const API_BASE_URL = getApiBaseUrl();

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Types
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

export interface CreateRequestData {
  documentId: string;
  purpose: string;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  notes?: string;
}

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
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;

