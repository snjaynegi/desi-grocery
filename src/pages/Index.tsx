
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Heart } from "lucide-react";

const Index = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const [searchQuery, setSearchQuery] = useState("");

  const dummyProducts = [
    {
      id: "1",
      name: "Fresh Tomatoes",
      price: 40,
      image: "https://images.unsplash.com/photo-1546470427-701d9e4d7b1f",
      category: "vegetables",
    },
    {
      id: "2",
      name: "Organic Onions",
      price: 35,
      image: "https://images.unsplash.com/photo-1508747703725-719777637510",
      category: "vegetables",
    },
    {
      id: "3",
      name: "Basmati Rice",
      price: 120,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
      category: "staples",
    },
    {
      id: "4",
      name: "Fresh Apples",
      price: 180,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
      category: "fruits",
    },
    {
      id: "5",
      name: "Organic Bananas",
      price: 60,
      image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224",
      category: "fruits",
    },
    {
      id: "6",
      name: "Green Chilies",
      price: 20,
      image: "https://images.unsplash.com/photo-1588891557811-5f9464cf4c72",
      category: "vegetables",
    },
    {
      id: "7",
      name: "Fresh Carrots",
      price: 45,
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
      category: "vegetables",
    },
    {
      id: "8",
      name: "Organic Potatoes",
      price: 50,
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
      category: "vegetables",
    },
    {
      id: "9",
      name: "Fresh Mangoes",
      price: 200,
      image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716",
      category: "fruits",
    },
    {
      id: "10",
      name: "Organic Dal",
      price: 140,
      image: "https://images.unsplash.com/photo-1585996177123-8bbfa0449388",
      category: "staples",
    },
    {
      id: "11",
      name: "Fresh Coconut",
      price: 45,
      image: "https://images.unsplash.com/photo-1581375074612-d1fd0e661aeb",
      category: "vegetables",
    },
    {
      id: "12",
      name: "Bell Peppers",
      price: 85,
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83",
      category: "vegetables",
    }
  ];

  const filteredProducts = dummyProducts.filter((product) =>
    t(product.name).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product: any) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { ...product, quantity: 1 },
    });
    toast({
      title: t("Item added to cart"),
      description: t(product.name),
    });
  };

  const handleToggleWishlist = (product: any) => {
    const isInWishlist = wishlistState.items.some(item => item.id === product.id);
    
    if (isInWishlist) {
      wishlistDispatch({
        type: "REMOVE_FROM_WISHLIST",
        payload: product.id,
      });
      toast({
        title: t("Removed from wishlist"),
        description: t(product.name),
      });
    } else {
      wishlistDispatch({
        type: "ADD_TO_WISHLIST",
        payload: product,
      });
      toast({
        title: t("Added to wishlist"),
        description: t(product.name),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header showSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 animate-slideUp"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={t(product.name)}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-200"
                  />
                </div>
              </Link>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="inline-block px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                    {t(product.category)}
                  </div>
                  <button
                    onClick={() => handleToggleWishlist(product)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 ${
                        wishlistState.items.some(item => item.id === product.id)
                          ? "fill-red-500 text-red-500 scale-110"
                          : ""
                      }`}
                    />
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t(product.name)}
                </h3>
                <p className="text-gray-600">₹{product.price}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200"
                >
                  {t("Add to Cart")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
