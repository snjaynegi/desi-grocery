
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import { useCart } from "../context/CartContext";
import { Input } from "./ui/input";
import { Heart } from "lucide-react";

interface HeaderProps {
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

const Header = ({ showSearch, searchQuery, onSearchChange }: HeaderProps) => {
  const { t } = useTranslation();
  const { state } = useCart();

  return (
    <header className="bg-gradient-to-r from-[#F1F0FB] to-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-[#403E43] hover:text-primary transition-colors">
            {t("Desi Grocery")}
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/login" className="text-gray-600 hover:text-primary transition-colors">
              {t("Sign in")}
            </Link>
            <Link to="/signup" className="text-gray-600 hover:text-primary transition-colors">
              {t("Sign up")}
            </Link>
            <Link to="/wishlist" className="text-gray-600 hover:text-primary transition-colors">
              <Heart className="w-6 h-6" />
            </Link>
            <LanguageSelector />
            <Link to="/cart" className="relative">
              <span className="sr-only">{t("Cart")}</span>
              <svg
                className="w-6 h-6 text-gray-700 hover:text-primary transition-colors"
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
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
