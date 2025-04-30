/**
 * Mock data service for API services
 * This uses the existing mock data from the data directory
 */
import {
  users,
  roles,
  availablePermissions,
  activityLogs,
} from "../../data/mockData";
import { PaginatedResponse, PaginationMeta } from "@/services/api/types";
import { User, Role, ActivityLogEntry } from "../../types";

// Helper to create paginated responses
export function createPaginatedResponse<T>(
  data: T[],
  page: number = 1,
  perPage: number = 10,
): PaginatedResponse<T> {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedData = data.slice(start, end);

  const meta: PaginationMeta = {
    current_page: page,
    from: start + 1,
    last_page: Math.ceil(data.length / perPage),
    path: "",
    per_page: perPage,
    to: Math.min(end, data.length),
    total: data.length,
  };

  return {
    data: paginatedData,
    meta,
  };
}

// In-memory data store that can be modified during runtime
export const mockDataStore = {
  users: [...users],
  roles: [...roles],
  permissions: [...availablePermissions],
  activityLogs: [...activityLogs],

  // Helper methods for data manipulation
  getNextUserId(): string {
    const maxId = Math.max(...this.users.map((user) => parseInt(user.id)));
    return (maxId + 1).toString();
  },

  getNextRoleId(): string {
    // For roles with string IDs like 'super-admin', generate a new one
    const numericIds = this.roles
      .map((role) => role.id)
      .filter((id) => !isNaN(parseInt(id)))
      .map((id) => parseInt(id));

    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
    return (maxId + 1).toString();
  },

  addActivityLog(entry: Omit<ActivityLogEntry, "timestamp">): ActivityLogEntry {
    const newEntry: ActivityLogEntry = {
      ...entry,
      timestamp: "Just now",
    };

    this.activityLogs.unshift(newEntry);
    return newEntry;
  },
};
