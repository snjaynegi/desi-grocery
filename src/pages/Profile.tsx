
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {t("My Profile")}
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            <TabsTrigger value="personal">{t("Personal Info")}</TabsTrigger>
            <TabsTrigger value="orders">{t("Orders")}</TabsTrigger>
            <TabsTrigger value="payments">{t("Payments")}</TabsTrigger>
            <TabsTrigger value="subscriptions">{t("Subscriptions")}</TabsTrigger>
            <TabsTrigger value="preferences">{t("Preferences")}</TabsTrigger>
            <TabsTrigger value="wishlist">{t("Wishlist")}</TabsTrigger>
            <TabsTrigger value="reviews">{t("Reviews")}</TabsTrigger>
            <TabsTrigger value="security">{t("Security")}</TabsTrigger>
            <TabsTrigger value="support">{t("Support")}</TabsTrigger>
          </TabsList>

          <div className="bg-white rounded-lg shadow p-6">
            <TabsContent value="personal">
              <PersonalInfo />
            </TabsContent>
            <TabsContent value="orders">
              <OrderHistory />
            </TabsContent>
            <TabsContent value="payments">
              <PaymentSettings />
            </TabsContent>
            <TabsContent value="subscriptions">
              <Subscriptions />
            </TabsContent>
            <TabsContent value="preferences">
              <Preferences />
            </TabsContent>
            <TabsContent value="wishlist">
              <WishlistSection />
            </TabsContent>
            <TabsContent value="reviews">
              <Reviews />
            </TabsContent>
            <TabsContent value="security">
              <Security />
            </TabsContent>
            <TabsContent value="support">
              <Support />
            </TabsContent>
          </div>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
