
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  createdAt: string;
  addresses?: Address[];
  preferences?: UserPreferences;
  loyaltyPoints?: number;
  membershipTier?: 'bronze' | 'silver' | 'gold';
  viewedProducts?: string[]; // IDs of products the user has viewed
  purchaseHistory?: PurchaseHistoryItem[];
  favoriteCategories?: string[];
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  label?: string; // Custom label for the address
  notes?: string; // Delivery instructions
  frequentDeliveryTimes?: { day: string; timeSlot: string }[]; // For smart defaults
}

export interface UserPreferences {
  theme?: 'light' | 'dark';
  language?: string;
  notifications?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  dietaryPreferences?: string[];
  recommendationsEnabled?: boolean;
  autoReorderEnabled?: boolean;
}

export interface PurchaseHistoryItem {
  orderId: string;
  date: string;
  products: {
    productId: string;
    quantity: number;
  }[];
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  lastFourDigits: string;
  expiryDate?: string;
  isDefault: boolean;
  cardType?: 'visa' | 'mastercard' | 'amex' | 'discover';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  tags?: string[];
  description?: string;
  origin?: string;
  inStock?: boolean;
  quantity?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: Address;
  paymentMethod: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
}
