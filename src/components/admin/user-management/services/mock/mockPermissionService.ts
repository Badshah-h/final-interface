/**
 * Mock Permission API service implementation
 */
import { MOCK_API_DELAY } from "@/services/api/config";
import { ApiResponse, UpdatePermissionsRequest } from "@/services/api/types";
import { PermissionCategory } from "../../types";
import { mockDataStore } from "./mockDataService";

export class MockPermissionService {
  /**
   * Get all available permissions grouped by category
   */
  async getPermissions(): Promise<ApiResponse<PermissionCategory[]>> {
    await this.delay();

    return {
      data: mockDataStore.permissions,
    };
  }

  /**
   * Get permissions for a specific role
   */
  async getRolePermissions(roleId: string): Promise<ApiResponse<string[]>> {
    await this.delay();

    const role = mockDataStore.roles.find((role) => role.id === roleId);

    if (!role) {
      throw new Error(`Role with ID ${roleId} not found`);
    }

    return {
      data: role.permissions,
    };
  }

  /**
   * Update permissions for a role
   */
  async updateRolePermissions(
    roleId: string,
    data: UpdatePermissionsRequest,
  ): Promise<ApiResponse<string[]>> {
    await this.delay();

    const roleIndex = mockDataStore.roles.findIndex(
      (role) => role.id === roleId,
    );

    if (roleIndex === -1) {
      throw new Error(`Role with ID ${roleId} not found`);
    }

    mockDataStore.roles[roleIndex].permissions = [...data.permissions];

    // Add activity log
    mockDataStore.addActivityLog({
      user: "Admin User",
      action: "Updated permissions",
      target: mockDataStore.roles[roleIndex].name,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    });

    return {
      data: mockDataStore.roles[roleIndex].permissions,
      message: "Permissions updated successfully",
    };
  }

  /**
   * Get permissions for a specific user
   */
  async getUserPermissions(userId: string): Promise<ApiResponse<string[]>> {
    await this.delay();

    const user = mockDataStore.users.find((user) => user.id === userId);

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Find the role for this user
    const role = mockDataStore.roles.find(
      (role) => role.name.toLowerCase() === user.role,
    );

    if (!role) {
      return { data: [] };
    }

    return {
      data: role.permissions,
    };
  }

  /**
   * Helper method to simulate API delay
   */
  private async delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));
  }
}
