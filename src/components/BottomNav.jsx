// src/components/BottomNav.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function IconHome({ active }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "#111111" : "#B0B0B5"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 11L12 3l9 8" />
      <path d="M5 10.8V20h14v-9.2" />
    </svg>
  );
}

function IconCart({ active }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "#111111" : "#B0B0B5"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5h2l1 11h10l1-8H7" />
      <circle cx="9" cy="19" r="1" />
      <circle cx="17" cy="19" r="1" />
    </svg>
  );
}

function IconOrders({ active }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "#111111" : "#B0B0B5"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="4" width="12" height="16" rx="2" />
      <path d="M9 9h6M9 13h4" />
    </svg>
  );
}

function IconWallet({ active }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "#111111" : "#B0B0B5"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Ícono de percha (hanger) simplificado */}
      <path d="M12 6c0-1.1.9-2 2-2s2 .9 2 2-1 2-2 2v2" />
      <path d="M3 18l9-6 9 6H3Z" />
    </svg>
  );
}

function IconProfile({ active }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "#111111" : "#B0B0B5"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="9" r="3" />
      <path d="M6 19c1.2-2.4 3.1-3.5 6-3.5s4.8 1.1 6 3.5" />
    </svg>
  );
}

const items = [
  { id: "home", label: "Inicio", icon: IconHome, route: "/" },
  { id: "cart", label: "Carrito", icon: IconCart, route: "/cart" },
  { id: "orders", label: "Pedidos", icon: IconOrders, route: "/orders" },
  { id: "tryon", label: "Probador", icon: IconWallet, route: "/probador" },
  { id: "profile", label: "Perfil", icon: IconProfile, route: "/perfil" },
];

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="h-14 border-t border-[#E4E4EA] bg-white flex items-center justify-around px-2 fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm">
      {items.map((item) => {
        const active =
          item.route === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(item.route);
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.route)}
            className="flex flex-col items-center justify-center gap-0.5 flex-1"
          >
            <Icon active={active} />
            <span
              className={`text-[10px] ${
                active ? "text-[#111111]" : "text-[#B0B0B5]"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNav;
