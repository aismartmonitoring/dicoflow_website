/**
 * Professional Services Library
 * API services and data handling
 */

import { MedicalImage, QualityMetric, ComparisonData } from './types';

// Base API Configuration
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
} as const;

// Error Classes
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Network connection failed') {
    super(message);
    this.name = 'NetworkError';
  }
}

// Base API Service
class BaseAPIService {
  protected baseURL: string;

  constructor(baseURL: string = API_CONFIG.baseURL) {
    this.baseURL = baseURL;
  }

  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new APIError(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData.code
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      
      if (error instanceof TypeError) {
        throw new NetworkError();
      }
      
      throw new APIError('An unexpected error occurred');
    }
  }

  protected get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const searchParams = params ? new URLSearchParams(params) : null;
    const url = searchParams ? `${endpoint}?${searchParams}` : endpoint;
    
    return this.request<T>(url, { method: 'GET' });
  }

  protected post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Medical Imaging Service
export class MedicalImagingService extends BaseAPIService {
  // Get medical images
  async getImages(filters?: {
    type?: string;
    modality?: string;
    dateRange?: { start: string; end: string };
  }): Promise<MedicalImage[]> {
    const params: Record<string, string> = {};
    
    if (filters?.type) params.type = filters.type;
    if (filters?.modality) params.modality = filters.modality;
    if (filters?.dateRange) {
      params.startDate = filters.dateRange.start;
      params.endDate = filters.dateRange.end;
    }

    return this.get<MedicalImage[]>('/images', params);
  }

  // Get single image
  async getImage(id: string): Promise<MedicalImage> {
    return this.get<MedicalImage>(`/images/${id}`);
  }

  // Upload new image
  async uploadImage(file: File, metadata: Partial<MedicalImage>): Promise<MedicalImage> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));

    const response = await fetch(`${this.baseURL}/images/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new APIError(`Upload failed: ${response.statusText}`, response.status);
    }

    return response.json();
  }

  // Process image with AI enhancement
  async enhanceImage(imageId: string, options?: {
    algorithm?: string;
    intensity?: number;
  }): Promise<MedicalImage> {
    return this.post<MedicalImage>(`/images/${imageId}/enhance`, options);
  }

  // Get quality metrics
  async getQualityMetrics(imageId: string): Promise<QualityMetric[]> {
    return this.get<QualityMetric[]>(`/images/${imageId}/quality`);
  }

  // Compare images
  async compareImages(imageIds: string[]): Promise<ComparisonData> {
    return this.post<ComparisonData>('/images/compare', { imageIds });
  }
}

// Analytics Service
export class AnalyticsService extends BaseAPIService {
  // Track user interaction
  async trackEvent(event: {
    name: string;
    properties?: Record<string, unknown>;
    userId?: string;
  }): Promise<void> {
    await this.post('/analytics/events', event);
  }

  // Track image view
  async trackImageView(imageId: string, metadata?: Record<string, unknown>): Promise<void> {
    await this.trackEvent({
      name: 'image_viewed',
      properties: {
        imageId,
        ...metadata,
      },
    });
  }

  // Track comparison
  async trackComparison(imageIds: string[]): Promise<void> {
    await this.trackEvent({
      name: 'images_compared',
      properties: {
        imageCount: imageIds.length,
        imageIds,
      },
    });
  }

  // Get usage statistics
  async getUsageStats(period: 'day' | 'week' | 'month' | 'year'): Promise<{
    views: number;
    comparisons: number;
    uploads: number;
    users: number;
  }> {
    return this.get(`/analytics/stats?period=${period}`);
  }
}

// File Service
export class FileService {
  // Generate presigned URL for direct upload
  static async getUploadURL(filename: string, contentType: string): Promise<{
    uploadURL: string;
    fileURL: string;
  }> {
    const response = await fetch('/api/files/upload-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, contentType }),
    });

    if (!response.ok) {
      throw new APIError('Failed to get upload URL');
    }

    return response.json();
  }

  // Upload file directly to storage
  static async uploadFile(file: File, uploadURL: string): Promise<void> {
    const response = await fetch(uploadURL, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!response.ok) {
      throw new APIError('File upload failed');
    }
  }

  // Get file download URL
  static async getDownloadURL(fileId: string): Promise<string> {
    const response = await fetch(`/api/files/${fileId}/download-url`);
    
    if (!response.ok) {
      throw new APIError('Failed to get download URL');
    }

    const data = await response.json();
    return data.downloadURL;
  }
}

// Service Instances
export const medicalImagingService = new MedicalImagingService();
export const analyticsService = new AnalyticsService();

// Service Factory
export class ServiceFactory {
  private static instances = new Map<string, BaseAPIService>();

  static getMedicalImagingService(): MedicalImagingService {
    if (!this.instances.has('medical-imaging')) {
      this.instances.set('medical-imaging', new MedicalImagingService());
    }
    return this.instances.get('medical-imaging') as MedicalImagingService;
  }

  static getAnalyticsService(): AnalyticsService {
    if (!this.instances.has('analytics')) {
      this.instances.set('analytics', new AnalyticsService());
    }
    return this.instances.get('analytics') as AnalyticsService;
  }

  static createCustomService(name: string, baseURL?: string): BaseAPIService {
    const service = new BaseAPIService(baseURL);
    this.instances.set(name, service);
    return service;
  }
}

// Error Handler Utility
export const handleServiceError = (error: unknown): {
  message: string;
  type: 'network' | 'api' | 'unknown';
  status?: number;
} => {
  if (error instanceof NetworkError) {
    return {
      message: 'Network connection failed. Please check your internet connection.',
      type: 'network',
    };
  }

  if (error instanceof APIError) {
    return {
      message: error.message,
      type: 'api',
      status: error.status,
    };
  }

  return {
    message: 'An unexpected error occurred. Please try again.',
    type: 'unknown',
  };
};

// Retry Utility
export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> => {
  let lastError: Error;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (i === maxRetries) break;
      
      // Only retry on network errors or 5xx server errors
      if (error instanceof NetworkError || 
          (error instanceof APIError && error.status && error.status >= 500)) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
        continue;
      }
      
      break;
    }
  }

  throw lastError!;
};