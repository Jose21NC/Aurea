import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { currentUser } from "../data/user.jsx";

function CartIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path
        d="M6 7h12l-1 11H7L6 7Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 10V6.5A3.5 3.5 0 0 1 12.5 3h0A3.5 3.5 0 0 1 16 6.5V10" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return open ? (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
    </svg>
  ) : (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
    </svg>
  );
}

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isSellerRoute = location.pathname.startsWith("/vendedor");

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-zinc-100">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Logo / Nombre */}
        <button
          onClick={() => {
            navigate("/");
            setIsMenuOpen(false);
          }}
          className="flex items-center gap-2 group"
        >
          <div className="h-9 w-9 rounded-2xl bg-black text-amber-300 flex items-center justify-center text-xs font-bold shadow-sm group-hover:scale-105 transition-transform">
            AU
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold tracking-tight text-zinc-900">
              Aurea
            </span>
            <span className="text-[11px] text-zinc-500">
              Moda nicaragüense online
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-3">
          {/* Toggle comprador / vendedor */}
          <div className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 p-1 text-xs">
            <button
              onClick={() => navigate("/")}
              className={`px-3 py-1 rounded-full transition-colors ${
                !isSellerRoute
                  ? "bg-black text-amber-200"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              Comprador
            </button>
            <button
              onClick={() => navigate("/vendedor")}
              className={`px-3 py-1 rounded-full transition-colors ${
                isSellerRoute
                  ? "bg-black text-amber-200"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              Vendedor
            </button>
          </div>

          {/* Cart */}
          <button
            onClick={() => alert("Carrito próximamente")}
            className="relative p-2 rounded-full bg-white border border-zinc-200 hover:border-amber-400 hover:shadow-sm transition"
          >
            <CartIcon />
            <span className="absolute -top-1 -right-0.5 text-[10px] bg-amber-400 text-black rounded-full px-1">
              0
            </span>
          </button>

          {/* Usuario */}
          <button
            onClick={() => navigate("/perfil")}
            className="flex items-center gap-2 px-2 py-1 rounded-full bg-white border border-zinc-200 hover:border-amber-400 hover:shadow-sm transition"
          >
            <div className="h-8 w-8 rounded-full bg-amber-200 flex items-center justify-center text-xs font-semibold text-black">
              J
            </div>
            <span className="text-xs text-zinc-700">{currentUser.nombre}</span>
          </button>
        </div>

        {/* Mobile: cart + avatar + hamburguesa */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => alert("Carrito próximamente")}
            className="relative p-2 rounded-full bg-white border border-zinc-200 hover:border-amber-400 transition"
          >
            <CartIcon />
          </button>

          <button
            onClick={() => navigate("/perfil")}
            className="h-8 w-8 rounded-full bg-amber-200 flex items-center justify-center text-xs font-semibold text-black"
          >
            J
          </button>

          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="p-2 rounded-full bg-white border border-zinc-200 hover:border-amber-400 transition"
          >
            <MenuIcon open={isMenuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2 text-sm">
            <div className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 p-1 text-xs w-max">
              <button
                onClick={() => {
                  navigate("/");
                  setIsMenuOpen(false);
                }}
                className={`px-3 py-1 rounded-full transition-colors ${
                  !isSellerRoute
                    ? "bg-black text-amber-200"
                    : "text-zinc-600 hover:text-black"
                }`}
              >
                Comprador
              </button>
              <button
                onClick={() => {
                  navigate("/vendedor");
                  setIsMenuOpen(false);
                }}
                className={`px-3 py-1 rounded-full transition-colors ${
                  isSellerRoute
                    ? "bg-black text-amber-200"
                    : "text-zinc-600 hover:text-black"
                }`}
              >
                Vendedor
              </button>
            </div>

            <button
              onClick={() => {
                navigate("/login");
                setIsMenuOpen(false);
              }}
              className="text-xs text-zinc-700"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => {
                navigate("/registro");
                setIsMenuOpen(false);
              }}
              className="text-xs text-zinc-700"
            >
              Crear cuenta
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default NavBar;
