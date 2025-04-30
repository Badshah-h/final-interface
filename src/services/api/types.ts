/**
 * API types for request/response data structures
 */
import {
  User,
  Role,
  Permission,
  PermissionCategory,
  ActivityLogEntry,
} from "@/components/admin/user-management/types";

// Common response structure
export interface ApiResponse<T> {
  data: T;
  message?: string;
  meta?: PaginationMeta;
}

// Pagination metadata
export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

// Paginated response
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// User API types
export interface CreateUserRequest {
  name: string;
  email: string;
  role: string;
  send_email?: boolean;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
}

// Role API types
export interface CreateRoleRequest {
  name: string;
  description: string;
  permissions: string[];
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
  permissions?: string[];
}

// Permission API types
export interface UpdatePermissionsRequest {
  permissions: string[];
}

// Query parameters
export interface UserQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  role?: string;
  status?: string;
  sort_by?: string;
  sort_direction?: "asc" | "desc";
}

export interface RoleQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  sort_by?: string;
  sort_direction?: "asc" | "desc";
}

export interface ActivityLogQueryParams {
  page?: number;
  per_page?: number;
  user_id?: string;
  action_type?: string;
  date_from?: string;
  date_to?: string;
  sort_by?: string;
  sort_direction?: "asc" | "desc";
}
