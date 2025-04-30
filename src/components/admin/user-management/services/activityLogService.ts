/**
 * Activity Log API service
 */
import { BaseApiService } from "@/services/api/base";
import {
  ActivityLogQueryParams,
  ApiResponse,
  PaginatedResponse,
} from "@/services/api/types";
import { ActivityLogEntry } from "../types";

export class ActivityLogService extends BaseApiService {
  /**
   * Get activity logs with optional filtering and pagination
   */
  async getActivityLogs(
    params?: ActivityLogQueryParams,
  ): Promise<PaginatedResponse<ActivityLogEntry>> {
    return this.get<PaginatedResponse<ActivityLogEntry>>(
      "/activity-logs",
      params,
    );
  }

  /**
   * Get a single activity log entry by ID
   */
  async getActivityLog(id: string): Promise<ApiResponse<ActivityLogEntry>> {
    return this.get<ApiResponse<ActivityLogEntry>>(`/activity-logs/${id}`);
  }

  /**
   * Get activity logs for a specific user
   */
  async getUserActivityLogs(
    userId: string,
    params?: ActivityLogQueryParams,
  ): Promise<PaginatedResponse<ActivityLogEntry>> {
    return this.get<PaginatedResponse<ActivityLogEntry>>(
      `/users/${userId}/activity-logs`,
      params,
    );
  }

  /**
   * Export activity logs as CSV or JSON
   */
  async exportActivityLogs(
    format: "csv" | "json",
    params?: ActivityLogQueryParams,
  ): Promise<Blob> {
    const url = this.buildUrl(`/activity-logs/export`, { ...params, format });
    const response = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Export failed: ${response.status}`);
    }

    return response.blob();
  }

  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }
}
