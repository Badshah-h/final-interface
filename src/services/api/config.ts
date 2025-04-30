/**
 * API configuration
 */

// Base API URL - points to Laravel backend API
export const API_BASE_URL = "http://localhost:8000/api";

// Flag to toggle between mock and real API
export const USE_MOCK_API = false;

// Default request headers
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 10000;

// Mock API delay to simulate network latency (in milliseconds)
export const MOCK_API_DELAY = 500;
