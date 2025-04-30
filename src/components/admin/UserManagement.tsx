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
} from "lucide-react";

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "user",
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

  const handleAddUser = () => {
    // In a real implementation, this would add the user to the database
    setShowAddUserDialog(false);
    // Reset form
    setNewUser({ name: "", email: "", role: "user" });
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
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Key className="mr-2 h-4 w-4" />
                                Change Role
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
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
                    <CardFooter className="border-t pt-4">
                      <Button variant="outline" className="w-full">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Role
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
                    <CardFooter className="border-t pt-4">
                      <Button variant="outline" className="w-full">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Role
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
                    <CardFooter className="border-t pt-4">
                      <Button variant="outline" className="w-full">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Role
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="flex justify-center">
                  <Button>
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
    </div>
  );
};

export default UserManagement;
