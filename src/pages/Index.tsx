
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import PersonalizedRecommendations from "../components/PersonalizedRecommendations";
import LoyaltyBanner from "../components/LoyaltyBanner";
import { extendedProducts } from "../data/products";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { t } = useTranslation();
  const supabase = useSupabaseClient();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentUser, setCurrentUser] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  // Get unique categories from products
  const categories = [...new Set(extendedProducts.map(product => product.category))];

  useEffect(() => {
    // Check if user is logged in and fetch user data
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching user data:', error);
            return;
          }

          setCurrentUser(userData);
          
          // Fetch recently viewed products
          if (userData?.viewedProducts?.length) {
            const recentlyViewedItems = extendedProducts.filter(product => 
              userData.viewedProducts.includes(product.id)
            ).slice(0, 4);
            
            setRecentlyViewed(recentlyViewedItems);
          }
          
          // Generate recommendations based on favorite categories
          if (userData?.favoriteCategories?.length) {
            const recommendations = extendedProducts.filter(product => 
              userData.favoriteCategories.includes(product.category)
            ).slice(0, 8);
            
            setRecommendedProducts(recommendations);
          } else {
            // Default recommendations
            setRecommendedProducts(extendedProducts.slice(0, 8));
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      }
    };

    fetchUserData();
  }, [supabase]);

  const filteredProducts = extendedProducts.filter((product) => {
    const matchesSearch = t(product.name).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header showSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {currentUser && <LoyaltyBanner user={currentUser} />}
        
        {recentlyViewed.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">{t("Recently Viewed")}</h2>
            <ProductGrid products={recentlyViewed} />
          </div>
        )}
        
        {recommendedProducts.length > 0 && (
          <PersonalizedRecommendations products={recommendedProducts} />
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 mt-8">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">{t("Products")}</h1>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">{t("Filter by")}:</span>
            </div>
            <Select
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("All Categories")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("All Categories")}</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category || "unknown"}>
                    {t(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            {filteredProducts.length} {t("products found")}
          </p>
        </div>
        
        <ProductGrid products={filteredProducts} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
