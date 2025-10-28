import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { CartProvider } from "./contexts/CartContext";
import { LocalizationProvider } from "./contexts/LocalizationContext";
import "./styles/global.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <LocalizationProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
