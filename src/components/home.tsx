import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ChatWidget from "./chat/ChatWidget";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import AIConfiguration from "./admin/AIConfiguration";
import WidgetBuilder from "./admin/WidgetBuilder";
import KnowledgeBase from "./admin/KnowledgeBase";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, MessageSquare, Settings } from "lucide-react";

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
      case "ai-config":
        return <AIConfiguration />;
      case "widget-builder":
        return <WidgetBuilder />;
      case "knowledge-base":
        return <KnowledgeBase />;
      default:
        return <Dashboard />;
    }
  };

  const getActivePageName = () => {
    switch (activeView) {
      case "dashboard":
        return "Dashboard";
      case "ai-config":
        return "AI Configuration";
      case "widget-builder":
        return "Widget Builder";
      case "knowledge-base":
        return "Knowledge Base";
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
            "AI Configuration": "ai-config",
            "Widget Builder": "widget-builder",
            "Knowledge Base": "knowledge-base",
            "User Management": "user-management",
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
      <div className="fixed bottom-6 right-6 z-40">
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
