import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { MotionConfig } from "framer-motion";

import App from "./App";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Checkout from "./pages/Checkout";
import Collections from "./pages/Collections";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { CartProvider } from "./contexts/CartContext";
import { LocalizationProvider } from "./contexts/LocalizationContext";
import "./styles/global.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <LocalizationProvider>
        <AdminAuthProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/collections" element={<Collections />} />
                <Route element={<ProtectedAdminRoute />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </AdminAuthProvider>
      </LocalizationProvider>
    </MotionConfig>
  </React.StrictMode>
);
