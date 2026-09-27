import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import CheckoutPage from "./pages/CheckoutPage";

export default function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/shop" element={<ShopPage />} />

        <Route
          path="/products/:documentId"
          element={<ProductPage />}
        />

        <Route path="/cart" element={<CartPage />} />

        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />
        <Route path="/about" element={<AboutPage />} />
        
      </Routes>

      <Footer />
    </div>
  );
}