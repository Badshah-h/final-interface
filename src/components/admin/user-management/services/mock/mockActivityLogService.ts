/**
 * Mock Activity Log API service implementation
 */
import { MOCK_API_DELAY } from "@/services/api/config";
import {
  ActivityLogQueryParams,
  ApiResponse,
  PaginatedResponse,
} from "@/services/api/types";
import { ActivityLogEntry } from "../../types";
import { createPaginatedResponse, mockDataStore } from "./mockDataService";

export class MockActivityLogService {
  /**
   * Get activity logs with optional filtering and pagination
   */
  async getActivityLogs(
    params?: ActivityLogQueryParams,
  ): Promise<PaginatedResponse<ActivityLogEntry>> {
    await this.delay();

    let filteredLogs = [...mockDataStore.activityLogs];

    // Apply filters
    if (params?.user_id) {
      const user = mockDataStore.users.find(
        (user) => user.id === params.user_id,
      );
      if (user) {
        filteredLogs = filteredLogs.filter((log) => log.user === user.name);
      }
    }

    if (params?.action_type) {
      filteredLogs = filteredLogs.filter((log) =>
        log.action.toLowerCase().includes(params.action_type!.toLowerCase()),
      );
    }

    // Apply sorting
    if (params?.sort_by) {
      const direction = params.sort_direction === "desc" ? -1 : 1;
      filteredLogs.sort((a: any, b: any) => {
        if (a[params.sort_by!] < b[params.sort_by!]) return -1 * direction;
        if (a[params.sort_by!] > b[params.sort_by!]) return 1 * direction;
        return 0;
      });
    }

    return createPaginatedResponse(
      filteredLogs,
      params?.page || 1,
      params?.per_page || 10,
    );
  }

  /**
   * Get a single activity log entry by ID
   */
  async getActivityLog(id: string): Promise<ApiResponse<ActivityLogEntry>> {
    await this.delay();

    // Since our mock data doesn't have IDs for activity logs, we'll just return the first one
    return {
      data: mockDataStore.activityLogs[0],
    };
  }

  /**
   * Get activity logs for a specific user
   */
  async getUserActivityLogs(
    userId: string,
    params?: ActivityLogQueryParams,
  ): Promise<PaginatedResponse<ActivityLogEntry>> {
    await this.delay();

    const user = mockDataStore.users.find((user) => user.id === userId);

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const userLogs = mockDataStore.activityLogs.filter(
      (log) => log.user === user.name,
    );

    return createPaginatedResponse(
      userLogs,
      params?.page || 1,
      params?.per_page || 10,
    );
  }

  /**
   * Export activity logs as CSV or JSON
   */
  async exportActivityLogs(
    format: "csv" | "json",
    params?: ActivityLogQueryParams,
  ): Promise<Blob> {
    await this.delay();

    let filteredLogs = [...mockDataStore.activityLogs];

    // Apply filters (simplified for mock)
    if (params?.user_id) {
      const user = mockDataStore.users.find(
        (user) => user.id === params.user_id,
      );
      if (user) {
        filteredLogs = filteredLogs.filter((log) => log.user === user.name);
      }
    }

    if (format === "json") {
      const jsonString = JSON.stringify(filteredLogs, null, 2);
      return new Blob([jsonString], { type: "application/json" });
    } else {
      // Create CSV
      const headers = ["User", "Action", "Target", "Timestamp"];
      const rows = filteredLogs.map((log) => [
        log.user,
        log.action,
        log.target,
        log.timestamp,
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.join(",")),
      ].join("\n");

      return new Blob([csvContent], { type: "text/csv" });
    }
  }

  /**
   * Helper method to simulate API delay
   */
  private async delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));
  }
}
