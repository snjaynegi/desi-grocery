
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "../context/AuthContext";

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
  paymentMethod: string;
  commissionFee: number;
  finalTotal: number;
}

const OrderHistory = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [year, setYear] = useState<string>("all");
  const [month, setMonth] = useState<string>("all");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const years = ["2024", "2023", "2022"];
  const months = [
    "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12"
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
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
              paymentMethod: transaction.payment_method,
              commissionFee: transaction.commission_fee,
              finalTotal: transaction.final_amount,
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
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [user]);

  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.date);
    const matchesYear = year === "all" || orderDate.getFullYear().toString() === year;
    const matchesMonth = month === "all" || (orderDate.getMonth() + 1).toString().padStart(2, '0') === month;
    return matchesYear && matchesMonth;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{t("Order History")}</h1>

        <div className="flex gap-4 mb-6">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder={t("Year")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("All Years")}</SelectItem>
              {years.map(y => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder={t("Month")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("All Months")}</SelectItem>
              {months.map(m => (
                <SelectItem key={m} value={m}>
                  {new Date(2000, parseInt(m) - 1).toLocaleString('default', { month: 'long' })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">{t("No orders found for the selected period")}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold">{t("Order")} #{order.id.substring(0, 8)}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{order.finalTotal}</p>
                    <p className="text-sm text-green-600">{order.status}</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-2">
                    {t("Payment Method")}: {order.paymentMethod}
                  </p>
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{t(item.name)} × {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  
                  {/* Commission fee display */}
                  <div className="flex justify-between text-sm mt-2 text-gray-600">
                    <span>{t("Commission Fee")} (2%)</span>
                    <span>₹{order.commissionFee}</span>
                  </div>
                  
                  <div className="flex justify-between font-semibold mt-2 pt-2 border-t">
                    <span>{t("Final Total")}</span>
                    <span>₹{order.finalTotal}</span>
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

export default OrderHistory;
