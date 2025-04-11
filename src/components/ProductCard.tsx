
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Heart, ImageOff } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { t } = useTranslation();
  const { dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    cartDispatch({
      type: "ADD_ITEM",
      payload: { ...product, quantity: 1 },
    });
    toast({
      title: t("Item added to cart"),
      description: t(product.name),
    });
  };

  const handleToggleWishlist = () => {
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

  // Get fallback image based on category
  const getFallbackImage = () => {
    const fallbackImages = {
      vegetables: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
      fruits: "https://images.unsplash.com/photo-1560807707-8cc77767d783",
      staples: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f",
    };
    
    return fallbackImages[product.category as keyof typeof fallbackImages] || "/placeholder.svg";
  };
  
  // Function to check if an image URL is valid
  const isValidImageUrl = (url: string): boolean => {
    return url && (
      url.startsWith('https://images.unsplash.com/') || 
      url.startsWith('http://') || 
      url.startsWith('https://') || 
      url.startsWith('/')
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 animate-slideUp">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-gray-100">
          {imageError ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-100 text-gray-400">
              <ImageOff className="w-8 h-8 mb-2" />
              <span className="text-sm text-center">{t(product.name)}</span>
            </div>
          ) : (
            <img
              src={isValidImageUrl(product.image) ? product.image : getFallbackImage()}
              alt={t(product.name)}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-200"
              onError={(e) => {
                setImageError(true);
                // Try to load category-specific fallback image
                const target = e.target as HTMLImageElement;
                target.src = getFallbackImage();
                
                // If fallback fails, show placeholder
                target.onerror = () => {
                  target.onerror = null; // Prevent infinite loop
                  target.src = "/placeholder.svg";
                };
              }}
            />
          )}
        </div>
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="inline-block px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
            {t(product.category)}
          </div>
          <button
            onClick={handleToggleWishlist}
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
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {t(product.name)}
        </h3>
        <p className="text-gray-600">₹{product.price}</p>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
          {t("Add to Cart")}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
