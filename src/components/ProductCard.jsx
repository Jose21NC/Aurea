// src/components/ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const {
    id,
    nombre,
    precioFinal,
    calificacion,
    vendidos,
    imagenUrl,
    tieneDescuento,
    porcentajeDescuento,
    stockEstado,
    categoriaLabel,
  } = product;

  const favorite = isFavorite(id);

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div
      className="block text-left cursor-pointer"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <article className="bg-white rounded-[22px] overflow-hidden shadow-[0_6px_18px_rgba(0,0,0,0.04)]">
        {/* Imagen + badges */}
        <div className="relative px-3 pt-3">
          <div className="rounded-[20px] overflow-hidden bg-[#F4F4F7] aspect-[4/5]">
            <img
              src={
                imagenUrl ||
                "https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=400"
              }
              alt={nombre}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Badge de descuento rojo */}
          {tieneDescuento && porcentajeDescuento && (
            <span className="absolute left-5 top-5 rounded-full bg-[#FF4D4F] text-[10px] text-white font-semibold px-2 py-0.5 shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
              -{porcentajeDescuento}%
            </span>
          )}

          {/* Botón de favorito */}
          <button
            type="button"
            className={`absolute top-3 right-5 h-7 w-7 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.18)] flex items-center justify-center text-[15px] ${
              favorite ? "text-[#FF4D4F]" : "text-[#111111]"
            }`}
            onClick={(e) => {
              e.stopPropagation(); // que no dispare la navegación
              toggleFavorite(id);
            }}
          >
            {favorite ? "❤" : "♡"}
          </button>
        </div>

        {/* Texto */}
        <div className="px-3 pt-2 pb-3 space-y-1">
          <p className="text-[12px] text-[#A3A3AE] truncate">
            {categoriaLabel || "Recomendado · urbano"}
          </p>
          <p className="text-[13px] font-semibold text-[#111111] leading-snug line-clamp-2">
            {nombre}
          </p>

          <div className="flex items-center gap-1 text-[11px] text-[#70707A]">
            <span>⭐ {(calificacion ?? 4.6).toFixed(1)}</span>
            <span>·</span>
            <span>{(vendidos ?? 120).toLocaleString("es-NI")} vendidos</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <p className="text-[15px] font-semibold text-[#111111]">
              C$
              {precioFinal.toLocaleString("es-NI", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
            {stockEstado && (
              <span className="px-2 py-0.5 rounded-full bg-[#F4F4F7] text-[10px] text-[#70707A]">
                {stockEstado}
              </span>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

export default ProductCard;
