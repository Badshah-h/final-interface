import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import AuthLayout from "./AuthLayout";
import { ArrowRight, Check, Github, Mail, User } from "lucide-react";
import { authService } from "@/services/auth/authService";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Calculate password strength when password field changes
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password: string) => {
    // Simple password strength calculation
    let strength = 0;
    if (password.length > 6) strength += 25;
    if (password.length > 10) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return "Weak";
    if (passwordStrength <= 50) return "Fair";
    if (passwordStrength <= 75) return "Good";
    return "Strong";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500";
    if (passwordStrength <= 50) return "bg-yellow-500";
    if (passwordStrength <= 75) return "bg-blue-500";
    return "bg-green-500";
  };

  const handleNextStep = () => {
    setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Registration failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your information to get started"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                {step > 1 ? <Check className="h-4 w-4" /> : "1"}
              </div>
              <span className="text-sm font-medium">Account</span>
            </div>
            <Separator className="flex-1 mx-4" />
            <div className="flex items-center gap-2">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                2
              </div>
              <span className="text-sm font-medium">Security</span>
            </div>
          </div>
        </div>

        {step === 1 ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNextStep();
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>
            <Button type="submit" className="w-full h-12 text-base font-medium">
              <div className="flex items-center gap-2">
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="h-12"
              />
              {formData.password && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Password strength:</span>
                    <span
                      className={
                        passwordStrength > 75
                          ? "text-green-500"
                          : passwordStrength > 50
                            ? "text-blue-500"
                            : passwordStrength > 25
                              ? "text-yellow-500"
                              : "text-red-500"
                      }
                    >
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <Progress
                    value={passwordStrength}
                    className={getPasswordStrengthColor()}
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="h-12"
              />
              {formData.password &&
                formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-500">Passwords do not match</p>
                )}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, agreeToTerms: !!checked })
                }
                required
              />
              <Label
                htmlFor="agreeToTerms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  terms of service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  privacy policy
                </Link>
              </Label>
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 text-base font-medium"
                disabled={
                  isLoading ||
                  !formData.agreeToTerms ||
                  formData.password !== formData.confirmPassword
                }
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Create account</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </div>
          </form>
        )}

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
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
