
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import { supabase } from "@/integrations/supabase/client"; // Added missing import
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  
  // Get the redirect URL from the location state
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/";
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailError, setResetEmailError] = useState("");
  const [resetInProgress, setResetInProgress] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email) {
      newErrors.email = t("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("Invalid email format");
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = t("Password is required");
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = t("Password must be at least 6 characters");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateResetEmail = (email: string) => {
    // Check if email is empty
    if (!email.trim()) {
      setResetEmailError(t("Email is required"));
      return false;
    }
    
    // Check for whitespaces within email
    if (/\s/.test(email)) {
      setResetEmailError(t("Email cannot contain whitespaces"));
      return false;
    }
    
    // Check for proper email format with comprehensive validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setResetEmailError(t("Invalid email format"));
      return false;
    }
    
    setResetEmailError("");
    return true;
  };

  const handleForgotPassword = async () => {
    if (!validateResetEmail(resetEmail)) {
      return;
    }
    
    setResetInProgress(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        setResetEmailError(error.message);
      } else {
        toast({
          title: t("Password Reset Email Sent"),
          description: t("Check your inbox for password reset instructions"),
        });
        setForgotPasswordOpen(false);
        setResetEmail("");
      }
    } catch (err) {
      console.error("Password reset error:", err);
      setResetEmailError(t("An error occurred while processing your request"));
    } finally {
      setResetInProgress(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Handle demo user login
      if (formData.email === "demo@example.com" && formData.password === "demo123") {
        // Demo login logic is preserved
        const demoUser = {
          id: "demo-user",
          name: "Demo User",
          email: "demo@example.com",
          status: "active",
          registrationDate: new Date().toISOString().split('T')[0],
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=Demo User`
        };
        
        // Store login status and user information for demo user
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(demoUser));

        // Reset form data
        setFormData({
          email: "",
          password: "",
        });
        
        toast({
          title: t("Login Successful"),
          description: t("Welcome to demo account!"),
        });
        navigate(from);
        return;
      }
    
      // Actual Supabase authentication
      const { error, data } = await signIn(formData.email, formData.password);
      
      if (error) {
        // Reset password field on failed login
        setFormData(prev => ({ ...prev, password: "" }));
        
        toast({
          title: t("Login Failed"),
          description: error.message || t("Invalid email or password"),
          variant: "destructive",
        });
        return;
      }
      
      // Success
      toast({
        title: t("Login Successful"),
        description: t("Welcome back!"),
      });
      
      // Navigate to the page the user was trying to access, or home
      navigate(from);
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: t("Login Failed"),
        description: t("An unexpected error occurred"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              {t("Sign in to your account")}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              {t("Or")}{" "}
              <Link
                to="/signup"
                className="font-medium text-primary hover:text-primary/90 dark:text-green-400 dark:hover:text-green-300"
              >
                {t("create a new account")}
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit} autoComplete="off">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="email" className="sr-only">
                  {t("Email")}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder={t("Email address")}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  {t("Password")}
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder={t("Password")}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  autoComplete="current-password"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:bg-green-700 dark:hover:bg-green-600 dark:focus:ring-green-500"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("Signing in...")}
                  </>
                ) : (
                  t("Sign in")
                )}
              </Button>
            </div>
            
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setForgotPasswordOpen(true)}
                className="text-sm text-primary hover:text-primary/80 dark:text-green-400 dark:hover:text-green-300"
              >
                {t("Forgot your password?")}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Forgot Password Dialog */}
      <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("Reset Password")}</DialogTitle>
            <DialogDescription>
              {t("Enter your email address to reset your password")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email" className="text-sm font-medium">
                {t("Email")}
              </Label>
              <Input
                id="reset-email"
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                onBlur={() => validateResetEmail(resetEmail)}
                className="w-full"
                placeholder={t("Email address")}
              />
              {resetEmailError && (
                <p className="text-red-500 text-xs mt-1">{resetEmailError}</p>
              )}
            </div>
          </div>
          
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button
              type="button" 
              variant="outline"
              onClick={() => {
                setForgotPasswordOpen(false);
                setResetEmail("");
                setResetEmailError("");
              }}
            >
              {t("Cancel")}
            </Button>
            <Button
              type="button"
              onClick={handleForgotPassword}
              disabled={resetInProgress || !resetEmail}
            >
              {resetInProgress ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("Resetting...")}
                </>
              ) : (
                t("Reset Password")
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Login;
