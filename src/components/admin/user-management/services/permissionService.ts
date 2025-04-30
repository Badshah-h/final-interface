/**
 * Permission API service
 */
import { BaseApiService } from "@/services/api/base";
import { ApiResponse, UpdatePermissionsRequest } from "@/services/api/types";
import { PermissionCategory } from "../types";

export class PermissionService extends BaseApiService {
  /**
   * Get all available permissions grouped by category
   */
  async getPermissions(): Promise<ApiResponse<PermissionCategory[]>> {
    return this.get<ApiResponse<PermissionCategory[]>>("/permissions");
  }

  /**
   * Get permissions for a specific role
   */
  async getRolePermissions(roleId: string): Promise<ApiResponse<string[]>> {
    return this.get<ApiResponse<string[]>>(`/roles/${roleId}/permissions`);
  }

  /**
   * Update permissions for a role
   */
  async updateRolePermissions(
    roleId: string,
    data: UpdatePermissionsRequest,
  ): Promise<ApiResponse<string[]>> {
    return this.put<ApiResponse<string[]>>(
      `/roles/${roleId}/permissions`,
      data,
    );
  }

  /**
   * Get permissions for a specific user
   */
  async getUserPermissions(userId: string): Promise<ApiResponse<string[]>> {
    return this.get<ApiResponse<string[]>>(`/users/${userId}/permissions`);
  }
}
