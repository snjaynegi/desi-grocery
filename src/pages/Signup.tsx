
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.name) {
      newErrors.name = t("Name is required");
      isValid = false;
    }

    if (!formData.username) {
      newErrors.username = t("Username is required");
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = t("Username must be at least 3 characters");
      isValid = false;
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t("Please confirm your password");
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("Passwords do not match");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Check if username is already taken
      const { data: existingUsers, error: fetchError } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', formData.username)
        .maybeSingle();
        
      if (fetchError) {
        throw fetchError;
      }
      
      if (existingUsers) {
        setErrors(prev => ({ ...prev, username: t("Username already exists") }));
        toast({
          title: t("Registration Failed"),
          description: t("Username already exists"),
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Register user with Supabase
      const { error, data } = await signUp(
        formData.email, 
        formData.password, 
        {
          name: formData.name,
          username: formData.username
        }
      );
      
      if (error) {
        if (error.message?.toLowerCase().includes('email')) {
          setErrors(prev => ({ ...prev, email: t(error.message) }));
        } else {
          toast({
            title: t("Registration Failed"),
            description: error.message,
            variant: "destructive",
          });
        }
        setIsLoading(false);
        return;
      }
      
      // Reset form data
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      toast({
        title: t("Account created successfully"),
        description: t("Welcome to Desi Grocery!"),
      });
      
      // If email confirmation is enabled in Supabase, show appropriate message
      if (!data) {
        toast({
          title: t("Verification email sent"),
          description: t("Please check your email to confirm your account"),
        });
      }
      
      navigate("/login");
    } catch (err: any) {
      console.error("Registration error:", err);
      toast({
        title: t("Registration Failed"),
        description: err.message || t("An unexpected error occurred"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {t("Create your account")}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {t("Already have an account?")}{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:text-primary/90"
              >
                {t("Sign in")}
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit} autoComplete="off">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">
                  {t("Name")}
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1"
                  placeholder={t("Full name")}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="username">
                  {t("Username")}
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="mt-1"
                  placeholder={t("Username")}
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  autoComplete="username"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="email">
                  {t("Email")}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1"
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
                <Label htmlFor="password">
                  {t("Password")}
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1"
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
              
              <div>
                <Label htmlFor="confirmPassword">
                  {t("Confirm Password")}
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="mt-1"
                  placeholder={t("Confirm password")}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("Signing up...")}
                  </>
                ) : (
                  t("Sign up")
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
