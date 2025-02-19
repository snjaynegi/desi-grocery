
export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'paypal';
  lastFourDigits?: string;
  isDefault: boolean;
  expiryDate?: string;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    app: boolean;
  };
  dietary: string[];
  accessibility: {
    highContrast: boolean;
    screenReader: boolean;
    textSize: 'small' | 'medium' | 'large';
  };
  defaultDeliverySlot: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture?: string;
  addresses: Address[];
  preferredLanguage: string;
  paymentMethods: PaymentMethod[];
  walletBalance: number;
  membershipStatus: 'basic' | 'premium';
  loyaltyPoints: number;
  preferences: UserPreferences;
}
