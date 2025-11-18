// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import FavoritesPage from "./pages/Favorites.jsx";
import NotificationsPage from "./pages/Notifications.jsx";
import ProfilePage from "./pages/Profile.jsx";
import CartPage from "./pages/Cart.jsx";
import OrdersPage from "./pages/Orders.jsx";
import TryOnPage from "./pages/TryOn.jsx";
import BottomNav from "./components/BottomNav.jsx";

function App() {
  return (
    <div className="min-h-screen bg-[#F5F5F8] flex justify-center">
      <div className="w-full max-w-sm bg-[#F5F5F8] relative">
        <div className="pb-14">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/favoritos" element={<FavoritesPage />} />
            <Route path="/notificaciones" element={<NotificationsPage />} />
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/probador" element={<TryOnPage />} />
          </Routes>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

export default App;
