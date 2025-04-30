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
const userServiceImpl = new UserService();
const roleServiceImpl = new RoleService();
const permissionServiceImpl = new PermissionService();
const activityLogServiceImpl = new ActivityLogService();

// Export service instances
export const userService = userServiceImpl;
export const roleService = roleServiceImpl;
export const permissionService = permissionServiceImpl;
export const activityLogService = activityLogServiceImpl;

// Re-export types
export * from "@/services/api/types";
