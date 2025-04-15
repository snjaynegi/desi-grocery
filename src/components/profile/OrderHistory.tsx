
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Download, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string;
  commissionFee: number;
  finalTotal: number;
  paymentMethod: string;
}

const OrderHistory = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      try {
        // Fetch all transactions for the current user
        const { data: transactions, error: transactionError } = await supabase
          .from('transactions')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (transactionError) throw transactionError;
        
        // For each transaction, fetch its items
        const ordersWithItems = await Promise.all(
          transactions.map(async (transaction) => {
            const { data: items, error: itemsError } = await supabase
              .from('transaction_items')
              .select('*')
              .eq('transaction_id', transaction.id);
              
            if (itemsError) throw itemsError;
            
            return {
              id: transaction.id,
              date: transaction.created_at,
              total: transaction.total_amount,
              status: transaction.status,
              commissionFee: transaction.commission_fee,
              finalTotal: transaction.final_amount,
              paymentMethod: transaction.payment_method,
              items: items.map(item => ({
                id: item.product_id,
                name: item.product_name,
                quantity: item.quantity,
                price: item.price
              }))
            };
          })
        );
        
        setOrders(ordersWithItems);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(t("Failed to load orders"));
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [user, t]);

  const handleDownloadInvoice = (orderId: string) => {
    // In a real app, this would trigger a PDF download
    toast({
      title: t("Invoice downloaded"),
      description: t("Order") + ` #${orderId} ` + t("invoice has been downloaded"),
    });
  };

  const handleReorder = (order: Order) => {
    // In a real app, this would add items to cart
    toast({
      title: t("Items added to cart"),
      description: t("All items from order") + ` #${order.id} ` + t("have been added to your cart"),
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">{t("No orders found")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t("Order History")}</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-medium">
                  {t("Order")} #{order.id.substring(0, 8)}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-sm mt-1 inline-block px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                  {order.status}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {t("Payment")}: {order.paymentMethod}
                </p>
              </div>
              <p className="text-lg font-semibold">₹{order.finalTotal}</p>
            </div>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {t(item.name)} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              
              {/* Commission fee line */}
              <div className="flex justify-between text-sm text-gray-600">
                <span>{t("Commission Fee")} (2%)</span>
                <span>₹{order.commissionFee}</span>
              </div>
              
              {/* Total line */}
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>{t("Total")}</span>
                <span>₹{order.finalTotal}</span>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => handleReorder(order)}
                className="text-primary hover:text-primary/90 text-sm py-1 px-3 border border-primary/30 rounded-full hover:bg-primary/10 transition-colors"
                aria-label={t("Reorder items from order") + ` #${order.id}`}
              >
                {t("Reorder")}
              </button>
              <button
                onClick={() => handleDownloadInvoice(order.id)}
                className="text-primary hover:text-primary/90 flex items-center gap-1 text-sm py-1 px-3 border border-primary/30 rounded-full hover:bg-primary/10 transition-colors"
                aria-label={t("Download invoice for order") + ` #${order.id}`}
              >
                <Download className="w-3 h-3" />
                {t("Invoice")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
