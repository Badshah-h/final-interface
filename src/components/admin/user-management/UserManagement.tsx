import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Shield, Activity, UserPlus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

// This is a placeholder for the actual tab components that will be implemented later
const TabPlaceholder = ({ title }: { title: string }) => (
  <div className="border rounded-md p-8 text-center">
    <h2 className="text-xl font-semibold mb-2">{title} Tab</h2>
    <p className="text-muted-foreground mb-4">
      This tab will be implemented as a separate component.
    </p>
  </div>
);

const UserManagement = () => {
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);

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
          {/* Dialog content will be implemented as a separate component */}
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
          <TabPlaceholder title="Users" />
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <TabPlaceholder title="Roles & Permissions" />
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <TabPlaceholder title="Activity Log" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
