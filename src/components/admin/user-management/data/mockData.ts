// Mock data for development purposes
// This will be replaced with API calls in the future

export const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    lastActive: "2 minutes ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "moderator",
    status: "active",
    lastActive: "1 hour ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "user",
    status: "inactive",
    lastActive: "3 days ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "user",
    status: "active",
    lastActive: "Just now",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael@example.com",
    role: "moderator",
    status: "pending",
    lastActive: "Never",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
  },
];

// Available permissions grouped by category
export const availablePermissions = [
  {
    category: "User Management",
    permissions: [
      { id: "create_users", name: "Create Users" },
      { id: "edit_users", name: "Edit Users" },
      { id: "delete_users", name: "Delete Users" },
      { id: "assign_roles", name: "Assign Roles" },
    ],
  },
  {
    category: "AI Configuration",
    permissions: [
      { id: "manage_models", name: "Manage AI Models" },
      { id: "edit_prompts", name: "Edit Prompts" },
      { id: "test_ai", name: "Test AI Responses" },
      { id: "view_ai_logs", name: "View AI Logs" },
    ],
  },
  {
    category: "Widget Builder",
    permissions: [
      { id: "create_widgets", name: "Create Widgets" },
      { id: "edit_widgets", name: "Edit Widgets" },
      { id: "publish_widgets", name: "Publish Widgets" },
      { id: "delete_widgets", name: "Delete Widgets" },
    ],
  },
  {
    category: "Knowledge Base",
    permissions: [
      { id: "create_kb_articles", name: "Create Articles" },
      { id: "edit_kb_articles", name: "Edit Articles" },
      { id: "delete_kb_articles", name: "Delete Articles" },
      { id: "manage_kb_categories", name: "Manage Categories" },
    ],
  },
  {
    category: "System Settings",
    permissions: [
      { id: "manage_api_keys", name: "Manage API Keys" },
      { id: "billing_subscription", name: "Billing & Subscription" },
      { id: "system_backup", name: "System Backup" },
      { id: "view_audit_logs", name: "View Audit Logs" },
    ],
  },
];

// Role definitions
export const roles = [
  {
    id: "super-admin",
    name: "Super Admin",
    description: "Full access to all system features and settings",
    userCount: 3,
    permissions: availablePermissions.flatMap((category) =>
      category.permissions.map((perm) => perm.id),
    ),
  },
  {
    id: "business-admin",
    name: "Business Admin",
    description: "Manage business-specific settings and content",
    userCount: 5,
    permissions: [
      "create_users",
      "edit_users",
      "manage_models",
      "edit_prompts",
      "test_ai",
      "view_ai_logs",
      "create_widgets",
      "edit_widgets",
      "publish_widgets",
      "create_kb_articles",
      "edit_kb_articles",
      "delete_kb_articles",
      "manage_kb_categories",
      "view_audit_logs",
    ],
  },
  {
    id: "moderator",
    name: "Moderator",
    description: "Monitor conversations and manage content",
    userCount: 8,
    permissions: [
      "create_kb_articles",
      "edit_kb_articles",
      "manage_kb_categories",
      "test_ai",
      "view_ai_logs",
    ],
  },
];

export const activityLogs = [
  {
    user: "John Doe",
    action: "Created new user",
    target: "emily@example.com",
    timestamp: "2 minutes ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
  {
    user: "Admin User",
    action: "Updated permissions",
    target: "Moderator role",
    timestamp: "1 hour ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  },
  {
    user: "Jane Smith",
    action: "Deleted knowledge base article",
    target: "Getting Started Guide",
    timestamp: "3 hours ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  },
  {
    user: "System",
    action: "Automatic backup",
    target: "Database",
    timestamp: "12 hours ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=system",
  },
  {
    user: "Robert Johnson",
    action: "Changed password",
    target: "Own account",
    timestamp: "1 day ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
  },
];
