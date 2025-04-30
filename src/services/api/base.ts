/**
 * Base API service with common functionality for making HTTP requests
 */
import { API_BASE_URL, DEFAULT_HEADERS, REQUEST_TIMEOUT } from "./config";

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export class BaseApiService {
  protected baseUrl: string;
  protected headers: HeadersInit;

  constructor(
    baseUrl: string = API_BASE_URL,
    headers: HeadersInit = DEFAULT_HEADERS,
  ) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  /**
   * Set authorization header with bearer token
   */
  setAuthToken(token: string): void {
    this.headers = {
      ...this.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  /**
   * Make a GET request
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = this.buildUrl(endpoint, params);
    return this.request<T>(url, {
      method: "GET",
      headers: this.headers,
    });
  }

  /**
   * Make a POST request
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>(url, {
      method: "POST",
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * Make a PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>(url, {
      method: "PUT",
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * Make a PATCH request
   */
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>(url, {
      method: "PATCH",
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>(url, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  /**
   * Build URL with query parameters
   */
  protected buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  /**
   * Make a request with timeout and error handling
   */
  private async request<T>(url: string, options: RequestInit): Promise<T> {
    try {
      const controller = new AbortController();
      const { signal } = controller;

      // Set timeout
      const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

      const response = await fetch(url, { ...options, signal });
      clearTimeout(timeout);

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.message || `API error: ${response.status}`,
          response.status,
          data,
        );
      }

      return data as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof DOMException && error.name === "AbortError") {
        throw new ApiError("Request timeout", 408);
      }

      throw new ApiError(
        error instanceof Error ? error.message : "Unknown error",
        500,
      );
    }
  }
}
