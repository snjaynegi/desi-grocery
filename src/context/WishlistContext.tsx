
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface WishlistState {
  items: WishlistItem[];
}

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; payload: WishlistItem }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'RESTORE_WISHLIST'; payload: WishlistState };

// Create context
const WishlistContext = createContext<{
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
} | null>(null);

// Reducer function
const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      if (state.items.some(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: []
      };
    case 'RESTORE_WISHLIST':
      return action.payload;
    default:
      return state;
  }
};

// Provider component
export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  // Function to restore wishlist from localStorage
  const restoreWishlistFromLocalStorage = () => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        dispatch({ type: 'RESTORE_WISHLIST', payload: parsedWishlist });
      } catch (error) {
        console.error('Failed to restore wishlist from localStorage:', error);
      }
    }
  };

  // Listen for auth state changes to restore wishlist
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        restoreWishlistFromLocalStorage();
      } else if (event === 'SIGNED_OUT') {
        dispatch({ type: 'CLEAR_WISHLIST' });
      }
    });

    // Check if user is already signed in and restore wishlist
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        restoreWishlistFromLocalStorage();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state));
  }, [state]);

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook for using this context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
