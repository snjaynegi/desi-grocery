
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import {
  Home,
  User,
  ShoppingBag,
  CreditCard,
  Ticket,
  Settings,
  Heart,
  Star,
  Shield,
  HelpCircle
} from "lucide-react";

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset
} from "@/components/ui/sidebar";

import PersonalInfo from "../components/profile/PersonalInfo";
import OrderHistory from "../components/profile/OrderHistory";
import PaymentSettings from "../components/profile/PaymentSettings";
import Subscriptions from "../components/profile/Subscriptions";
import Preferences from "../components/profile/Preferences";
import WishlistSection from "../components/profile/WishlistSection";
import Reviews from "../components/profile/Reviews";
import Security from "../components/profile/Security";
import Support from "../components/profile/Support";

const Profile = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("personal");

  const menuItems = [
    { id: "personal", name: t("Personal Info"), icon: User },
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
      
      <div className="profile-main-container container mx-auto px-4">
        <h1 className={`profile-heading text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {t("My Profile")}
        </h1>

        <SidebarProvider defaultOpen={true}>
          <div className="profile-content-wrapper flex w-full">
            <Sidebar variant="inset" collapsible="icon">
              <SidebarContent className="mt-2">
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        isActive={activeTab === item.id}
                        onClick={() => setActiveTab(item.id)}
                        tooltip={item.name}
                        className={isDarkMode ? 'text-gray-200 hover:text-white' : 'text-gray-800 hover:text-black'}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarContent>
            </Sidebar>
            <SidebarInset className="profile-tab-content ml-2 md:ml-4">
              <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow animate-fadeIn`}>
                {activeTab === "personal" && <PersonalInfo />}
                {activeTab === "orders" && <OrderHistory />}
                {activeTab === "payments" && <PaymentSettings />}
                {activeTab === "subscriptions" && <Subscriptions />}
                {activeTab === "preferences" && <Preferences />}
                {activeTab === "wishlist" && <WishlistSection />}
                {activeTab === "reviews" && <Reviews />}
                {activeTab === "security" && <Security />}
                {activeTab === "support" && <Support />}
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
