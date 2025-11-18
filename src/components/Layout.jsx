// src/components/Layout.jsx
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "./BottomNav.jsx";

const EDGE_THRESHOLD = 40;
const SWIPE_MIN_DISTANCE = 40;
const SWIPE_MAX_VERTICAL = 60;

function Layout({ children }) {
  const navigate = useNavigate();
  const touchRef = useRef(null);
  const [isBackAnimating, setIsBackAnimating] = useState(false);

  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];

    if (t.clientX <= EDGE_THRESHOLD) {
      touchRef.current = {
        startX: t.clientX,
        startY: t.clientY,
        active: true,
        navigated: false,
      };
    } else {
      touchRef.current = null;
    }
  };

  const handleTouchMove = (e) => {
    const state = touchRef.current;
    if (!state || !state.active || state.navigated || isBackAnimating) return;
    if (e.touches.length !== 1) return;

    const t = e.touches[0];
    const dx = t.clientX - state.startX;
    const dy = Math.abs(t.clientY - state.startY);

    if (dx > SWIPE_MIN_DISTANCE && dy < SWIPE_MAX_VERTICAL) {
      state.navigated = true;
      setIsBackAnimating(true);
      try {
        e.preventDefault();
      } catch {}
      // Espera un poquito para que se vea el slide y luego navega
      setTimeout(() => {
        navigate(-1);
        setIsBackAnimating(false);
      }, 220);
    }
  };

  const handleTouchEnd = () => {
    touchRef.current = null;
  };

  return (
    <div className="min-h-screen bg-[#F2F2F6] flex justify-center items-stretch">
      {/* Contenedor tipo teléfono */}
      <div
        className={`w-full max-w-sm h-screen bg-white flex flex-col transform transition-transform duration-200 ease-out ${
          isBackAnimating ? "translate-x-full" : "translate-x-0"
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Solo el main scrollea */}
        <main className="flex-1 overflow-y-auto pb-16">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}

export default Layout;
