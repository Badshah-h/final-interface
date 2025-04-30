/**
 * API configuration
 */

// Base API URL - would be replaced with actual API URL in production
export const API_BASE_URL = "/api";

// Flag to toggle between mock and real API
export const USE_MOCK_API = true;

// Default request headers
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 10000;

// Mock API delay to simulate network latency (in milliseconds)
export const MOCK_API_DELAY = 500;
