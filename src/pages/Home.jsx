import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../data/user.jsx";
import {
  getAllProducts,
  getPersonalizedProductsForCurrentUser,
} from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

const pillFilters = [
  { id: "all", label: "Todo" },
  { id: "camisetas", label: "Camisetas" },
  { id: "vestidos", label: "Vestidos" },
  { id: "zapatos", label: "Zapatos" },
  { id: "ofertas", label: "Ofertas" },
];

const circleCategories = [
  { id: "camisetas", label: "Camisetas", icon: "👕" },
  { id: "vestidos", label: "Vestidos", icon: "👗" },
  { id: "pantalones", label: "Pantalones", icon: "👖" },
  { id: "zapatos", label: "Zapatos", icon: "👟" },
  { id: "accesorios", label: "Accesorios", icon: "👜" },
  { id: "deportivo", label: "Deportivo", icon: "🏃‍♂️" },
  { id: "outerwear", label: "Abrigos", icon: "🧥" },
  { id: "basicos", label: "Básicos", icon: "🧦" },
];

function clasificarProducto(producto) {
  const nombre = producto.nombre.toLowerCase();

  if (nombre.includes("camisa") || nombre.includes("blusa")) {
    return "camisetas";
  }
  if (nombre.includes("vestido")) {
    return "vestidos";
  }
  if (nombre.includes("jeans") || nombre.includes("pantalón")) {
    return "pantalones";
  }
  if (nombre.includes("tenis") || nombre.includes("zapato")) {
    return "zapatos";
  }
  if (nombre.includes("bolso") || nombre.includes("collar")) {
    return "accesorios";
  }
  if (nombre.includes("hoodie") || nombre.includes("chaqueta")) {
    return "outerwear";
  }

  return "basicos";
}

function filtrarProductos(base, filtro) {
  if (filtro === "all") return base;
  if (filtro === "ofertas") return base.filter((p) => p.tieneDescuento);
  return base.filter((p) => clasificarProducto(p) === filtro);
}

function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [bannerIndex, setBannerIndex] = useState(0);
  const navigate = useNavigate();

  const all = getAllProducts();
  const personalized = getPersonalizedProductsForCurrentUser();
  const base = personalized.length ? personalized : all;

  const ofertas = all.filter((p) => p.tieneDescuento);
  const productoOferta = ofertas[0] ?? all[0];

  const carruselItems = [
    {
      id: "slide-1",
      tipo: "texto",
      porcentaje: 30,
      titulo: "Especial de hoy",
      descripcion: "Descuento en tus prendas favoritas, solo por hoy.",
      imageUrl:
        productoOferta?.imagenUrl ||
        "https://picsum.photos/seed/aurea1/300/220",
    },
    {
      id: "slide-2",
      tipo: "imagen",
      porcentaje: 25,
      titulo: "Colección urbana",
      descripcion: "Looks urbanos con envío incluido.",
      imageUrl: "https://picsum.photos/seed/aurea-urbano/400/260",
    },
    {
      id: "slide-3",
      tipo: "texto",
      porcentaje: 15,
      titulo: "Vestidos de fin de semana",
      descripcion:
        "Outfits listos para salir, según tu talla guardada en Aurea.",
      imageUrl: "https://picsum.photos/seed/aurea3/300/220",
    },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % carruselItems.length);
    }, 5000);
    return () => clearInterval(id);
  }, [carruselItems.length]);

  const banner = carruselItems[bannerIndex];
  const filtrados = filtrarProductos(base, activeFilter);
  const productosParaMostrar = [...filtrados, ...all].slice(0, 8);

  return (
    <div className="pt-4 px-4 space-y-6">
      {/* HEADER */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[11px] text-[#A4A4AE]">Buenos días 👋</p>
            <h1 className="text-base font-semibold text-[#111111]">
              {currentUser.nombre || "José"}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Favoritos */}
            <button
              className="h-8 w-8 flex items-center justify-center rounded-full bg-white border border-[#E4E4EA] text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
              onClick={() => navigate("/favoritos")}
            >
              ♡
            </button>
            {/* Notificaciones */}
            <button
              className="h-8 w-8 flex items-center justify-center rounded-full bg-white border border-[#E4E4EA] text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
              onClick={() => navigate("/notificaciones")}
            >
              🔔
            </button>
            {/* Perfil */}
            <button
              className="h-9 w-9 rounded-full bg-[#111111] text-white text-xs font-semibold flex items-center justify-center"
              onClick={() => navigate("/perfil")}
            >
              J
            </button>
          </div>
        </div>

        {/* BUSCADOR */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white border border-[#E4E4EA] shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
          <span className="text-[#A4A4AE] text-lg">🔍</span>
          <input
            type="text"
            placeholder="Buscar prendas o tiendas..."
            className="w-full text-xs outline-none bg-transparent text-[#111111] placeholder:text-[#B9B9C3]"
          />
          <button className="h-8 w-8 flex items-center justify-center rounded-xl bg-[#F4F4F7] text-[#9696A1] text-lg">
            ⋯
          </button>
        </div>
      </section>

      {/* OFERTAS ESPECIALES (CARRUSEL) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#111111]">
            Ofertas especiales
          </h2>
          <button className="text-[11px] text-[#9696A1]">Ver todo</button>
        </div>

        {banner.tipo === "imagen" ? (
          <div className="rounded-3xl bg-white border border-[#E4E4EA] shadow-[0_8px_30px_rgba(0,0,0,0.10)] overflow-hidden">
            <div className="relative h-32 xs:h-40 sm:h-44 bg-[#F1F1F5]">
              <img
                src={banner.imageUrl}
                alt={banner.titulo}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent flex justify-between items-end">
                <div>
                  <p className="text-2xl font-semibold text-white">
                    {banner.porcentaje}% OFF
                  </p>
                  <p className="text-xs text-white/80">{banner.titulo}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex rounded-3xl bg-white border border-[#E4E4EA] shadow-[0_8px_30px_rgba(0,0,0,0.10)] overflow-hidden">
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div className="space-y-1">
                <p className="text-3xl font-semibold text-[#111111]">
                  {banner.porcentaje}%
                </p>
                <p className="text-sm font-medium text-[#111111]">
                  {banner.titulo}
                </p>
                <p className="text-[11px] text-[#9696A1]">
                  {banner.descripcion}
                </p>
              </div>
            </div>
            <div className="hidden xs:block w-28 sm:w-40 bg-[#F1F1F5] overflow-hidden">
              <img
                src={banner.imageUrl}
                alt={banner.titulo}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </section>

      {/* CATEGORÍAS */}
      <section className="space-y-3">
        <div className="grid grid-cols-4 gap-y-4">
          {circleCategories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center gap-1 text-center"
            >
              <div className="h-12 w-12 rounded-full bg-[#F4F4F7] flex items-center justify-center text-lg text-[#111111]">
                {cat.icon}
              </div>
              <span className="text-[11px] text-[#9696A1]">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* MÁS POPULARES */}
      <section className="space-y-3 pb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#111111]">
            Más populares
          </h2>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {pillFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs border transition-colors ${
                activeFilter === f.id
                  ? "bg-[#111111] text-white border-[#111111]"
                  : "bg-white text-[#41414A] border-[#E4E4EA]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {productosParaMostrar.map((product, idx) => (
            <ProductCard key={`${product.id}-${idx}`} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
