
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import "./i18n/config";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import OrderHistory from "./pages/OrderHistory";
import Grievance from "./pages/Grievance";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

// Create a new QueryClient instance for the application
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CartProvider>
          <WishlistProvider>
            <ThemeProvider>
              <AuthProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route
                        path="/cart"
                        element={
                          <PrivateRoute>
                            <Cart />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/wishlist"
                        element={
                          <PrivateRoute>
                            <Wishlist />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/orders"
                        element={
                          <PrivateRoute>
                            <OrderHistory />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/grievance"
                        element={
                          <PrivateRoute>
                            <Grievance />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/profile"
                        element={
                          <PrivateRoute>
                            <Profile />
                          </PrivateRoute>
                        }
                      />
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </React.Suspense>
                </TooltipProvider>
              </AuthProvider>
            </ThemeProvider>
          </WishlistProvider>
        </CartProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
