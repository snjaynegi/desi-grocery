
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
  commissionFee?: number;
}

const OrderHistory = () => {
  const { t } = useTranslation();

  // In a real app, this would come from an API
  const orders: Order[] = [
    {
      id: "ORD-123",
      date: "2024-03-25",
      items: [
        { id: "1", name: "Fresh Tomatoes", quantity: 2, price: 40 },
        { id: "2", name: "Organic Onions", quantity: 1, price: 35 }
      ],
      total: 115,
      status: "Delivered",
      commissionFee: 2 // 2% of 115, rounded to nearest integer
    }
  ];

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

  // Calculate commission fee if not provided
  const getCommissionFee = (order: Order) => {
    return order.commissionFee || Math.round(order.total * 0.02);
  };

  // Calculate final total
  const getFinalTotal = (order: Order) => {
    return order.total + getCommissionFee(order);
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
          <div key={order.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-medium">
                  {t("Order")} #{order.id}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-sm mt-1 inline-block px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                  {order.status}
                </p>
              </div>
              <p className="text-lg font-semibold">₹{getFinalTotal(order)}</p>
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
              
              {/* Commission fee line */}
              <div className="flex justify-between text-sm text-gray-600">
                <span>{t("Commission Fee")} (2%)</span>
                <span>₹{getCommissionFee(order)}</span>
              </div>
              
              {/* Total line */}
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>{t("Total")}</span>
                <span>₹{getFinalTotal(order)}</span>
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
