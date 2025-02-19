
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-r from-[#F1F0FB] to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("About Us")}</h3>
            <p className="text-gray-600">{t("Your trusted source for quality groceries.")}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("Quick Links")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  {t("Home")}
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-600 hover:text-primary transition-colors">
                  {t("Wishlist")}
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-primary transition-colors">
                  {t("Cart")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("Categories")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  {t("vegetables")}
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  {t("fruits")}
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  {t("staples")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("Contact")}</h3>
            <ul className="space-y-2 text-gray-600">
              <li>{t("Email")}: support@desigrocery.com</li>
              <li>{t("Phone")}: +1 234 567 890</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; 2024 Desi Grocery. {t("All rights reserved.")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
