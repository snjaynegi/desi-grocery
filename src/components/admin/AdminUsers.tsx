
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";
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
import { Search, UserCheck, UserX, Trash2, KeyRound } from "lucide-react";

// User interface
interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  registrationDate: string;
  avatar: string;
  password?: string;
}

// Get registered users from localStorage or generate mock data
const getUsers = (): User[] => {
  const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  
  // If there are stored users, enhance them with required properties
  if (storedUsers.length > 0) {
    return storedUsers.map((user: any) => ({
      ...user,
      status: user.status || "active",
      registrationDate: user.registrationDate || new Date().toISOString().split('T')[0],
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`
    }));
  }
  
  // Otherwise generate mock users
  return generateMockUsers(15);
};

// Generate mock users data
const generateMockUsers = (count: number): User[] => {
  const users: User[] = [];
  const statuses: ("active" | "inactive")[] = ["active", "inactive"];
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "example.com"];
  
  for (let i = 1; i <= count; i++) {
    const firstName = ["John", "Alice", "Robert", "Emma", "Michael", "Sophia", "William", "Olivia"][
      Math.floor(Math.random() * 8)
    ];
    const lastName = ["Smith", "Johnson", "Brown", "Davis", "Wilson", "Miller", "Taylor", "Anderson"][
      Math.floor(Math.random() * 8)
    ];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}@${
      domains[Math.floor(Math.random() * domains.length)]
    }`;
    
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const day = Math.floor(Math.random() * 28) + 1;
    const month = Math.floor(Math.random() * 12) + 1;
    const year = 2023 - Math.floor(Math.random() * 2);
    const registrationDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    
    users.push({
      id: `user-${i}`,
      name,
      email,
      status,
      password: "password",
      registrationDate,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`
    });
  }
  
  return users;
};

const AdminUsers = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Dialog states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newStatus, setNewStatus] = useState<"active" | "inactive">("active");
  
  // Reset password handler
  const handleResetPassword = () => {
    if (!currentUser) return;
    
    setUsers(prev => prev.map(user => 
      user.id === currentUser.id ? { ...user, password: "password" } : user
    ));
    
    // Update users in localStorage if needed
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (storedUsers.length > 0) {
      const updatedUsers = storedUsers.map((user: any) => 
        user.id === currentUser.id ? { ...user, password: "password" } : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
    
    setIsResetPasswordDialogOpen(false);
    
    toast({
      title: t("Password Reset"),
      description: t("User password has been reset to default")
    });
  };

  // Initialize with registered users or mock users
  useEffect(() => {
    setUsers(getUsers());
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

  // Delete user
  const handleDeleteUser = () => {
    if (!currentUser) return;
    
    setUsers(prev => prev.filter(user => user.id !== currentUser.id));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: t("User Deleted"),
      description: t("The user has been permanently deleted")
    });
  };

  // Update user status
  const handleUpdateStatus = () => {
    if (!currentUser) return;
    
    setUsers(prev => prev.map(user => 
      user.id === currentUser.id ? { ...user, status: newStatus } : user
    ));
    
    // Update users in localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (storedUsers.length > 0) {
      const updatedUsers = storedUsers.map((user: any) => 
        user.id === currentUser.id ? { ...user, status: newStatus } : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      
      // If user is deactivated, check if they are currently logged in and log them out
      if (newStatus === "inactive") {
        const currentLoggedInUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
        if (currentLoggedInUser.id === currentUser.id) {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("currentUser");
        }
      }
    }
    
    setIsStatusDialogOpen(false);
    
    toast({
      title: t("Status Updated"),
      description: `${currentUser.name} ${newStatus === "active" ? t("activated") : t("deactivated")}`
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-6">{t("User Account Management")}</h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("Search users by name or email...")}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
          
          <div className="w-full md:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t("All Users")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("All Users")}</SelectItem>
                <SelectItem value="active">{t("Active Users")}</SelectItem>
                <SelectItem value="inactive">{t("Inactive Users")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("User")}</TableHead>
                <TableHead>{t("Email")}</TableHead>
                <TableHead>{t("Status")}</TableHead>
                <TableHead>{t("Registration Date")}</TableHead>
                <TableHead className="text-right">{t("Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">{t("No users found")}</TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>{user.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status === "active" ? t("Active") : t("Inactive")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(user.registrationDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-blue-600"
                          onClick={() => {
                            setCurrentUser(user);
                            setIsResetPasswordDialogOpen(true);
                          }}
                        >
                          <KeyRound size={16} />
                        </Button>
                        {user.status === "inactive" ? (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-green-600 hover:bg-green-50"
                            onClick={() => {
                              setCurrentUser(user);
                              setNewStatus("active");
                              setIsStatusDialogOpen(true);
                            }}
                          >
                            <UserCheck size={16} />
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-amber-600 hover:bg-amber-50"
                            onClick={() => {
                              setCurrentUser(user);
                              setNewStatus("inactive");
                              setIsStatusDialogOpen(true);
                            }}
                          >
                            <UserX size={16} />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => {
                            setCurrentUser(user);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Delete User Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("Delete User")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("Are you sure you want to delete this user? This action cannot be undone.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200">{t("Cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
              {t("Delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Change Status Confirmation Dialog */}
      <AlertDialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {newStatus === "active" ? t("Activate User") : t("Deactivate User")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {newStatus === "active"
                ? t("Are you sure you want to activate this user?")
                : t("Are you sure you want to deactivate this user? They will not be able to login.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white text-gray-700 border-gray-300">{t("Cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpdateStatus}>
              {newStatus === "active" ? t("Activate") : t("Deactivate")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Reset Password Confirmation Dialog */}
      <AlertDialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("Reset Password")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("Are you sure you want to reset this user's password to the default password? The user will need to change it on their next login.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white text-gray-700 border-gray-300">{t("Cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleResetPassword} className="bg-blue-600 hover:bg-blue-700">
              {t("Reset Password")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminUsers;
