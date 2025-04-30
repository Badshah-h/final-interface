import { BaseApiService } from "../api/base";
import { ApiResponse, PaginatedResponse } from "../api/types";
import { Role, User } from "@/components/admin/user-management/types";

export interface RoleQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  sort_by?: string;
  sort_direction?: "asc" | "desc";
}

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

class RoleService extends BaseApiService {
  /**
   * Get all roles with optional filtering and pagination
   */
  async getRoles(params?: RoleQueryParams): Promise<PaginatedResponse<Role>> {
    return this.get<PaginatedResponse<Role>>("/roles", params);
  }

  /**
   * Get a single role by ID
   */
  async getRole(id: string): Promise<ApiResponse<Role>> {
    return this.get<ApiResponse<Role>>(`/roles/${id}`);
  }

  /**
   * Create a new role
   */
  async createRole(roleData: CreateRoleRequest): Promise<ApiResponse<Role>> {
    return this.post<ApiResponse<Role>>("/roles", roleData);
  }

  /**
   * Update an existing role
   */
  async updateRole(
    id: string,
    roleData: UpdateRoleRequest,
  ): Promise<ApiResponse<Role>> {
    return this.patch<ApiResponse<Role>>(`/roles/${id}`, roleData);
  }

  /**
   * Delete a role
   */
  async deleteRole(id: string): Promise<ApiResponse<null>> {
    return this.delete<ApiResponse<null>>(`/roles/${id}`);
  }

  /**
   * Get users assigned to a role
   */
  async getRoleUsers(id: string): Promise<ApiResponse<User[]>> {
    return this.get<ApiResponse<User[]>>(`/roles/${id}/users`);
  }

  /**
   * Check if the current user has a specific role
   */
  async hasRole(roleName: string): Promise<boolean> {
    try {
      const response =
        await this.get<ApiResponse<{ roles: string[] }>>("/user/roles");
      return response.data.roles.includes(roleName);
    } catch (error) {
      console.error("Error checking role:", error);
      return false;
    }
  }
}

export const roleService = new RoleService();
