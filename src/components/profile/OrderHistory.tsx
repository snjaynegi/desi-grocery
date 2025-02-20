
import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

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
}

const OrderHistory = () => {
  const { t } = useTranslation();

  const orders: Order[] = []; // In a real app, this would come from an API

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
          <div key={order.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-medium">
                  {t("Order")} #{order.id}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <p className="text-lg font-semibold">₹{order.total}</p>
            </div>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => handleReorder(order)}
                className="text-primary hover:text-primary/90"
                aria-label={t("Reorder items from order") + ` #${order.id}`}
              >
                {t("Reorder")}
              </button>
              <button
                onClick={() => handleDownloadInvoice(order.id)}
                className="text-primary hover:text-primary/90 flex items-center gap-1"
                aria-label={t("Download invoice for order") + ` #${order.id}`}
              >
                <Download className="w-4 h-4" />
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
