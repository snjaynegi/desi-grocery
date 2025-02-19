
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  paymentMethod: string;
}

const OrderHistory = () => {
  const { t } = useTranslation();
  const [year, setYear] = useState<string>("all");  // Changed from "" to "all"
  const [month, setMonth] = useState<string>("all"); // Changed from "" to "all"

  // Mock orders data - in a real app, this would come from an API
  const orders: Order[] = [
    {
      id: "1",
      date: "2024-03-15",
      total: 500,
      status: "Delivered",
      items: [
        { id: "1", name: "Fresh Tomatoes", quantity: 2, price: 40 },
        { id: "2", name: "Organic Onions", quantity: 1, price: 35 }
      ],
      paymentMethod: "UPI"
    },
    // Add more mock orders as needed
  ];

  const years = ["2024", "2023", "2022"];
  const months = [
    "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12"
  ];

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

        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-semibold">{t("Order")} #{order.id}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{order.total}</p>
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
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistory;
