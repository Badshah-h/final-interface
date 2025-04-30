/**
 * Service for managing authentication tokens
 */

const TOKEN_KEY = "auth_token";

class TokenService {
  /**
   * Store the authentication token
   */
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Get the stored authentication token
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Clear the stored authentication token
   */
  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export const tokenService = new TokenService();
