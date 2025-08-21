import { Document } from './api';

export function normalizeDocuments(response: any): Document[] {
  if (!response) return [];
  if (Array.isArray(response)) return response as Document[];
  if (response.success && response.data && Array.isArray(response.data.documents)) return response.data.documents as Document[];
  if (response.data && Array.isArray(response.data.documents)) return response.data.documents as Document[];
  if (Array.isArray(response.documents)) return response.documents as Document[];
  return [];
}

export function normalizeCategories(response: any): string[] {
  if (!response) return [];
  if (Array.isArray(response)) return response as string[];
  if (response.success && response.data && Array.isArray(response.data.categories)) return response.data.categories as string[];
  if (response.data && Array.isArray(response.data.categories)) return response.data.categories as string[];
  if (Array.isArray(response.categories)) return response.categories as string[];
  return [];
}
