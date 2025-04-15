import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ImageOff, RotateCcw } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

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
  const navigate = useNavigate();
  const { dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const [imageError, setImageError] = useState(false);
  const supabase = useSupabaseClient();
  
  useEffect(() => {
    const recordProductView = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('viewedProducts')
            .eq('id', session.user.id)
            .single();
            
          if (userError && userError.code !== 'PGRST116') {
            console.error('Error fetching user viewed products:', userError);
            return;
          }
          
          const viewedProducts = userData?.viewedProducts || [];
          
          const filteredProducts = viewedProducts.filter(id => id !== product.id);
          
          const updatedViewedProducts = [product.id, ...filteredProducts].slice(0, 20);
          
          const { error: updateError } = await supabase
            .from('users')
            .update({ viewedProducts: updatedViewedProducts })
            .eq('id', session.user.id);
            
          if (updateError) {
            console.error('Error updating viewed products:', updateError);
          }
        }
      } catch (error) {
        console.error('Error recording product view:', error);
      }
    };
    
    recordProductView();
  }, [product.id, supabase]);

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (!isLoggedIn) {
      toast({
        title: t("Please sign in"),
        description: t("Sign in to add items to your cart"),
        variant: "destructive",
      });
      return;
    }
    
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
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (!isLoggedIn) {
      toast({
        title: t("Please sign in"),
        description: t("Sign in to add items to your wishlist"),
        variant: "destructive",
      });
      return;
    }
    
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

  const getFallbackImage = () => {
    const fallbackImages = {
      vegetables: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
      fruits: "https://images.unsplash.com/photo-1560807707-8cc77767d783",
      staples: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f",
    };
    
    return fallbackImages[product.category as keyof typeof fallbackImages] || "/placeholder.svg";
  };
  
  const isValidImageUrl = (url: string): boolean => {
    return url && (
      url.startsWith('https://images.unsplash.com/') || 
      url.startsWith('http://') || 
      url.startsWith('https://') || 
      url.startsWith('/')
    );
  };

  const handleQuickReorder = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        return;
      }
      
      const { data: userData } = await supabase
        .from('users')
        .select('purchaseHistory')
        .eq('id', session.user.id)
        .single();
        
      if (!userData?.purchaseHistory?.length) {
        return;
      }
      
      const hasOrderedBefore = userData.purchaseHistory.some(
        order => order.products.some(p => p.productId === product.id)
      );
      
      if (hasOrderedBefore) {
        cartDispatch({
          type: "ADD_ITEM",
          payload: { ...product, quantity: 1 },
        });
        
        toast({
          title: t("Re-ordered!"),
          description: t("Item added to cart from your previous orders"),
        });
      }
    } catch (error) {
      console.error('Error with quick reorder:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 animate-slideUp">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-gray-100 relative">
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
                const target = e.target as HTMLImageElement;
                target.src = getFallbackImage();
                
                target.onerror = () => {
                  target.onerror = null;
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
          <div className="flex gap-1">
            <button
              onClick={handleQuickReorder}
              className="text-gray-400 hover:text-primary transition-colors duration-300 p-1"
              aria-label={t("Quick reorder")}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleToggleWishlist}
              className="text-gray-400 hover:text-red-500 transition-colors duration-300"
              aria-label={t("Toggle wishlist")}
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
