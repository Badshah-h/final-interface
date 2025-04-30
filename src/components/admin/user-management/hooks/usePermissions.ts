/**
 * Custom hook for permission management operations
 */
import { useState, useEffect, useCallback } from "react";
import { permissionService } from "../services";
import { useApi } from "@/hooks/useApi";
import { PermissionCategory } from "../types";
import { UpdatePermissionsRequest } from "../services/index";

export function usePermissions() {
  const [permissionCategories, setPermissionCategories] = useState<
    PermissionCategory[]
  >([]);

  // API hooks
  const {
    isLoading: isLoadingPermissions,
    error: permissionsError,
    execute: fetchPermissions,
  } = useApi(permissionService.getPermissions.bind(permissionService));

  const {
    isLoading: isLoadingRolePermissions,
    error: rolePermissionsError,
    execute: fetchRolePermissions,
  } = useApi(permissionService.getRolePermissions.bind(permissionService));

  const { isLoading: isUpdatingPermissions, execute: updateRolePermissions } =
    useApi(async (roleId: string, permissions: string[]) => {
      return permissionService.updateRolePermissions(roleId, {
        permissions,
      });
    });

  // Fetch all available permissions
  const fetchPermissionData = useCallback(async () => {
    try {
      const response = await fetchPermissions();
      setPermissionCategories(response.data);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  }, [fetchPermissions]);

  // Initial data fetch
  useEffect(() => {
    fetchPermissionData();
  }, [fetchPermissionData]);

  return {
    permissionCategories,
    isLoadingPermissions,
    permissionsError,
    fetchPermissions: fetchPermissionData,
    fetchRolePermissions,
    isLoadingRolePermissions,
    rolePermissionsError,
    updateRolePermissions,
    isUpdatingPermissions,
  };
}
