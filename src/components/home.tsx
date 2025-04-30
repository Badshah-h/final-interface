import { useState } from "react";
import { Link } from "react-router-dom";
import ChatWidget from "./chat/ChatWidget";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import AIConfiguration from "./admin/AIConfiguration";
import WidgetBuilder from "./admin/WidgetBuilder";
import KnowledgeBase from "./admin/KnowledgeBase";
import UserManagement from "./admin/UserManagement";
import ThemeBuilder from "./admin/ThemeBuilder";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, Home as HomeIcon, Code, BarChart3, Webhook, Settings } from "lucide-react";

function Home() {
  const [activeView, setActiveView] = useState("dashboard");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleViewChange = (view: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveView(view);
      setIsTransitioning(false);
    }, 300); // Match the duration-300 in the transition class
  };

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "conversations":
        return <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Conversations</h1>
              <p className="text-muted-foreground">
                View and manage all chat conversations
              </p>
            </div>
          </div>
          <div className="border rounded-md p-8 text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Conversations Module</h2>
            <p className="text-muted-foreground mb-4">
              This module is under development. It will allow you to view and manage all chat conversations.
            </p>
          </div>
        </div>;
      case "ai-config":
        return <AIConfiguration />;
      case "widget-builder":
        return <WidgetBuilder />;
      case "knowledge-base":
        return <KnowledgeBase />;
      case "user-management":
        return <UserManagement />;
      case "analytics":
        return <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Analytics</h1>
              <p className="text-muted-foreground">
                Monitor and analyze conversation metrics
              </p>
            </div>
          </div>
          <div className="border rounded-md p-8 text-center">
            <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Analytics Module</h2>
            <p className="text-muted-foreground mb-4">
              This module is under development. It will provide detailed analytics and reporting.
            </p>
          </div>
        </div>;
      case "embedding":
        return <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Embedding</h1>
              <p className="text-muted-foreground">
                Manage embedding models and configurations
              </p>
            </div>
          </div>
          <div className="border rounded-md p-8 text-center">
            <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Embedding Module</h2>
            <p className="text-muted-foreground mb-4">
              This module is under development. It will allow you to manage embedding models and configurations.
            </p>
          </div>
        </div>;
      case "integrations":
        return <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Integrations</h1>
              <p className="text-muted-foreground">
                Connect with external services and APIs
              </p>
            </div>
          </div>
          <div className="border rounded-md p-8 text-center">
            <Webhook className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Integrations Module</h2>
            <p className="text-muted-foreground mb-4">
              This module is under development. It will allow you to connect with external services and APIs.
            </p>
          </div>
        </div>;
      case "settings":
        return <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">
                Configure system settings and preferences
              </p>
            </div>
          </div>
          <div className="border rounded-md p-8 text-center">
            <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Settings Module</h2>
            <p className="text-muted-foreground mb-4">
              This module is under development. It will allow you to configure system settings and preferences.
            </p>
          </div>
        </div>;
      case "theme-builder":
        return <ThemeBuilder />;
      default:
        return <Dashboard />;
    }
  };

  const getActivePageName = () => {
    switch (activeView) {
      case "dashboard":
        return "Dashboard";
      case "conversations":
        return "Conversations";
      case "ai-config":
        return "AI Configuration";
      case "widget-builder":
        return "Widget Builder";
      case "knowledge-base":
        return "Knowledge Base";
      case "user-management":
        return "User Management";
      case "analytics":
        return "Analytics";
      case "embedding":
        return "Embedding";
      case "integrations":
        return "Integrations";
      case "settings":
        return "Settings";
      case "theme-builder":
        return "Theme Builder";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminLayout
        activePage={getActivePageName()}
        onNavigate={(page) => {
          // Map the sidebar navigation items to our view states
          const viewMap: Record<string, string> = {
            Dashboard: "dashboard",
            Conversations: "conversations",
            "AI Configuration": "ai-config",
            "Widget Builder": "widget-builder",
            "Knowledge Base": "knowledge-base",
            "User Management": "user-management",
            Analytics: "analytics",
            Embedding: "embedding",
            Integrations: "integrations",
            Settings: "settings",
            "Theme Builder": "theme-builder",
          };
          if (viewMap[page]) {
            handleViewChange(viewMap[page]);
          }
        }}
      >
        <div
          className={`transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
        >
          {renderContent()}
        </div>
      </AdminLayout>

      {/* Preview Button - Fixed position */}
      <div className="fixed bottom-6 right-6 z-40 flex gap-2">
        <Link to="/">
          <Button
            size="lg"
            variant="outline"
            className="shadow-lg flex items-center gap-2"
          >
            <HomeIcon className="h-5 w-5" />
            Back to Home
          </Button>
        </Link>
        <Button
          size="lg"
          className="shadow-lg flex items-center gap-2 animate-pulse-subtle"
          onClick={() => window.open("/widget-preview", "_blank")}
        >
          <MessageSquare className="h-5 w-5" />
          Preview Widget
        </Button>
      </div>
    </div>
  );
}

export default Home;
