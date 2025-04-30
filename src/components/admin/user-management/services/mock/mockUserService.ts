/**
 * Mock User API service implementation
 */
import { MOCK_API_DELAY } from "@/services/api/config";
import {
  ApiResponse,
  CreateUserRequest,
  PaginatedResponse,
  UpdateUserRequest,
  UserQueryParams,
} from "@/services/api/types";
import { User } from "../../types";
import { createPaginatedResponse, mockDataStore } from "./mockDataService";

export class MockUserService {
  /**
   * Get all users with optional filtering and pagination
   */
  async getUsers(params?: UserQueryParams): Promise<PaginatedResponse<User>> {
    await this.delay();

    let filteredUsers = [...mockDataStore.users];

    // Apply filters
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower),
      );
    }

    if (params?.role && params.role !== "all") {
      filteredUsers = filteredUsers.filter((user) => user.role === params.role);
    }

    if (params?.status && params.status !== "all") {
      filteredUsers = filteredUsers.filter(
        (user) => user.status === params.status,
      );
    }

    // Apply sorting
    if (params?.sort_by) {
      const direction = params.sort_direction === "desc" ? -1 : 1;
      filteredUsers.sort((a: any, b: any) => {
        if (a[params.sort_by!] < b[params.sort_by!]) return -1 * direction;
        if (a[params.sort_by!] > b[params.sort_by!]) return 1 * direction;
        return 0;
      });
    }

    return createPaginatedResponse(
      filteredUsers,
      params?.page || 1,
      params?.per_page || 10,
    );
  }

  /**
   * Get a single user by ID
   */
  async getUser(id: string): Promise<ApiResponse<User>> {
    await this.delay();

    const user = mockDataStore.users.find((user) => user.id === id);

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    return { data: user };
  }

  /**
   * Create a new user
   */
  async createUser(userData: CreateUserRequest): Promise<ApiResponse<User>> {
    await this.delay();

    const newUser: User = {
      id: mockDataStore.getNextUserId(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: "active",
      lastActive: "Never",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name.replace(/\s+/g, "")}`,
    };

    mockDataStore.users.push(newUser);

    // Add activity log
    mockDataStore.addActivityLog({
      user: "Admin User",
      action: "Created new user",
      target: userData.email,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    });

    return {
      data: newUser,
      message: "User created successfully",
    };
  }

  /**
   * Update an existing user
   */
  async updateUser(
    id: string,
    userData: UpdateUserRequest,
  ): Promise<ApiResponse<User>> {
    await this.delay();

    const userIndex = mockDataStore.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found`);
    }

    const updatedUser = {
      ...mockDataStore.users[userIndex],
      ...userData,
    };

    mockDataStore.users[userIndex] = updatedUser;

    // Add activity log
    mockDataStore.addActivityLog({
      user: "Admin User",
      action: "Updated user",
      target: updatedUser.email,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    });

    return {
      data: updatedUser,
      message: "User updated successfully",
    };
  }

  /**
   * Delete a user
   */
  async deleteUser(id: string): Promise<ApiResponse<null>> {
    await this.delay();

    const userIndex = mockDataStore.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found`);
    }

    const deletedUser = mockDataStore.users[userIndex];
    mockDataStore.users.splice(userIndex, 1);

    // Add activity log
    mockDataStore.addActivityLog({
      user: "Admin User",
      action: "Deleted user",
      target: deletedUser.email,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    });

    return {
      data: null,
      message: "User deleted successfully",
    };
  }

  /**
   * Send password reset email to user
   */
  async sendPasswordReset(email: string): Promise<ApiResponse<null>> {
    await this.delay();

    const user = mockDataStore.users.find((user) => user.email === email);

    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    // Add activity log
    mockDataStore.addActivityLog({
      user: "Admin User",
      action: "Sent password reset",
      target: email,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    });

    return {
      data: null,
      message: "Password reset email sent successfully",
    };
  }

  /**
   * Change user status (activate/deactivate)
   */
  async changeUserStatus(
    id: string,
    status: string,
  ): Promise<ApiResponse<User>> {
    await this.delay();

    const userIndex = mockDataStore.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found`);
    }

    mockDataStore.users[userIndex].status = status;

    // Add activity log
    mockDataStore.addActivityLog({
      user: "Admin User",
      action: `Changed user status to ${status}`,
      target: mockDataStore.users[userIndex].email,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    });

    return {
      data: mockDataStore.users[userIndex],
      message: `User status changed to ${status} successfully`,
    };
  }

  /**
   * Helper method to simulate API delay
   */
  private async delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));
  }
}
