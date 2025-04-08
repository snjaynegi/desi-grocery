
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

const Footer = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <footer className={`${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gradient-to-r from-[#F1F0FB] to-white'}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t("About Us")}
            </h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t("Your trusted source for quality groceries.")}
            </p>
          </div>
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t("Quick Links")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className={`hover:text-primary transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600'}`}
                >
                  {t("Home")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/wishlist" 
                  className={`hover:text-primary transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600'}`}
                >
                  {t("Wishlist")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/cart" 
                  className={`hover:text-primary transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600'}`}
                >
                  {t("Cart")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t("Categories")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className={`hover:text-primary transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600'}`}
                >
                  {t("vegetables")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className={`hover:text-primary transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600'}`}
                >
                  {t("fruits")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className={`hover:text-primary transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600'}`}
                >
                  {t("staples")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t("Contact")}
            </h3>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>{t("Email")}: support@desigrocery.com</li>
              <li>{t("Phone")}: +1 234 567 890</li>
            </ul>
          </div>
        </div>
        <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} mt-8 pt-8 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>&copy; 2024 Desi Grocery. {t("All rights reserved.")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
