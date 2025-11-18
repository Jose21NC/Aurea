// src/pages/Favorites.jsx
import React from "react";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { getAllProducts } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

function Favorites() {
  const { favoriteIds } = useFavorites();
  const all = getAllProducts();
  const favoritos = all.filter((p) =>
    favoriteIds.includes(String(p.id))
  );

  return (
    <div className="pt-4 px-4 space-y-4 pb-4">
      <div className="flex justify-center">
        <p className="text-[13px] font-medium text-[#111111]">
          Favoritos
        </p>
      </div>

      {favoritos.length === 0 ? (
        <div className="rounded-3xl bg-[#F7F7FB] px-3 py-4 text-[12px] text-[#55555F]">
          <p className="font-medium text-[#111111] mb-1">
            Aún no tienes prendas guardadas.
          </p>
          <p>
            Toca el corazón en cualquier prenda para agregarla aquí y poder
            revisarla luego.
          </p>
        </div>
      ) : (
        <>
          <p className="text-[12px] text-[#55555F]">
            Tenés {favoritos.length} prenda
            {favoritos.length > 1 ? "s" : ""} guardada
            {favoritos.length > 1 ? "s" : ""} en Aurea.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {favoritos.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Favorites;
