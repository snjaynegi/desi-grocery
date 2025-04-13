
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/use-toast";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { type PaymentMethod } from "@/types/user";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const PaymentSettings = () => {
  const { t } = useTranslation();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCardDetails, setNewCardDetails] = useState({
    cardType: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const handleAddPaymentClick = () => {
    setIsDialogOpen(true);
  };

  const handleSubmitCardDetails = () => {
    // Basic validation
    if (!newCardDetails.cardType || !newCardDetails.cardNumber || !newCardDetails.expiryDate) {
      toast({
        title: t("Missing Information"),
        description: t("Please fill in all required fields"),
        variant: "destructive",
      });
      return;
    }

    // Format card number to only show last 4 digits
    const lastFourDigits = newCardDetails.cardNumber.slice(-4);
    
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: 'card',
      cardType: newCardDetails.cardType as 'visa' | 'mastercard' | 'amex' | 'discover',
      lastFourDigits: lastFourDigits,
      isDefault: paymentMethods.length === 0,
      expiryDate: newCardDetails.expiryDate,
    };
    
    setPaymentMethods([...paymentMethods, newMethod]);
    setIsDialogOpen(false);
    
    // Reset form
    setNewCardDetails({
      cardType: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
    });
    
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
          onClick={handleAddPaymentClick}
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
                    {method.cardType && method.cardType.toUpperCase()} **** **** **** {method.lastFourDigits}
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
      
      {/* Card details dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("Add Payment Method")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="card-type" className="text-sm font-medium">
                {t("Card Type")}
              </label>
              <Select 
                value={newCardDetails.cardType} 
                onValueChange={(value) => setNewCardDetails({...newCardDetails, cardType: value})}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("Select card type")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visa">Visa</SelectItem>
                  <SelectItem value="mastercard">Mastercard</SelectItem>
                  <SelectItem value="amex">American Express</SelectItem>
                  <SelectItem value="discover">Discover</SelectItem>
                  <SelectItem value="rupay">RuPay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="card-number" className="text-sm font-medium">
                {t("Card Number")}
              </label>
              <Input 
                id="card-number" 
                placeholder="**** **** **** ****" 
                value={newCardDetails.cardNumber}
                onChange={(e) => setNewCardDetails({...newCardDetails, cardNumber: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="expiry-date" className="text-sm font-medium">
                  {t("Expiry Date")}
                </label>
                <Input 
                  id="expiry-date" 
                  placeholder="MM/YY" 
                  value={newCardDetails.expiryDate}
                  onChange={(e) => setNewCardDetails({...newCardDetails, expiryDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="cvv" className="text-sm font-medium">
                  {t("CVV")}
                </label>
                <Input 
                  id="cvv" 
                  placeholder="***" 
                  value={newCardDetails.cvv}
                  onChange={(e) => setNewCardDetails({...newCardDetails, cvv: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="cardholder-name" className="text-sm font-medium">
                {t("Cardholder Name")}
              </label>
              <Input 
                id="cardholder-name" 
                placeholder="Name on card" 
                value={newCardDetails.cardholderName}
                onChange={(e) => setNewCardDetails({...newCardDetails, cardholderName: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              {t("Cancel")}
            </Button>
            <Button onClick={handleSubmitCardDetails}>
              {t("Add Card")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentSettings;
