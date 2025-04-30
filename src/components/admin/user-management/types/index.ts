// Type definitions for the user management module

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  avatar: string;
}

export interface Permission {
  id: string;
  name: string;
}

export interface PermissionCategory {
  category: string;
  permissions: Permission[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
}

export interface ActivityLogEntry {
  user: string;
  action: string;
  target: string;
  timestamp: string;
  avatar: string;
}

export interface NewUser {
  name: string;
  email: string;
  role: string;
}

export interface EditedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface NewRole {
  name: string;
  description: string;
  permissions: string[];
}

export interface EditedRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}
