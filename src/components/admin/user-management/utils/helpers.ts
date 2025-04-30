// Helper functions for the user management module

export const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case "admin":
      return "default";
    case "moderator":
      return "secondary";
    default:
      return "outline";
  }
};

export const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "active":
      return "success";
    case "inactive":
      return "secondary";
    case "pending":
      return "warning";
    default:
      return "outline";
  }
};

export const handlePermissionChange = (
  permissionId: string,
  isChecked: boolean,
  setStateFunction: Function,
  currentState: any,
) => {
  if (isChecked) {
    setStateFunction({
      ...currentState,
      permissions: [...currentState.permissions, permissionId],
    });
  } else {
    setStateFunction({
      ...currentState,
      permissions: currentState.permissions.filter(
        (id: string) => id !== permissionId,
      ),
    });
  }
};
