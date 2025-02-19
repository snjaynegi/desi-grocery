
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Get registered users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u: any) =>
          u.email === formData.email && u.password === formData.password
      );

      if (user) {
        // Store login status
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(user));

        toast({
          title: t("Login Successful"),
          description: t("Welcome back!"),
        });
        navigate("/");
      } else {
        toast({
          title: t("Login Failed"),
          description: t("Invalid email or password"),
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {t("Sign in to your account")}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {t("Or")}{" "}
              <Link
                to="/signup"
                className="font-medium text-primary hover:text-primary/90"
              >
                {t("create a new account")}
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder={t("Email address")}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder={t("Password")}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {t("Sign in")}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
