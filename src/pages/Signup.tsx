
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Get existing users
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Check if email or username already exists
      if (users.some((user: any) => user.email === formData.email)) {
        toast({
          title: t("Registration Failed"),
          description: t("Email already exists"),
          variant: "destructive",
        });
        return;
      }

      if (users.some((user: any) => user.username === formData.username)) {
        toast({
          title: t("Registration Failed"),
          description: t("Username already exists"),
          variant: "destructive",
        });
        return;
      }

      // Add new user
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      
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
      navigate("/login");
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
                  autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="off"
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
              >
                {t("Sign up")}
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
