import { BaseApiService } from "../api/base";
import { ApiResponse } from "../api/types";
import { tokenService } from "./tokenService";

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  status: string;
  last_active_at?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
  roles?: { id: string; name: string }[];
  permissions?: string[];
}

class AuthService extends BaseApiService {
  /**
   * Login with email and password
   */
  async login(
    credentials: LoginCredentials,
  ): Promise<ApiResponse<{ token: string; user: User }>> {
    const response = await this.post<
      ApiResponse<{ token: string; user: User }>
    >("/login", credentials);

    // Store the token
    if (response.data?.token) {
      tokenService.setToken(response.data.token);
      this.setAuthToken(response.data.token);
    }

    return response;
  }

  /**
   * Register a new user
   */
  async register(
    data: RegisterData,
  ): Promise<ApiResponse<{ token: string; user: User }>> {
    const response = await this.post<
      ApiResponse<{ token: string; user: User }>
    >("/register", data);

    // Store the token
    if (response.data?.token) {
      tokenService.setToken(response.data.token);
      this.setAuthToken(response.data.token);
    }

    return response;
  }

  /**
   * Logout the current user
   */
  async logout(): Promise<ApiResponse<null>> {
    try {
      const response = await this.post<ApiResponse<null>>("/logout");
      tokenService.clearToken();
      return response;
    } catch (error) {
      // Even if the API call fails, clear the token
      tokenService.clearToken();
      throw error;
    }
  }

  /**
   * Get the current authenticated user
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    const token = tokenService.getToken();
    if (token) {
      this.setAuthToken(token);
    }
    return this.get<ApiResponse<User>>("/user");
  }

  /**
   * Send password reset link
   */
  async forgotPassword(data: ForgotPasswordData): Promise<ApiResponse<null>> {
    return this.post<ApiResponse<null>>("/password/email", data);
  }

  /**
   * Reset password with token
   */
  async resetPassword(data: ResetPasswordData): Promise<ApiResponse<null>> {
    return this.post<ApiResponse<null>>("/password/reset", data);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!tokenService.getToken();
  }
}

export const authService = new AuthService();
