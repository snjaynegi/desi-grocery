
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import {
  User,
  ShoppingBag,
  CreditCard,
  Ticket,
  Settings,
  Heart,
  Star,
  Shield,
  HelpCircle,
  Menu,
  MapPin
} from "lucide-react";

import PersonalInfo from "../components/profile/PersonalInfo";
import OrderHistory from "../components/profile/OrderHistory";
import PaymentSettings from "../components/profile/PaymentSettings";
import Subscriptions from "../components/profile/Subscriptions";
import Preferences from "../components/profile/Preferences";
import WishlistSection from "../components/profile/WishlistSection";
import Reviews from "../components/profile/Reviews";
import Security from "../components/profile/Security";
import Support from "../components/profile/Support";
import AddressManager from "../components/profile/AddressManager";

const Profile = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("personal");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "personal", name: t("Personal Info"), icon: User },
    { id: "addresses", name: t("Addresses"), icon: MapPin },
    { id: "orders", name: t("Orders"), icon: ShoppingBag },
    { id: "payments", name: t("Payments"), icon: CreditCard },
    { id: "subscriptions", name: t("Subscriptions"), icon: Ticket },
    { id: "preferences", name: t("Preferences"), icon: Settings },
    { id: "wishlist", name: t("Wishlist"), icon: Heart },
    { id: "reviews", name: t("Reviews"), icon: Star },
    { id: "security", name: t("Security"), icon: Shield },
    { id: "support", name: t("Support"), icon: HelpCircle }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50'}`}>
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {t("My Profile")}
          </h1>
          
          <button 
            className="md:hidden p-2 rounded-full border"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar for larger screens */}
          <aside className={`md:block ${isMobileMenuOpen ? 'block' : 'hidden'} md:w-64 w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-4 h-fit`}>
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === item.id 
                          ? `${isDarkMode ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'}` 
                          : `${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          
          {/* Main content */}
          <div className={`flex-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-6 animate-fadeIn`}>
            {activeTab === "personal" && <PersonalInfo />}
            {activeTab === "addresses" && <AddressManager />}
            {activeTab === "orders" && <OrderHistory />}
            {activeTab === "payments" && <PaymentSettings />}
            {activeTab === "subscriptions" && <Subscriptions />}
            {activeTab === "preferences" && <Preferences />}
            {activeTab === "wishlist" && <WishlistSection />}
            {activeTab === "reviews" && <Reviews />}
            {activeTab === "security" && <Security />}
            {activeTab === "support" && <Support />}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
