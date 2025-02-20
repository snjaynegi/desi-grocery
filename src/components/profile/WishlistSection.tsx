
import { useTranslation } from "react-i18next";
import { useWishlist } from "../../context/WishlistContext";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { toast } from "@/components/ui/use-toast";

const WishlistSection = () => {
  const { t } = useTranslation();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();

  const handleAddToCart = (product: any) => {
    cartDispatch({
      type: "ADD_ITEM",
      payload: { ...product, quantity: 1 },
    });
    toast({
      title: t("Item added to cart"),
      description: t(product.name),
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    wishlistDispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: productId,
    });
    toast({
      title: t("Item removed from wishlist"),
      description: t("The item has been removed from your wishlist"),
    });
  };

  if (wishlistState.items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">{t("Your wishlist is empty")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {wishlistState.items.map((item) => (
        <div
          key={item.id}
          className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          <img
            src={item.image}
            alt={t(item.name)}
            className="w-full aspect-square object-cover"
          />
          <div className="p-4">
            <h3 className="font-medium">{t(item.name)}</h3>
            <p className="text-gray-600">₹{item.price}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleAddToCart(item)}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                {t("Add to Cart")}
              </button>
              <button
                onClick={() => handleRemoveFromWishlist(item.id)}
                className="p-2 text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistSection;
