
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
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
    
    // Check if email contains only special characters
    if (/^[^a-zA-Z0-9]+$/.test(email)) {
      setResetEmailError(t("Email cannot contain only special characters"));
      return false;
    }
    
    // Check for proper email format with comprehensive validation
    // Must have @ with text before and after, and a domain with at least one dot
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setResetEmailError(t("Invalid email format"));
      return false;
    }
    
    setResetEmailError("");
    return true;
  };

  const handleForgotPassword = () => {
    if (!validateResetEmail(resetEmail)) {
      return;
    }
    
    setResetInProgress(true);
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some((u: any) => u.email === resetEmail);
    
    if (userExists) {
      // Update the user's password to "password"
      const updatedUsers = users.map((u: any) => {
        if (u.email === resetEmail) {
          return { ...u, password: "password" };
        }
        return u;
      });
      
      // Update localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      
      toast({
        title: t("Password Reset Successful"),
        description: t("Your password has been reset to 'password'"),
      });
      
      // Close dialog and reset state
      setForgotPasswordOpen(false);
      setResetEmail("");
    } else {
      // If the email doesn't exist in our system
      setResetEmailError(t("No account found with this email"));
    }
    
    setResetInProgress(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Check for demo user
      if (formData.email === "demo" && formData.password === "demo123") {
        // Create demo user if it doesn't exist
        const demoUser = {
          id: "demo-user",
          name: "Demo User",
          email: "demo",
          status: "active",
          registrationDate: new Date().toISOString().split('T')[0],
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=Demo User`
        };
        
        // Store login status and user information
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
        navigate("/");
        return;
      }
      
      // Get registered users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u: any) =>
          u.email === formData.email && u.password === formData.password
      );

      if (user) {
        // Store login status and user information
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Reset form data
        setFormData({
          email: "",
          password: "",
        });
        
        toast({
          title: t("Login Successful"),
          description: t("Welcome back!"),
        });
        navigate("/");
      } else {
        // Reset password field on failed login
        setFormData(prev => ({
          ...prev,
          password: "",
        }));
        
        toast({
          title: t("Login Failed"),
          description: t("Invalid email or password"),
          variant: "destructive",
        });
      }
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
                <label htmlFor="email" className="sr-only">
                  {t("Email")}
                </label>
                <input
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
                  autoComplete="off"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  {t("Password")}
                </label>
                <input
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
                  autoComplete="new-password"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:bg-green-700 dark:hover:bg-green-600 dark:focus:ring-green-500"
              >
                {t("Sign in")}
              </button>
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
              <label htmlFor="reset-email" className="text-sm font-medium">
                {t("Email")}
              </label>
              <input
                id="reset-email"
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                onBlur={() => validateResetEmail(resetEmail)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
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
              {resetInProgress ? t("Resetting...") : t("Reset Password")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Login;
