
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/use-toast";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { type PaymentMethod } from "@/types/user";

const PaymentSettings = () => {
  const { t } = useTranslation();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const handleAddPayment = () => {
    // In a real app, this would open a payment method form
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: 'card',
      lastFourDigits: '1234',
      isDefault: paymentMethods.length === 0,
      expiryDate: '12/25',
    };
    setPaymentMethods([...paymentMethods, newMethod]);
    toast({
      title: t("Payment method added"),
      description: t("Your payment method has been added successfully"),
    });
  };

  const handleRemovePayment = (id: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
    toast({
      title: t("Payment method removed"),
      description: t("Your payment method has been removed successfully"),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t("Payment Methods")}</h2>
        <button
          onClick={handleAddPayment}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/90"
        >
          <Plus size={16} />
          {t("Add Payment Method")}
        </button>
      </div>

      {paymentMethods.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>{t("No payment methods added yet")}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="p-4 border rounded-lg flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">
                    **** **** **** {method.lastFourDigits}
                  </span>
                  {method.isDefault && (
                    <span className="text-sm text-gray-500">
                      ({t("Default")})
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {t("Expires")}: {method.expiryDate}
                </p>
              </div>
              <button
                onClick={() => handleRemovePayment(method.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentSettings;
