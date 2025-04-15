
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Security = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
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
  const [loading, setLoading] = useState({
    password: false,
    email: false,
    username: false,
    account: false
  });
  const [profileData, setProfileData] = useState<{
    username?: string;
    name?: string;
    email?: string;
  }>({});

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, name')
          .eq('id', user.id)
          .single();
          
        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }
        
        setProfileData({
          username: data.username,
          name: data.name,
          email: user.email
        });
        
        // Set initial form data
        setFormData(prev => ({
          ...prev,
          newEmail: user.email || '',
          newUsername: data.username || ''
        }));
      } catch (err) {
        console.error("Error loading user data", err);
      }
    };
    
    fetchProfileData();
  }, [user]);

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

  const handlePasswordChange = async () => {
    if (!validateForm('password')) return;
    
    setLoading({ ...loading, password: true });
    
    try {
      // First verify current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: formData.currentPassword
      });
      
      if (signInError) {
        setErrors(prev => ({ ...prev, currentPassword: t("Current password is incorrect") }));
        return;
      }
      
      // Update password
      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword
      });
      
      if (error) {
        toast({
          title: t("Error"),
          description: error.message || t("Failed to update password"),
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: t("Password updated"),
        description: t("Your password has been updated successfully"),
      });
      
      // Reset form
      setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
    } catch (error) {
      console.error("Error updating password", error);
      toast({
        title: t("Error"),
        description: t("Failed to update password"),
        variant: "destructive",
      });
    } finally {
      setLoading({ ...loading, password: false });
    }
  };

  const handleEmailChange = async () => {
    if (!validateForm('email')) return;
    
    setLoading({ ...loading, email: true });
    
    try {
      const { error } = await supabase.auth.updateUser({
        email: formData.newEmail
      });
      
      if (error) {
        toast({
          title: t("Error"),
          description: error.message || t("Failed to update email"),
          variant: "destructive",
        });
        return;
      }
      
      // Email update requires verification in most Supabase projects
      toast({
        title: t("Verification email sent"),
        description: t("Please check your new email to confirm the change"),
      });
    } catch (error) {
      console.error("Error updating email", error);
      toast({
        title: t("Error"),
        description: t("Failed to update email"),
        variant: "destructive",
      });
    } finally {
      setLoading({ ...loading, email: false });
    }
  };

  const handleUsernameChange = async () => {
    if (!validateForm('username')) return;
    
    setLoading({ ...loading, username: true });
    
    try {
      // Check if username is already taken
      const { data: existingUsers, error: fetchError } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', formData.newUsername)
        .neq('id', user?.id)
        .maybeSingle();
        
      if (fetchError) {
        throw fetchError;
      }
      
      if (existingUsers) {
        setErrors(prev => ({ ...prev, newUsername: t("Username already exists") }));
        toast({
          title: t("Error"),
          description: t("Username already exists"),
          variant: "destructive",
        });
        return;
      }
      
      // Update username in profile table
      const { error } = await supabase
        .from('profiles')
        .update({ 
          username: formData.newUsername,
          updated_at: new Date()
        })
        .eq('id', user?.id);
      
      if (error) {
        toast({
          title: t("Error"),
          description: error.message || t("Failed to update username"),
          variant: "destructive",
        });
        return;
      }
      
      // Update user metadata
      await supabase.auth.updateUser({
        data: { username: formData.newUsername }
      });
      
      setProfileData(prev => ({ ...prev, username: formData.newUsername }));
      
      toast({
        title: t("Username updated"),
        description: t("Your username has been updated successfully"),
      });
    } catch (error) {
      console.error("Error updating username", error);
      toast({
        title: t("Error"),
        description: t("Failed to update username"),
        variant: "destructive",
      });
    } finally {
      setLoading({ ...loading, username: false });
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm(t("Are you sure you want to delete your account? This action cannot be undone."))) {
      return;
    }
    
    setLoading({ ...loading, account: true });
    
    try {
      // In production, this should be handled by an admin or server function
      // For demo purposes only - this won't actually delete the auth user
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user?.id);
      
      if (error) {
        toast({
          title: t("Error"),
          description: error.message || t("Failed to delete account"),
          variant: "destructive",
        });
        return;
      }
      
      await signOut();
      
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
    } finally {
      setLoading({ ...loading, account: false });
    }
  };

  const handleLogout = async () => {
    await signOut();
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
            disabled={loading.username}
          >
            {loading.username ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("Updating...")}
              </>
            ) : (
              t("Update Username")
            )}
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
            disabled={loading.email}
          >
            {loading.email ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("Updating...")}
              </>
            ) : (
              t("Update Email")
            )}
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
            disabled={loading.password}
          >
            {loading.password ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("Updating...")}
              </>
            ) : (
              t("Change Password")
            )}
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
            disabled={loading.account}
          >
            {loading.account ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("Deleting...")}
              </>
            ) : (
              t("Delete Account")
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Security;
