/**
 * API service exports for user management module
 */
import { USE_MOCK_API } from "@/services/api/config";

// Real API services
import { UserService } from "./userService";
import { RoleService } from "./roleService";
import { PermissionService } from "./permissionService";
import { ActivityLogService } from "./activityLogService";

// Mock API services
import { MockUserService } from "./mock/mockUserService";
import { MockRoleService } from "./mock/mockRoleService";
import { MockPermissionService } from "./mock/mockPermissionService";
import { MockActivityLogService } from "./mock/mockActivityLogService";

// Create service instances
const userServiceImpl = USE_MOCK_API
  ? new MockUserService()
  : new UserService();

const roleServiceImpl = USE_MOCK_API
  ? new MockRoleService()
  : new RoleService();

const permissionServiceImpl = USE_MOCK_API
  ? new MockPermissionService()
  : new PermissionService();

const activityLogServiceImpl = USE_MOCK_API
  ? new MockActivityLogService()
  : new ActivityLogService();

// Export service instances
export const userService = userServiceImpl;
export const roleService = roleServiceImpl;
export const permissionService = permissionServiceImpl;
export const activityLogService = activityLogServiceImpl;

// Re-export types
export * from "@/services/api/types";
