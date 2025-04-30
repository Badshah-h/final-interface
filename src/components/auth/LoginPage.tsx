import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import AuthLayout from "./AuthLayout";
import { ArrowRight, Github, Mail } from "lucide-react";
import { authService } from "@/services/auth/authService";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.login({
        email,
        password,
        remember: rememberMe,
      });
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Enter your credentials to access your account"
    >
      <div className="space-y-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(!!checked)}
            />
            <Label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </Label>
          </div>
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Sign in</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-12">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button variant="outline" className="h-12">
            <Mail className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>

        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
