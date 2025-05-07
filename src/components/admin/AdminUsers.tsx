
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserCheck, UserX, Trash2, KeyRound, UserPlus, Loader2, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import UserCreationForm from "./UserCreationForm";
import { User } from "@/types/user";

const AdminUsers = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("list");
  
  // Dialog states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newStatus, setNewStatus] = useState<"active" | "inactive">("active");

  // Fetch users from Supabase
  const fetchUsers = async () => {
    setLoading(true);
    
    try {
      // Fetch all users
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        throw authError;
      }
      
      if (authUsers) {
        // Map auth users to our format with explicit status typing
        const formattedUsers: User[] = authUsers.users.map(user => ({
          id: user.id,
          name: user.user_metadata?.name || 'No Name',
          email: user.email || 'No Email',
          username: user.user_metadata?.username || '',
          password: '',
          createdAt: user.created_at,
          status: (user.user_metadata?.status === 'inactive' ? 'inactive' : 'active') as "active" | "inactive",
          registrationDate: user.created_at,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.user_metadata?.name || user.email || '')}`
        }));
        
        setUsers(formattedUsers);
        setFilteredUsers(formattedUsers);
      }
    } catch (error: any) {
      console.error("Error fetching users:", error);
      
      // Show toast for error
      toast({
        title: t("Error"),
        description: error.message || t("Failed to load users"),
        variant: "destructive",
        duration: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search and status
  useEffect(() => {
    let filtered = [...users];
    
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(user => user.status === statusFilter);
    }
    
    setFilteredUsers(filtered);
  }, [users, searchQuery, statusFilter]);

  // Reset password handler
  const handleResetPassword = async () => {
    if (!currentUser) return;
    
    try {
      // Call Supabase Admin API to reset password
      const { error } = await supabase.auth.admin.generateLink({
        type: 'recovery',
        email: currentUser.email,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: t("Password Reset Link Sent"),
        description: t("A password reset link has been sent to the user's email"),
        duration: 3000
      });
      
    } catch (error: any) {
      console.error("Error resetting password:", error);
      toast({
        title: t("Error"),
        description: error.message || t("Failed to reset password"),
        variant: "destructive",
        duration: 3000
      });
    } finally {
      setIsResetPasswordDialogOpen(false);
    }
  };

  // Delete user
  const handleDeleteUser = async () => {
    if (!currentUser) return;
    
    try {
      // Call Supabase Admin API to delete user
      const { error } = await supabase.auth.admin.deleteUser(currentUser.id);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setUsers(prev => prev.filter(user => user.id !== currentUser.id));
      setFilteredUsers(prev => prev.filter(user => user.id !== currentUser.id));
      
      toast({
        title: t("User Deleted"),
        description: t("The user has been permanently deleted"),
        duration: 3000
      });
      
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        title: t("Error"),
        description: error.message || t("Failed to delete user"),
        variant: "destructive",
        duration: 3000
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  // Update user status
  const handleUpdateStatus = async () => {
    if (!currentUser) return;
    
    try {
      // Call Supabase Admin API to update user
      const { error } = await supabase.auth.admin.updateUserById(
        currentUser.id,
        {
          user_metadata: { status: newStatus }
        }
      );
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setUsers(prev => prev.map(user => 
        user.id === currentUser.id ? { ...user, status: newStatus } : user
      ));
      
      toast({
        title: t("Status Updated"),
        description: `${currentUser.name} ${newStatus === "active" ? t("activated") : t("deactivated")}`,
        duration: 3000
      });
      
    } catch (error: any) {
      console.error("Error updating user status:", error);
      toast({
        title: t("Error"),
        description: error.message || t("Failed to update user status"),
        variant: "destructive",
        duration: 3000
      });
    } finally {
      setIsStatusDialogOpen(false);
    }
  };

  // Handle user creation success
  const handleUserCreated = () => {
    // Refresh the user list after a new user is created
    fetchUsers();
    // Automatically switch back to the list view
    setActiveTab("list");
    
    toast({
      title: t("User Created"),
      description: t("The new user has been created successfully"),
      duration: 3000
    });
  };

  return (
    <div className="space-y-4">
      {activeTab === "list" ? (
        <Button 
          onClick={() => setActiveTab("create")}
          className="w-full bg-[#0c1221] text-white hover:bg-[#161f38] py-6 flex items-center justify-center gap-2"
        >
          <UserPlus className="h-5 w-5" />
          {t("Create User")}
        </Button>
      ) : (
        <Button 
          onClick={() => setActiveTab("list")}
          className="w-full bg-[#0c1221] text-white hover:bg-[#161f38] py-6"
        >
          <KeyRound className="h-5 w-5 mr-2" />
          {t("User Account Management")}
        </Button>
      )}
      
      <TabsContent value="list" className="space-y-4 mt-4">
        <div className="bg-[#131b2e] rounded-lg shadow p-6 text-white">
          <h2 className="text-xl font-bold mb-6">{t("User Account Management")}</h2>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("Search users by name or email...")}
                className="bg-[#0c1221] border-[#232e47] text-white pl-10"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-[#0c1221] border-[#232e47] text-white">
                  <SelectValue placeholder={t("All Users")} />
                </SelectTrigger>
                <SelectContent className="bg-[#0c1221] border-[#232e47] text-white">
                  <SelectItem value="all">{t("All Users")}</SelectItem>
                  <SelectItem value="active">{t("Active Users")}</SelectItem>
                  <SelectItem value="inactive">{t("Inactive Users")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="grid grid-cols-12 text-gray-400 py-3 px-4">
              <div className="col-span-3">{t("User")}</div>
              <div className="col-span-3">{t("Email")}</div>
              <div className="col-span-2">{t("Status")}</div>
              <div className="col-span-3">{t("Registration Date")}</div>
              <div className="col-span-1 text-right">{t("Actions")}</div>
            </div>

            {loading ? (
              <div className="py-8 flex justify-center text-white">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="py-8 text-center text-white">{t("No users found")}</div>
            ) : (
              <div className="bg-[#0c1221] rounded-lg">
                {filteredUsers.map((user) => (
                  <div 
                    key={user.id} 
                    className="grid grid-cols-12 items-center py-3 px-4 text-white border-b border-[#232e47] last:border-0"
                  >
                    <div className="col-span-3 flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#232e47] rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>{user.name}</div>
                    </div>
                    <div className="col-span-3">{user.email}</div>
                    <div className="col-span-2">
                      <Badge 
                        className={user.status === "active" 
                          ? "bg-green-600/20 text-green-400 hover:bg-green-600/20" 
                          : "bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/20"}
                      >
                        {user.status === "active" ? t("Active") : t("Inactive")}
                      </Badge>
                    </div>
                    <div className="col-span-3">
                      {new Date(user.registrationDate || "").toLocaleDateString()}
                    </div>
                    <div className="col-span-1">
                      <div className="flex justify-end gap-2">
                        <button 
                          className="text-blue-400 p-1 cursor-pointer hover:bg-[#232e47] rounded-full"
                          onClick={() => {
                            setCurrentUser(user);
                            setIsResetPasswordDialogOpen(true);
                          }}
                          aria-label="Reset password"
                        >
                          <KeyRound size={16} />
                        </button>
                        {user.status === "inactive" ? (
                          <button 
                            className="text-green-400 p-1 cursor-pointer hover:bg-[#232e47] rounded-full"
                            onClick={() => {
                              setCurrentUser(user);
                              setNewStatus("active");
                              setIsStatusDialogOpen(true);
                            }}
                            aria-label="Activate user"
                          >
                            <UserCheck size={16} />
                          </button>
                        ) : (
                          <button 
                            className="text-amber-400 p-1 cursor-pointer hover:bg-[#232e47] rounded-full"
                            onClick={() => {
                              setCurrentUser(user);
                              setNewStatus("inactive");
                              setIsStatusDialogOpen(true);
                            }}
                            aria-label="Deactivate user"
                          >
                            <UserX size={16} />
                          </button>
                        )}
                        <button 
                            className="text-red-400 p-1 cursor-pointer hover:bg-[#232e47] rounded-full"
                            onClick={() => {
                              setCurrentUser(user);
                              setIsDeleteDialogOpen(true);
                            }}
                            aria-label="Delete user"
                          >
                            <Trash2 size={16} />
                          </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <Button 
            className="mt-6 bg-[#4F7942] hover:bg-[#3e5e34] text-white"
            onClick={fetchUsers}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            {t("Refresh User List")}
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="create" className="mt-4">
        <div className="bg-[#131b2e] rounded-lg shadow p-6 text-white">
          <h2 className="text-xl font-bold mb-6">{t("Create New User")}</h2>
          <UserCreationForm onUserCreated={handleUserCreated} />
        </div>
      </TabsContent>

      {/* Delete User Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#131b2e] text-white border-[#232e47]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">{t("Delete User")}</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              {t("Are you sure you want to delete this user? This action cannot be undone.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#232e47] text-white border-[#364467] hover:bg-[#304060]">{t("Cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
              {t("Delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Change Status Confirmation Dialog */}
      <AlertDialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <AlertDialogContent className="bg-[#131b2e] text-white border-[#232e47]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              {newStatus === "active" ? t("Activate User") : t("Deactivate User")}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              {newStatus === "active"
                ? t("Are you sure you want to activate this user?")
                : t("Are you sure you want to deactivate this user? They will not be able to login.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#232e47] text-white border-[#364467] hover:bg-[#304060]">{t("Cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpdateStatus} className="bg-primary hover:bg-primary/80">
              {newStatus === "active" ? t("Activate") : t("Deactivate")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Reset Password Confirmation Dialog */}
      <AlertDialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
        <AlertDialogContent className="bg-[#131b2e] text-white border-[#232e47]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">{t("Reset Password")}</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              {t("Are you sure you want to send a password reset link to this user's email?")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#232e47] text-white border-[#364467] hover:bg-[#304060]">{t("Cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleResetPassword} className="bg-blue-600 hover:bg-blue-700">
              {t("Send Reset Link")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminUsers;
