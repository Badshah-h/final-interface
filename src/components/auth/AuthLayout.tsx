import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  showImagePanel?: boolean;
  className?: string;
}

const AuthLayout = ({
  children,
  title,
  description,
  showImagePanel = true,
  className,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel with image - only shown on larger screens */}
      {showImagePanel && (
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary/90 to-primary/40">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.7),transparent)]" />
          <div className="absolute inset-0 flex flex-col justify-between p-12">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-white flex items-center justify-center text-primary font-bold">
                CS
              </div>
              <h1 className="font-bold text-lg text-white">ChatSystem</h1>
            </div>
            <div className="space-y-4">
              <div className="relative p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl transform hover:scale-[1.01] transition-all duration-300">
                <div className="text-white text-lg font-medium mb-2">
                  "Revolutionize your customer experience"
                </div>
                <div className="text-white/80 text-sm">
                  ChatSystem has transformed how we engage with our customers.
                  The AI responses are incredibly accurate and the setup was
                  effortless.
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/20 overflow-hidden">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=testimonial1"
                      alt="User"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-white font-medium">Sarah Johnson</div>
                    <div className="text-white/70 text-xs">
                      Product Manager, TechCorp
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-1">
                <div className="h-2 w-2 rounded-full bg-white/80"></div>
                <div className="h-2 w-2 rounded-full bg-white/40"></div>
                <div className="h-2 w-2 rounded-full bg-white/40"></div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute top-1/4 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        </div>
      )}

      {/* Right panel with form */}
      <div
        className={cn(
          "flex-1 flex flex-col",
          showImagePanel ? "lg:w-1/2" : "w-full",
          className,
        )}
      >
        <div className="flex items-center justify-between p-6">
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
              CS
            </div>
            <h1 className="font-bold text-lg">ChatSystem</h1>
          </Link>
          <div className="ml-auto">
            <ThemeSwitcher />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center p-6">
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            {children}
          </div>
        </div>

        <div className="p-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ChatSystem. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
