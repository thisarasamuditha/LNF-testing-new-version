import "./global.css";
import { createContext, useContext, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Search from "./pages/Search";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import ItemDetail from "./pages/ItemDetail";
import MyItems from "./pages/MyItems";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import RequireAuth from "./pages/RequireAuth";
// Simple Auth Context for demo
export const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

const queryClient = new QueryClient();

function AuthProvider({ children }) {
  // Initialize from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        JSON.parse(user); // Validate JSON
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("user"); // Remove invalid data
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  // Show loading while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<Search />} />
            <Route path="/items/:id" element={<ItemDetail />} />
            <Route
              path="/my-items"
              element={
                <RequireAuth>
                  <MyItems />
                </RequireAuth>
              }
            />
            <Route
              path="/report-lost"
              element={
                <RequireAuth>
                  <ReportLost />
                </RequireAuth>
              }
            />
            <Route
              path="/report-found"
              element={
                <RequireAuth>
                  <ReportFound />
                </RequireAuth>
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
