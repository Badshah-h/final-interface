/**
 * Mock Role API service implementation
 */
import { MOCK_API_DELAY } from "@/services/api/config";
import {
  ApiResponse,
  CreateRoleRequest,
  PaginatedResponse,
  RoleQueryParams,
  UpdateRoleRequest,
} from "@/services/api/types";
import { Role, User } from "../../types";
import { createPaginatedResponse, mockDataStore } from "./mockDataService";

export class MockRoleService {
  /**
   * Get all roles with optional filtering and pagination
   */
  async getRoles(params?: RoleQueryParams): Promise<PaginatedResponse<Role>> {
    await this.delay();

    let filteredRoles = [...mockDataStore.roles];

    // Apply filters
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filteredRoles = filteredRoles.filter(
        (role) =>
          role.name.toLowerCase().includes(searchLower) ||
          role.description.toLowerCase().includes(searchLower),
      );
    }

    // Apply sorting
    if (params?.sort_by) {
      const direction = params.sort_direction === "desc" ? -1 : 1;
      filteredRoles.sort((a: any, b: any) => {
        if (a[params.sort_by!] < b[params.sort_by!]) return -1 * direction;
        if (a[params.sort_by!] > b[params.sort_by!]) return 1 * direction;
        return 0;
      });
    }

    return createPaginatedResponse(
      filteredRoles,
      params?.page || 1,
      params?.per_page || 10,
    );
  }

  /**
   * Get a single role by ID
   */
  async getRole(id: string): Promise<ApiResponse<Role>> {
    await this.delay();

    const role = mockDataStore.roles.find((role) => role.id === id);

    if (!role) {
      throw new Error(`Role with ID ${id} not found`);
    }

    return { data: role };
  }

  /**
   * Create a new role
   */
  async createRole(roleData: CreateRoleRequest): Promise<ApiResponse<Role>> {
    await this.delay();

    const newRole: Role = {
      id: mockDataStore.getNextRoleId(),
      name: roleData.name,
      description: roleData.description,
      permissions: [...roleData.permissions],
      userCount: 0,
    };

    mockDataStore.roles.push(newRole);

    // Add activity log
    mockDataStore.addActivityLog({
      user: "Admin User",
      action: "Created new role",
      target: roleData.name,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    });

    return {
      data: newRole,
      message: "Role created successfully",
    };
  }

  /**
   * Update an existing role
   */
  async updateRole(
    id: string,
    roleData: UpdateRoleRequest,
  ): Promise<ApiResponse<Role>> {
    await this.delay();

    const roleIndex = mockDataStore.roles.findIndex((role) => role.id === id);

    if (roleIndex === -1) {
      throw new Error(`Role with ID ${id} not found`);
    }

    const updatedRole = {
      ...mockDataStore.roles[roleIndex],
      ...roleData,
      permissions:
        roleData.permissions || mockDataStore.roles[roleIndex].permissions,
    };

    mockDataStore.roles[roleIndex] = updatedRole;

    // Add activity log
    mockDataStore.addActivityLog({
      user: "Admin User",
      action: "Updated role",
      target: updatedRole.name,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    });

    return {
      data: updatedRole,
      message: "Role updated successfully",
    };
  }

  /**
   * Delete a role
   */
  async deleteRole(id: string): Promise<ApiResponse<null>> {
    await this.delay();

    const roleIndex = mockDataStore.roles.findIndex((role) => role.id === id);

    if (roleIndex === -1) {
      throw new Error(`Role with ID ${id} not found`);
    }

    const deletedRole = mockDataStore.roles[roleIndex];

    // Check if role has users
    if (deletedRole.userCount > 0) {
      throw new Error(`Cannot delete role with assigned users`);
    }

    mockDataStore.roles.splice(roleIndex, 1);

    // Add activity log
    mockDataStore.addActivityLog({
      user: "Admin User",
      action: "Deleted role",
      target: deletedRole.name,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    });

    return {
      data: null,
      message: "Role deleted successfully",
    };
  }

  /**
   * Get users assigned to a role
   */
  async getRoleUsers(id: string): Promise<ApiResponse<User[]>> {
    await this.delay();

    const role = mockDataStore.roles.find((role) => role.id === id);

    if (!role) {
      throw new Error(`Role with ID ${id} not found`);
    }

    const roleUsers = mockDataStore.users.filter(
      (user) => user.role === role.name.toLowerCase(),
    );

    return {
      data: roleUsers,
    };
  }

  /**
   * Helper method to simulate API delay
   */
  private async delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));
  }
}
