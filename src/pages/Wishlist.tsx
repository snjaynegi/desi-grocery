
import { useTranslation } from "react-i18next";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { toast } from "@/components/ui/use-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ShoppingCart, Trash2 } from "lucide-react";

const Wishlist = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">{t("My Wishlist")}</h1>
        {wishlistState.items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">{t("Your wishlist is empty")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistState.items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={t(item.name)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="inline-block px-2 py-1 mb-2 text-xs font-medium text-primary bg-primary/10 rounded-full">
                    {t(item.category)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t(item.name)}
                  </h3>
                  <p className="text-gray-600">₹{item.price}</p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {t("Add to Cart")}
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="p-2 text-red-500 hover:text-red-600 transition-colors duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
