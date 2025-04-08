
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { Input } from "./ui/input";
import { Moon, Sun, Heart, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface HeaderProps {
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

const Header = ({ showSearch, searchQuery, onSearchChange }: HeaderProps) => {
  const { t } = useTranslation();
  const { state } = useCart();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{name?: string, email?: string} | null>(null);

  useEffect(() => {
    // Check login status on mount and whenever localStorage changes
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
      
      if (loggedIn) {
        try {
          const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
          setCurrentUser(user);
        } catch (error) {
          console.error("Failed to parse user data", error);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };

    checkLoginStatus();
    
    // Listen for storage events (in case user logs in/out in another tab)
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setCurrentUser(null);
    toast({
      title: t("Logged out"),
      description: t("You have been successfully logged out"),
    });
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-[#F1F0FB] to-white shadow-md dark:from-green-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <Link 
            to="/" 
            className="text-2xl font-bold text-[#4F7942] hover:text-primary transition-colors dark:text-green-400"
            aria-label={t("Desi Grocery")}
          >
            {t("Desi Grocery")}
          </Link>

          <div className="flex items-center space-x-6">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={isDarkMode ? t("Switch to light mode") : t("Switch to dark mode")}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors dark:text-gray-300">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">{currentUser?.name || t("Account")}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-gray-800 border dark:border-gray-700">
                  <DropdownMenuLabel className="dark:text-gray-300">{currentUser?.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="dark:text-gray-300 cursor-pointer">
                    {t("Profile Settings")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/orders")} className="dark:text-gray-300 cursor-pointer">
                    {t("Order History")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 dark:text-red-400 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("Logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary transition-colors dark:text-gray-300"
                  aria-label={t("Sign in")}
                >
                  {t("Sign in")}
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-600 hover:text-primary transition-colors dark:text-gray-300"
                  aria-label={t("Sign up")}
                >
                  {t("Sign up")}
                </Link>
              </>
            )}
            
            <Link
              to="/wishlist"
              className="text-gray-600 hover:text-primary transition-colors dark:text-gray-300"
              aria-label={t("Wishlist")}
            >
              <Heart className="w-6 h-6" />
            </Link>
            <Link to="/cart" className="relative" aria-label={t("Cart")}>
              <svg
                className="w-6 h-6 text-gray-700 hover:text-primary transition-colors dark:text-gray-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              {state.items.length > 0 && (
                <span 
                  className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  aria-label={t("Cart items count")}
                >
                  {state.items.length}
                </span>
              )}
            </Link>
          </div>
        </div>
        {showSearch && (
          <div className="mt-4">
            <Input
              type="search"
              placeholder={t("Search")}
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full max-w-md mx-auto"
              aria-label={t("Search products")}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
