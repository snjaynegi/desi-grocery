
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface UserFormData {
  email: string;
  password: string;
  name: string;
  username: string;
}

interface UserCreationFormProps {
  onUserCreated?: () => void;
}

const UserCreationForm: React.FC<UserCreationFormProps> = ({ onUserCreated }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    password: "",
    name: "",
    username: "",
  });
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<UserFormData> = {};
    let isValid = true;

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

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear the error for this field when user starts typing
    if (errors[name as keyof UserFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Create user with admin API
      const { data, error } = await supabase.auth.admin.createUser({
        email: formData.email,
        password: formData.password,
        user_metadata: {
          name: formData.name,
          username: formData.username,
          status: status
        },
        email_confirm: true
      });
      
      if (error) {
        throw error;
      }
      
      if (data.user) {
        toast({
          title: t("User created successfully"),
          description: t("The new user has been added to the system"),
          duration: 3000
        });
        
        // Clear form
        setFormData({
          email: "",
          password: "",
          name: "",
          username: "",
        });
        setStatus("active");
        
        // Call the callback if provided
        if (onUserCreated) {
          onUserCreated();
        }
      }
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast({
        title: t("Failed to create user"),
        description: error.message || t("An unexpected error occurred"),
        variant: "destructive",
        duration: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">{t("Full Name")}</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("Enter full name")}
            className={`bg-[#0c1221] border-[#232e47] text-white ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="username" className="text-white">{t("Username")}</Label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder={t("Enter username")}
            className={`bg-[#0c1221] border-[#232e47] text-white ${errors.username ? "border-red-500" : ""}`}
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">{t("Email")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("Enter email address")}
            className={`bg-[#0c1221] border-[#232e47] text-white ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">{t("Password")}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={t("Enter password")}
            className={`bg-[#0c1221] border-[#232e47] text-white ${errors.password ? "border-red-500" : ""}`}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status" className="text-white">{t("Status")}</Label>
          <Select
            value={status}
            onValueChange={(value: "active" | "inactive") => setStatus(value)}
          >
            <SelectTrigger id="status" className="bg-[#0c1221] border-[#232e47] text-white w-full">
              <SelectValue placeholder={t("Select status")} />
            </SelectTrigger>
            <SelectContent className="bg-[#0c1221] border-[#232e47] text-white">
              <SelectItem value="active">{t("Active")}</SelectItem>
              <SelectItem value="inactive">{t("Inactive")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/80 text-white mt-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("Creating...")}
            </>
          ) : (
            t("Create User")
          )}
        </Button>
      </form>
    </div>
  );
};

export default UserCreationForm;
