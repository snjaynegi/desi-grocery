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

  // For demo purposes, we'll use the same product data with additional fields
  const dummyProducts = [
    {
      id: "1",
      name: "Fresh Tomatoes",
      price: 40,
      image: "https://images.unsplash.com/photo-1546470427-701d9e4d7b1f",
      category: "vegetables",
      source: "Local Organic Farm",
      quality: 4.5,
      description: "Fresh, locally sourced organic tomatoes.",
      nutritionalInfo: "Rich in Vitamin C and antioxidants",
      reviews: 128
    },
    {
      id: "2",
      name: "Organic Onions",
      price: 35,
      image: "https://images.unsplash.com/photo-1508747703725-719777637510",
      category: "vegetables",
      source: "Trusted Supplier",
      quality: 4.2,
      description: "High-quality organic onions, perfect for cooking.",
      nutritionalInfo: "Good source of fiber and vitamins",
      reviews: 95
    },
    {
      id: "3",
      name: "Basmati Rice",
      price: 120,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
      category: "staples",
      source: "Indian Farms",
      quality: 4.8,
      description: "Authentic Basmati Rice with a distinct aroma.",
      nutritionalInfo: "Carbohydrate-rich and gluten-free",
      reviews: 210
    },
    {
      id: "4",
      name: "Fresh Apples",
      price: 180,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
      category: "fruits",
      source: "Kashmir Orchards",
      quality: 4.6,
      description: "Crisp and juicy apples from the finest orchards.",
      nutritionalInfo: "High in fiber and antioxidants",
      reviews: 155
    },
    {
      id: "5",
      name: "Organic Bananas",
      price: 60,
      image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224",
      category: "fruits",
      source: "Kerala Farms",
      quality: 4.3,
      description: "Naturally grown organic bananas, rich in potassium.",
      nutritionalInfo: "Excellent source of potassium and energy",
      reviews: 88
    },
    {
      id: "6",
      name: "Green Chilies",
      price: 20,
      image: "https://images.unsplash.com/photo-1588891557811-5f9464cf4c72",
      category: "vegetables",
      source: "Andhra Pradesh",
      quality: 4.1,
      description: "Spicy green chilies to add zest to your dishes.",
      nutritionalInfo: "Rich in Vitamin C and capsaicin",
      reviews: 62
    },
    {
      id: "7",
      name: "Fresh Carrots",
      price: 45,
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
      category: "vegetables",
      source: "Himachal Farms",
      quality: 4.4,
      description: "Sweet and crunchy carrots, perfect for salads.",
      nutritionalInfo: "Excellent source of beta-carotene",
      reviews: 112
    },
    {
      id: "8",
      name: "Organic Potatoes",
      price: 50,
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
      category: "vegetables",
      source: "Uttar Pradesh",
      quality: 4.0,
      description: "Versatile potatoes, organically grown and nutrient-rich.",
      nutritionalInfo: "Good source of carbohydrates and potassium",
      reviews: 75
    },
    {
      id: "9",
      name: "Fresh Mangoes",
      price: 200,
      image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716",
      category: "fruits",
      source: "Maharashtra Farms",
      quality: 4.7,
      description: "Juicy and flavorful mangoes, the king of fruits.",
      nutritionalInfo: "Rich in vitamins A and C",
      reviews: 180
    },
    {
      id: "10",
      name: "Organic Dal",
      price: 140,
      image: "https://images.unsplash.com/photo-1585996177123-8bbfa0449388",
      category: "staples",
      source: "Madhya Pradesh",
      quality: 4.5,
      description: "Protein-rich organic dal, essential for a balanced diet.",
      nutritionalInfo: "High in protein and fiber",
      reviews: 135
    },
    {
      id: "11",
      name: "Fresh Coconut",
      price: 45,
      image: "https://images.unsplash.com/photo-1581375074612-d1fd0e661aeb",
      category: "vegetables",
      source: "Tamil Nadu",
      quality: 4.2,
      description: "Fresh and tender coconut, perfect for hydration.",
      nutritionalInfo: "Source of electrolytes and healthy fats",
      reviews: 90
    },
    {
      id: "12",
      name: "Bell Peppers",
      price: 85,
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83",
      category: "vegetables",
      source: "Karnataka Farms",
      quality: 4.3,
      description: "Colorful bell peppers, packed with vitamins and flavor.",
      nutritionalInfo: "Rich in vitamins A and C",
      reviews: 105
    }
  ];

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < Math.floor(rating)
            ? "text-yellow-400"
            : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
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
              <div className="mt-4 flex items-center">
                <div className="flex mr-2">
                  {renderStars(product.quality)}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.reviews} {t("reviews")})
                </span>
              </div>
              <p className="mt-4 text-2xl text-gray-900">₹{product.price}</p>
              <div className="mt-4 space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">{t("Source")}:</span>{" "}
                  {product.source}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">{t("Description")}:</span>{" "}
                  {product.description}
                </p>
              </div>

              {/* Compact Nutrition Chart */}
              <div className="mt-4">
                <CompactNutritionChart 
                  nutrition={product.nutritionalInfo ? generateNutritionData({
                    ...product,
                    category: product.category
                  }) : generateNutritionData({
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
