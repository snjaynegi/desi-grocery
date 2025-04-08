
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Security = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    newEmail: "",
    newUsername: "",
  });
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    newEmail: "",
    newUsername: "",
  });

  useEffect(() => {
    // Get current user data
    try {
      const userData = JSON.parse(localStorage.getItem("currentUser") || "{}");
      setCurrentUser(userData);
      if (userData && userData.email) {
        setFormData(prev => ({
          ...prev,
          newEmail: userData.email,
          newUsername: userData.name || "",
        }));
      }
    } catch (error) {
      console.error("Error loading user data", error);
    }
  }, []);

  const validateForm = (field: string) => {
    const newErrors = { ...errors };
    
    if (field === 'password' || field === 'all') {
      // Password validation
      if (formData.newPassword && formData.newPassword.length < 6) {
        newErrors.newPassword = t("Password must be at least 6 characters");
      } else {
        newErrors.newPassword = "";
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = t("Passwords do not match");
      } else {
        newErrors.confirmPassword = "";
      }
      
      if (!formData.currentPassword) {
        newErrors.currentPassword = t("Current password is required");
      } else {
        newErrors.currentPassword = "";
      }
    }
    
    if (field === 'email' || field === 'all') {
      // Email validation
      if (formData.newEmail && !/\S+@\S+\.\S+/.test(formData.newEmail)) {
        newErrors.newEmail = t("Please enter a valid email");
      } else {
        newErrors.newEmail = "";
      }
    }
    
    if (field === 'username' || field === 'all') {
      // Username validation
      if (formData.newUsername && formData.newUsername.length < 3) {
        newErrors.newUsername = t("Username must be at least 3 characters");
      } else {
        newErrors.newUsername = "";
      }
    }
    
    setErrors(newErrors);
    
    // Check if there are any errors in the validated fields
    const fieldErrors = Object.keys(newErrors)
      .filter(key => {
        if (field === 'all') return true;
        if (field === 'password') return ['currentPassword', 'newPassword', 'confirmPassword'].includes(key);
        if (field === 'email') return key === 'newEmail';
        if (field === 'username') return key === 'newUsername';
        return false;
      })
      .map(key => newErrors[key as keyof typeof newErrors]);
      
    return fieldErrors.every(error => error === "");
  };

  const handlePasswordChange = () => {
    if (!validateForm('password')) return;
    
    // In a real app, we would make an API call to change the password
    // For now, we'll simulate the change
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex((user: any) => user.email === currentUser.email);
      
      if (userIndex !== -1) {
        // Check if current password is correct
        if (users[userIndex].password !== formData.currentPassword) {
          setErrors(prev => ({ ...prev, currentPassword: t("Current password is incorrect") }));
          return;
        }
        
        // Update password
        users[userIndex].password = formData.newPassword;
        localStorage.setItem("users", JSON.stringify(users));
        
        // Update current user
        localStorage.setItem("currentUser", JSON.stringify(users[userIndex]));
        
        toast({
          title: t("Password updated"),
          description: t("Your password has been updated successfully"),
        });
        
        // Reset form
        setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
      }
    } catch (error) {
      console.error("Error updating password", error);
      toast({
        title: t("Error"),
        description: t("Failed to update password"),
        variant: "destructive",
      });
    }
  };

  const handleEmailChange = () => {
    if (!validateForm('email')) return;
    
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex((user: any) => user.email === currentUser.email);
      
      if (userIndex !== -1) {
        // Update email
        const oldEmail = users[userIndex].email;
        users[userIndex].email = formData.newEmail;
        localStorage.setItem("users", JSON.stringify(users));
        
        // Update current user
        const updatedUser = { ...currentUser, email: formData.newEmail };
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        
        toast({
          title: t("Email updated"),
          description: t("Your email has been changed from ") + oldEmail + t(" to ") + formData.newEmail,
        });
      }
    } catch (error) {
      console.error("Error updating email", error);
      toast({
        title: t("Error"),
        description: t("Failed to update email"),
        variant: "destructive",
      });
    }
  };

  const handleUsernameChange = () => {
    if (!validateForm('username')) return;
    
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex((user: any) => user.email === currentUser.email);
      
      if (userIndex !== -1) {
        // Update username
        const oldName = users[userIndex].name || "";
        users[userIndex].name = formData.newUsername;
        localStorage.setItem("users", JSON.stringify(users));
        
        // Update current user
        const updatedUser = { ...currentUser, name: formData.newUsername };
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        
        toast({
          title: t("Username updated"),
          description: t("Your username has been updated successfully"),
        });
      }
    } catch (error) {
      console.error("Error updating username", error);
      toast({
        title: t("Error"),
        description: t("Failed to update username"),
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = () => {
    if (!window.confirm(t("Are you sure you want to delete your account? This action cannot be undone."))) {
      return;
    }
    
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.filter((user: any) => user.email !== currentUser.email);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      
      // Clear login status
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
      
      toast({
        title: t("Account deleted"),
        description: t("Your account has been deleted successfully"),
      });
      
      navigate("/");
    } catch (error) {
      console.error("Error deleting account", error);
      toast({
        title: t("Error"),
        description: t("Failed to delete account"),
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    
    toast({
      title: t("Logged out"),
      description: t("You have been successfully logged out"),
    });
    
    navigate("/");
  };

  return (
    <div className="space-y-8">
      <div className="dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">{t("Change Username")}</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">{t("New Username")}</label>
            <Input 
              type="text" 
              value={formData.newUsername}
              onChange={(e) => setFormData({ ...formData, newUsername: e.target.value })}
              className="mt-1"
            />
            {errors.newUsername && <p className="text-red-500 text-xs mt-1">{errors.newUsername}</p>}
          </div>
          <Button 
            onClick={handleUsernameChange}
            className="bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            {t("Update Username")}
          </Button>
        </div>
      </div>

      <div className="dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">{t("Change Email")}</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">{t("New Email")}</label>
            <Input 
              type="email" 
              value={formData.newEmail}
              onChange={(e) => setFormData({ ...formData, newEmail: e.target.value })}
              className="mt-1"
            />
            {errors.newEmail && <p className="text-red-500 text-xs mt-1">{errors.newEmail}</p>}
          </div>
          <Button 
            onClick={handleEmailChange}
            className="bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            {t("Update Email")}
          </Button>
        </div>
      </div>

      <div className="dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">{t("Change Password")}</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">{t("Current Password")}</label>
            <Input 
              type="password" 
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              className="mt-1"
            />
            {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>}
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">{t("New Password")}</label>
            <Input 
              type="password" 
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              className="mt-1"
            />
            {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">{t("Confirm New Password")}</label>
            <Input 
              type="password" 
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="mt-1"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
          <Button 
            onClick={handlePasswordChange}
            className="bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            {t("Change Password")}
          </Button>
        </div>
      </div>

      <div className="dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">{t("Two-Factor Authentication")}</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium dark:text-white">{t("Enable 2FA")}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t("Add an extra layer of security to your account")}
            </p>
          </div>
          <Switch />
        </div>
      </div>

      <div className="dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">{t("Account Actions")}</h2>
        <div className="space-y-4">
          <Button 
            onClick={handleLogout}
            className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            {t("Logout")}
          </Button>
          
          <Button 
            onClick={handleDeleteAccount}
            className="w-full bg-red-500 text-white hover:bg-red-600"
          >
            {t("Delete Account")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Security;
