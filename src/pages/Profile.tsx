
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
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50'}`}>
      <Header />
      <div className="flex-grow container mx-auto pt-16 px-4 pb-8">
        <h1 className={`text-2xl font-bold mb-6 md:pl-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {t("My Profile")}
        </h1>

        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-[70vh] w-full">
            <Sidebar>
              <SidebarContent className="mt-4">
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        isActive={activeTab === item.id}
                        onClick={() => setActiveTab(item.id)}
                        tooltip={item.name}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
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
      <Footer />
    </div>
  );
};

export default Profile;
