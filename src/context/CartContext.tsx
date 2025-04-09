
import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  commissionFee: number; // Added commission fee
  finalTotal: number; // Added final total (including commission)
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

// Helper function to calculate commission and final total
const calculateTotals = (total: number) => {
  const commissionFee = Math.round(total * 0.02); // 2% commission rounded to nearest integer
  const finalTotal = total + commissionFee;
  return { commissionFee, finalTotal };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState;
  
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      let newTotal;
      
      if (existingItem) {
        newTotal = state.total + action.payload.price;
        newState = {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: newTotal,
        };
      } else {
        newTotal = state.total + action.payload.price;
        newState = {
          ...state,
          items: [...state.items, action.payload],
          total: newTotal,
        };
      }
      
      const { commissionFee, finalTotal } = calculateTotals(newTotal);
      return {
        ...newState,
        commissionFee,
        finalTotal
      };
    }
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      const itemTotal = itemToRemove ? itemToRemove.price * itemToRemove.quantity : 0;
      const newTotal = state.total - itemTotal;
      
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: newTotal,
      };
      
      const { commissionFee, finalTotal } = calculateTotals(newTotal);
      return {
        ...newState,
        commissionFee,
        finalTotal
      };
    }
    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item.id === action.payload.id);
      if (!item) return state;
      
      const quantityDiff = action.payload.quantity - item.quantity;
      const newTotal = state.total + (item.price * quantityDiff);
      
      newState = {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: newTotal,
      };
      
      const { commissionFee, finalTotal } = calculateTotals(newTotal);
      return {
        ...newState,
        commissionFee,
        finalTotal
      };
    }
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        commissionFee: 0,
        finalTotal: 0
      };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    commissionFee: 0,
    finalTotal: 0
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      parsedCart.items.forEach((item: CartItem) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
