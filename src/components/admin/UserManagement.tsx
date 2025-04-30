import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Users,
  UserPlus,
  Shield,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Key,
  Lock,
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  Plus,
  Save,
  AlertCircle,
  X,
  Check,
  User,
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  Settings,
  FileText,
} from "lucide-react";

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showEditUserDialog, setShowEditUserDialog] = useState(false);
  const [showCreateRoleDialog, setShowCreateRoleDialog] = useState(false);
  const [showEditRoleDialog, setShowEditRoleDialog] = useState(false);
  const [showDeleteRoleDialog, setShowDeleteRoleDialog] = useState(false);
  const [showDeleteUserDialog, setShowDeleteUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoleToEdit, setSelectedRoleToEdit] = useState(null);
  const [selectedRoleToDelete, setSelectedRoleToDelete] = useState(null);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "user",
  });

  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [],
  });

  const [editedUser, setEditedUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    status: "",
  });

  const [editedRole, setEditedRole] = useState({
    id: "",
    name: "",
    description: "",
    permissions: [],
  });

  const users = [
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
  const availablePermissions = [
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
  const roles = [
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

  const handleAddUser = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      // In a real implementation, this would add the user to the database
      setShowAddUserDialog(false);
      setIsSubmitting(false);
      // Reset form
      setNewUser({ name: "", email: "", role: "user" });
    }, 1000);
  };

  const handleEditUser = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      // In a real implementation, this would update the user in the database
      setShowEditUserDialog(false);
      setIsSubmitting(false);
      setSelectedUser(null);
    }, 1000);
  };

  const handleCreateRole = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      // In a real implementation, this would create a new role in the database
      setShowCreateRoleDialog(false);
      setIsSubmitting(false);
      // Reset form
      setNewRole({ name: "", description: "", permissions: [] });
    }, 1000);
  };

  const handleEditRole = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      // In a real implementation, this would update the role in the database
      setShowEditRoleDialog(false);
      setIsSubmitting(false);
      setSelectedRoleToEdit(null);
    }, 1000);
  };

  const handleDeleteRole = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      // In a real implementation, this would delete the role from the database
      setShowDeleteRoleDialog(false);
      setIsSubmitting(false);
      setSelectedRoleToDelete(null);
    }, 1000);
  };

  const handleDeleteUser = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      // In a real implementation, this would delete the user from the database
      setShowDeleteUserDialog(false);
      setIsSubmitting(false);
      setSelectedUserToDelete(null);
    }, 1000);
  };

  const openEditUserDialog = (user) => {
    setEditedUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setSelectedUser(user);
    setShowEditUserDialog(true);
  };

  const openEditRoleDialog = (role) => {
    setEditedRole({
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: [...role.permissions],
    });
    setSelectedRoleToEdit(role);
    setShowEditRoleDialog(true);
  };

  const openDeleteRoleDialog = (role) => {
    setSelectedRoleToDelete(role);
    setShowDeleteRoleDialog(true);
  };

  const openDeleteUserDialog = (user) => {
    setSelectedUserToDelete(user);
    setShowDeleteUserDialog(true);
  };

  const handlePermissionChange = (
    permissionId,
    isChecked,
    setStateFunction,
    currentState,
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
          (id) => id !== permissionId,
        ),
      });
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      (searchQuery === "" ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedRole === "all" || user.role === selectedRole) &&
      (selectedStatus === "all" || user.status === selectedStatus),
  );

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "default";
      case "moderator":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "inactive":
        return <XCircle className="h-4 w-4 text-gray-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage users, roles, and permissions
          </p>
        </div>
        <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account and assign roles.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) =>
                    setNewUser({ ...newUser, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="send-email" />
                <Label htmlFor="send-email">
                  Send welcome email with password setup link
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowAddUserDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" /> Users
          </TabsTrigger>
          <TabsTrigger value="roles">
            <Shield className="mr-2 h-4 w-4" /> Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Activity className="mr-2 h-4 w-4" /> Activity Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <Users className="h-12 w-12 mb-2 opacity-20" />
                          <p>No users found</p>
                          <p className="text-sm">
                            Try adjusting your filters or search term
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <img src={user.avatar} alt={user.name} />
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getRoleBadgeVariant(user.role)}>
                            {user.role.charAt(0).toUpperCase() +
                              user.role.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(user.status)}
                            <span
                              className={
                                user.status === "active"
                                  ? "text-green-600"
                                  : user.status === "pending"
                                    ? "text-yellow-600"
                                    : "text-muted-foreground"
                              }
                            >
                              {user.status.charAt(0).toUpperCase() +
                                user.status.slice(1)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => openEditUserDialog(user)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => openEditUserDialog(user)}
                              >
                                <Key className="mr-2 h-4 w-4" />
                                Change Role
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => openDeleteUserDialog(user)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Showing {filteredUsers.length} of {users.length} users
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
              <CardDescription>
                Manage roles and their associated permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle>Super Admin</CardTitle>
                        <Badge>3 Users</Badge>
                      </div>
                      <CardDescription>
                        Full access to all system features and settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>User Management</Label>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>AI Configuration</Label>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Widget Builder</Label>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Knowledge Base</Label>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>System Settings</Label>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => openEditRoleDialog(roles[0])}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Role
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-none"
                        onClick={() => openDeleteRoleDialog(roles[0])}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle>Business Admin</CardTitle>
                        <Badge>5 Users</Badge>
                      </div>
                      <CardDescription>
                        Manage business-specific settings and content
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>User Management</Label>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>AI Configuration</Label>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Widget Builder</Label>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Knowledge Base</Label>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>System Settings</Label>
                          <XCircle className="h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => openEditRoleDialog(roles[1])}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Role
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-none"
                        onClick={() => openDeleteRoleDialog(roles[1])}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle>Moderator</CardTitle>
                        <Badge>8 Users</Badge>
                      </div>
                      <CardDescription>
                        Monitor conversations and manage content
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>User Management</Label>
                          <XCircle className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>AI Configuration</Label>
                          <XCircle className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Widget Builder</Label>
                          <XCircle className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Knowledge Base</Label>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>System Settings</Label>
                          <XCircle className="h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => openEditRoleDialog(roles[2])}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Role
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-none"
                        onClick={() => openDeleteRoleDialog(roles[2])}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="flex justify-center">
                  <Button onClick={() => setShowCreateRoleDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Role
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permission Management</CardTitle>
              <CardDescription>
                Configure detailed permissions for each role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="super-admin">
                <TabsList className="mb-4">
                  <TabsTrigger value="super-admin">Super Admin</TabsTrigger>
                  <TabsTrigger value="business-admin">
                    Business Admin
                  </TabsTrigger>
                  <TabsTrigger value="moderator">Moderator</TabsTrigger>
                </TabsList>

                <TabsContent value="super-admin" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        User Management
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="perm-create-user">Create Users</Label>
                          <Switch id="perm-create-user" checked />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="perm-edit-user">Edit Users</Label>
                          <Switch id="perm-edit-user" checked />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="perm-delete-user">Delete Users</Label>
                          <Switch id="perm-delete-user" checked />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="perm-assign-roles">
                            Assign Roles
                          </Label>
                          <Switch id="perm-assign-roles" checked />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        AI Configuration
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="perm-manage-models">
                            Manage AI Models
                          </Label>
                          <Switch id="perm-manage-models" checked />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="perm-edit-prompts">
                            Edit Prompts
                          </Label>
                          <Switch id="perm-edit-prompts" checked />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="perm-test-ai">
                            Test AI Responses
                          </Label>
                          <Switch id="perm-test-ai" checked />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="perm-view-logs">View AI Logs</Label>
                          <Switch id="perm-view-logs" checked />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        System Settings
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="perm-manage-api">
                            Manage API Keys
                          </Label>
                          <Switch id="perm-manage-api" checked />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="perm-billing">
                            Billing & Subscription
                          </Label>
                          <Switch id="perm-billing" checked />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="perm-system-backup">
                            System Backup
                          </Label>
                          <Switch id="perm-system-backup" checked />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="perm-audit-logs">
                            View Audit Logs
                          </Label>
                          <Switch id="perm-audit-logs" checked />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="business-admin" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        User Management
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="ba-perm-create-user">
                            Create Users
                          </Label>
                          <Switch id="ba-perm-create-user" checked />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="ba-perm-edit-user">Edit Users</Label>
                          <Switch id="ba-perm-edit-user" checked />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="ba-perm-delete-user">
                            Delete Users
                          </Label>
                          <Switch id="ba-perm-delete-user" />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="ba-perm-assign-roles">
                            Assign Roles
                          </Label>
                          <Switch id="ba-perm-assign-roles" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        AI Configuration
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="ba-perm-manage-models">
                            Manage AI Models
                          </Label>
                          <Switch id="ba-perm-manage-models" checked />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="ba-perm-edit-prompts">
                            Edit Prompts
                          </Label>
                          <Switch id="ba-perm-edit-prompts" checked />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="ba-perm-test-ai">
                            Test AI Responses
                          </Label>
                          <Switch id="ba-perm-test-ai" checked />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="ba-perm-view-logs">
                            View AI Logs
                          </Label>
                          <Switch id="ba-perm-view-logs" checked />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        System Settings
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="ba-perm-manage-api">
                            Manage API Keys
                          </Label>
                          <Switch id="ba-perm-manage-api" />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="ba-perm-billing">
                            Billing & Subscription
                          </Label>
                          <Switch id="ba-perm-billing" />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="ba-perm-system-backup">
                            System Backup
                          </Label>
                          <Switch id="ba-perm-system-backup" />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="ba-perm-audit-logs">
                            View Audit Logs
                          </Label>
                          <Switch id="ba-perm-audit-logs" checked />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="moderator" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Content Management
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="mod-perm-view-chats">
                            View Conversations
                          </Label>
                          <Switch id="mod-perm-view-chats" checked />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="mod-perm-moderate">
                            Moderate Content
                          </Label>
                          <Switch id="mod-perm-moderate" checked />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="mod-perm-kb">
                            Edit Knowledge Base
                          </Label>
                          <Switch id="mod-perm-kb" checked />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="mod-perm-reports">
                            Generate Reports
                          </Label>
                          <Switch id="mod-perm-reports" checked />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        User Interaction
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="mod-perm-message">
                            Message Users
                          </Label>
                          <Switch id="mod-perm-message" checked />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="mod-perm-ban">
                            Ban/Suspend Users
                          </Label>
                          <Switch id="mod-perm-ban" />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="mod-perm-feedback">
                            Review Feedback
                          </Label>
                          <Switch id="mod-perm-feedback" checked />
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label htmlFor="mod-perm-analytics">
                            View Analytics
                          </Label>
                          <Switch id="mod-perm-analytics" checked />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-end gap-2">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Activity Log</CardTitle>
                  <CardDescription>
                    Track user actions and system events
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    user: "John Doe",
                    action: "Created new user",
                    target: "emily@example.com",
                    timestamp: "2 minutes ago",
                    avatar:
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
                  },
                  {
                    user: "Admin User",
                    action: "Updated permissions",
                    target: "Moderator role",
                    timestamp: "1 hour ago",
                    avatar:
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
                  },
                  {
                    user: "Jane Smith",
                    action: "Deleted knowledge base article",
                    target: "Getting Started Guide",
                    timestamp: "3 hours ago",
                    avatar:
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
                  },
                  {
                    user: "System",
                    action: "Automatic backup",
                    target: "Database",
                    timestamp: "12 hours ago",
                    avatar:
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=system",
                  },
                  {
                    user: "Robert Johnson",
                    action: "Changed password",
                    target: "Own account",
                    timestamp: "1 day ago",
                    avatar:
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0"
                  >
                    <Avatar className="h-9 w-9">
                      <img src={activity.avatar} alt={activity.user} />
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{activity.user}</p>
                        <span className="text-xs text-muted-foreground">
                          {activity.timestamp}
                        </span>
                      </div>
                      <p className="text-sm">
                        {activity.action}{" "}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline" size="sm">
                View All Activity
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit User Dialog */}
      <Dialog open={showEditUserDialog} onOpenChange={setShowEditUserDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and role assignment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                placeholder="John Doe"
                value={editedUser.name}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                placeholder="john@example.com"
                value={editedUser.email}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select
                value={editedUser.role}
                onValueChange={(value) =>
                  setEditedUser({ ...editedUser, role: value })
                }
              >
                <SelectTrigger id="edit-role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={editedUser.status}
                onValueChange={(value) =>
                  setEditedUser({ ...editedUser, status: value })
                }
              >
                <SelectTrigger id="edit-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEditUserDialog(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button onClick={handleEditUser} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>Save Changes</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Role Dialog */}
      <Dialog
        open={showCreateRoleDialog}
        onOpenChange={setShowCreateRoleDialog}
      >
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogDescription>
              Define a new role and assign permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <div className="space-y-4 py-4 overflow-hidden flex flex-col h-full">
              <div className="space-y-2">
                <Label htmlFor="role-name">Role Name</Label>
                <Input
                  id="role-name"
                  placeholder="e.g., Content Manager"
                  value={newRole.name}
                  onChange={(e) =>
                    setNewRole({ ...newRole, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-description">Description</Label>
                <Textarea
                  id="role-description"
                  placeholder="Describe the purpose and responsibilities of this role"
                  value={newRole.description}
                  onChange={(e) =>
                    setNewRole({ ...newRole, description: e.target.value })
                  }
                  className="resize-none"
                />
              </div>
              <div className="space-y-2 flex-1 overflow-hidden">
                <Label>Permissions</Label>
                <div className="border rounded-md overflow-hidden flex-1">
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="p-4 space-y-6">
                      {availablePermissions.map((category) => (
                        <div key={category.category} className="space-y-2">
                          <h4 className="font-medium text-sm">
                            {category.category}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {category.permissions.map((permission) => (
                              <div
                                key={permission.id}
                                className="flex items-center space-x-2 border p-2 rounded-md"
                              >
                                <Checkbox
                                  id={`perm-${permission.id}`}
                                  checked={newRole.permissions.includes(
                                    permission.id,
                                  )}
                                  onCheckedChange={(checked) =>
                                    handlePermissionChange(
                                      permission.id,
                                      checked,
                                      setNewRole,
                                      newRole,
                                    )
                                  }
                                />
                                <Label
                                  htmlFor={`perm-${permission.id}`}
                                  className="flex-1 cursor-pointer"
                                >
                                  {permission.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateRoleDialog(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateRole}
              disabled={isSubmitting || !newRole.name.trim()}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                  Creating...
                </>
              ) : (
                <>Create Role</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={showEditRoleDialog} onOpenChange={setShowEditRoleDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Modify role details and permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <div className="space-y-4 py-4 overflow-hidden flex flex-col h-full">
              <div className="space-y-2">
                <Label htmlFor="edit-role-name">Role Name</Label>
                <Input
                  id="edit-role-name"
                  placeholder="e.g., Content Manager"
                  value={editedRole.name}
                  onChange={(e) =>
                    setEditedRole({ ...editedRole, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role-description">Description</Label>
                <Textarea
                  id="edit-role-description"
                  placeholder="Describe the purpose and responsibilities of this role"
                  value={editedRole.description}
                  onChange={(e) =>
                    setEditedRole({
                      ...editedRole,
                      description: e.target.value,
                    })
                  }
                  className="resize-none"
                />
              </div>
              <div className="space-y-2 flex-1 overflow-hidden">
                <Label>Permissions</Label>
                <div className="border rounded-md overflow-hidden flex-1">
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="p-4 space-y-6">
                      {availablePermissions.map((category) => (
                        <div key={category.category} className="space-y-2">
                          <h4 className="font-medium text-sm">
                            {category.category}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {category.permissions.map((permission) => (
                              <div
                                key={permission.id}
                                className="flex items-center space-x-2 border p-2 rounded-md"
                              >
                                <Checkbox
                                  id={`edit-perm-${permission.id}`}
                                  checked={editedRole.permissions.includes(
                                    permission.id,
                                  )}
                                  onCheckedChange={(checked) =>
                                    handlePermissionChange(
                                      permission.id,
                                      checked,
                                      setEditedRole,
                                      editedRole,
                                    )
                                  }
                                />
                                <Label
                                  htmlFor={`edit-perm-${permission.id}`}
                                  className="flex-1 cursor-pointer"
                                >
                                  {permission.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEditRoleDialog(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditRole}
              disabled={isSubmitting || !editedRole.name.trim()}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>Save Changes</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Role Confirmation */}
      <AlertDialog
        open={showDeleteRoleDialog}
        onOpenChange={setShowDeleteRoleDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the role "
              {selectedRoleToDelete?.name}"? This action cannot be undone.
              {selectedRoleToDelete?.userCount > 0 && (
                <div className="mt-2 flex items-center text-destructive">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span>
                    This role is currently assigned to{" "}
                    {selectedRoleToDelete?.userCount} users. They will need to
                    be reassigned.
                  </span>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRole}
              disabled={isSubmitting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-current animate-spin"></div>
                  Deleting...
                </>
              ) : (
                <>Delete</>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete User Confirmation */}
      <AlertDialog
        open={showDeleteUserDialog}
        onOpenChange={setShowDeleteUserDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the user "
              {selectedUserToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              disabled={isSubmitting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-current animate-spin"></div>
                  Deleting...
                </>
              ) : (
                <>Delete</>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;
