
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Home, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "../context/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Cart = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: "REMOVE_ITEM", payload: id });
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    }
  };

  const saveTransaction = async () => {
    if (!user) {
      toast({
        title: t("Authentication required"),
        description: t("Please sign in to complete your purchase"),
        variant: "destructive",
      });
      navigate("/login");
      return false;
    }

    try {
      // Insert transaction record
      const { data: transactionData, error: transactionError } = await supabase
        .from("transactions")
        .insert({
          user_id: user.id,
          total_amount: state.total,
          commission_fee: state.commissionFee,
          final_amount: state.finalTotal,
          payment_method: paymentMethod,
        })
        .select("id")
        .single();

      if (transactionError) {
        console.error("Transaction error:", transactionError);
        return false;
      }

      // Insert transaction items
      const transactionItemsData = state.items.map(item => ({
        transaction_id: transactionData.id,
        product_id: item.id,
        product_name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }));

      const { error: itemsError } = await supabase
        .from("transaction_items")
        .insert(transactionItemsData);

      if (itemsError) {
        console.error("Transaction items error:", itemsError);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error saving transaction:", error);
      return false;
    }
  };

  const handleCheckout = async () => {
    if (!paymentMethod) {
      toast({
        title: t("Select payment method"),
        description: t("Please select a payment method to continue"),
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Save transaction to database
    const success = await saveTransaction();
    
    if (success) {
      // Show success message
      toast({
        title: t("Order placed successfully"),
        description: t("Thank you for your purchase!"),
      });

      // Clear cart and redirect to orders
      dispatch({ type: "CLEAR_CART" });
      navigate("/orders");
    } else {
      toast({
        title: t("Checkout failed"),
        description: t("There was an error processing your order. Please try again."),
        variant: "destructive",
      });
    }
    
    setIsProcessing(false);
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("Your cart is empty")}
          </h2>
          <p className="text-gray-600 mb-8">{t("Add some items to get started")}</p>
          <Link
            to="/"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t("Continue Shopping")}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t("Cart")}</h1>
          <Link 
            to="/" 
            className="flex items-center text-primary hover:text-primary/90 transition-colors"
          >
            <Home className="mr-1" size={20} />
            {t("Home")}
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 space-y-4">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 py-4 last:border-0"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={t(item.name)}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t(item.name)}
                    </h3>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded">
                    <button
                      className="px-3 py-1 hover:bg-gray-100"
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border-x">{item.quantity}</span>
                    <button
                      className="px-3 py-1 hover:bg-gray-100"
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_ITEM", payload: item.id })
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    {t("Remove")}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("Payment Method")}
              </label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="bg-white dark:bg-gray-800">
                  <SelectValue placeholder={t("Select payment method")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cod">{t("Cash on Delivery")}</SelectItem>
                  <SelectItem value="upi">{t("UPI")}</SelectItem>
                  <SelectItem value="netbanking">{t("Net Banking")}</SelectItem>
                  <SelectItem value="card">{t("Debit/Credit Card")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t("Subtotal")}</span>
                <span className="font-medium">₹{state.total}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>{t("Commission Fee")} (2%)</span>
                <span>₹{state.commissionFee}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-lg font-semibold">{t("Total")}</span>
                <span className="text-2xl font-bold text-green-700">₹{state.finalTotal}</span>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-green-700 text-white px-6 py-4 rounded-lg hover:bg-green-800 transition-colors font-medium text-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t("Processing...")}
                </div>
              ) : (
                t("Proceed to Checkout")
              )}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
