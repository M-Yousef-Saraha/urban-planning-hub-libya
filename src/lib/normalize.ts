import { Document } from './api';

export function normalizeDocuments(response: any): Document[] {
  if (!response) return [];
  if (Array.isArray(response)) return response as Document[];
  if (response.success && response.data && Array.isArray(response.data.documents)) return response.data.documents as Document[];
  if (response.data && Array.isArray(response.data.documents)) return response.data.documents as Document[];
  if (Array.isArray(response.documents)) return response.documents as Document[];
  return [];
}

export function normalizeCategories(response: any): any[] {
  if (!response) return [];
  
  // Handle hierarchical categories
  if (response.success && response.data) {
    if (response.data.hierarchical && Array.isArray(response.data.hierarchical)) {
      return response.data.hierarchical;
    }
    if (response.data.categories && Array.isArray(response.data.categories)) {
      return response.data.categories;
    }
    if (response.data.legacy && Array.isArray(response.data.legacy)) {
      return response.data.legacy;
    }
  }
  
  // Handle legacy format
  if (Array.isArray(response)) return response;
  if (response.data && Array.isArray(response.data.categories)) return response.data.categories;
  if (Array.isArray(response.categories)) return response.categories;
  
  return [];
}
