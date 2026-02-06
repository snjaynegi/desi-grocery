import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "@/components/ui/use-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CompactNutritionChart from "../components/CompactNutritionChart";
import { dummyProducts } from "../data/products";
import { generateNutritionData } from "../utils/nutritionGenerator";

const ProductDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const product = dummyProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {t("Product not found")}
        </h1>
        <Link
          to="/"
          className="text-primary hover:text-primary/90 transition-colors"
        >
          {t("Back to Home")}
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: t("Please sign in"),
        description: t("You need to sign in to add items to cart"),
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    dispatch({
      type: "ADD_ITEM",
      payload: { ...product, quantity: 1 },
    });
    toast({
      title: t("Item added to cart"),
      description: t(product.name),
    });
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-primary hover:text-primary/90 mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t("Back to Home")}
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={product.image}
                alt={t(product.name)}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  // Try to load fallback image based on category
                  const target = e.target as HTMLImageElement;
                  const fallbackImages = {
                    vegetables: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
                    fruits: "https://images.unsplash.com/photo-1560807707-8cc77767d783",
                    staples: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f"
                  };
                  target.src = fallbackImages[product.category as keyof typeof fallbackImages] || "/placeholder.svg";
                }}
              />
            </div>
            <div className="p-8 md:w-1/2">
              <div className="uppercase tracking-wide text-sm text-primary font-semibold">
                {t(product.category)}
              </div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {t(product.name)}
              </h1>
              <p className="mt-4 text-2xl text-foreground">₹{product.price}</p>
              <div className="mt-4 space-y-2">
                {product.origin && (
                  <p className="text-muted-foreground">
                    <span className="font-semibold">{t("Source")}:</span>{" "}
                    {product.origin}
                  </p>
                )}
                {product.description && (
                  <p className="text-muted-foreground">
                    <span className="font-semibold">{t("Description")}:</span>{" "}
                    {product.description}
                  </p>
                )}
              </div>

              {/* Compact Nutrition Chart */}
              <div className="mt-4">
                <CompactNutritionChart 
                  nutrition={generateNutritionData({
                    ...product,
                    category: product.category
                  })}
                  category={product.category}
                />
              </div>
              <button
                onClick={handleAddToCart}
                className="mt-4 w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                {t("Add to Cart")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
