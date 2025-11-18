import React from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../data/products.js";

function TryOn() {
  const productsWithTryOn = getAllProducts().filter((p) => !!p.probadorUrl);

  return (
    <div className="pt-4 pb-20 px-4 space-y-4">
      <div className="flex justify-center">
        <p className="text-[13px] font-medium text-[#111111]">Probador</p>
      </div>

      <p className="text-[12px] text-[#70707A]">
        Prendas con imagen de probador generada. Toca cualquiera para ver el detalle y abrir el probador.
      </p>

      {productsWithTryOn.length === 0 ? (
        <div className="rounded-3xl bg-[#F7F7FB] p-4 text-center text-[12px] text-[#9696A1]">
          Aún no hay prendas con probador.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {productsWithTryOn.map((p) => (
            <Link
              to={`/product/${p.id}`}
              key={p.id}
              className="rounded-2xl bg-white shadow-[0_6px_18px_rgba(0,0,0,0.04)] overflow-hidden"
            >
              <div className="h-40 w-full bg-[#EDEEF2]">
                <img
                  src={p.probadorUrl}
                  alt={p.nombre}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2">
                <p className="text-[12px] text-[#111111] line-clamp-2">{p.nombre}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default TryOn;
