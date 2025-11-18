import React from "react";
import { currentUser } from "../data/user.jsx";

const ordenTallas = {
  XS: 1,
  S: 2,
  M: 3,
  L: 4,
  XL: 5,
  ÚNICA: 3,
  UNICA: 3,
};

function calcularAjuste(productoTalla, usuarioTalla) {
  const p = ordenTallas[productoTalla] ?? 3;
  const u = ordenTallas[usuarioTalla] ?? 3;
  const diff = p - u;

  if (diff === 0) return "Ajuste regular, pensado para tu talla.";
  if (diff > 0) return "Ligero efecto oversize, un poco más suelto.";
  return "Corte más ajustado al cuerpo.";
}

function TryOnModal({ product, onClose }) {
  const mensajeAjuste = calcularAjuste(product.talla, currentUser.talla);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white max-w-md w-full mx-4 rounded-3xl shadow-xl border border-zinc-200 overflow-hidden">
        {/* Cabecera */}
        <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-zinc-900 uppercase">
              Probador Aurea
            </p>
            <p className="text-[11px] text-zinc-500">
              Vista rápida del ajuste según tu perfil.
            </p>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center bg-zinc-50 text-zinc-500 hover:bg-zinc-100"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4 space-y-4">
          <div className="flex gap-3">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-2">
              <div className="h-20 w-20 rounded-full bg-zinc-900 flex items-center justify-center text-2xl text-amber-200">
                👤
              </div>
              <p className="text-[11px] text-zinc-500 text-center">
                {currentUser.nombre} · Talla {currentUser.talla}
              </p>
            </div>

            {/* Prenda */}
            <div className="flex-1 bg-zinc-50 rounded-2xl border border-zinc-100 p-3 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-zinc-800 line-clamp-2">
                  {product.nombre}
                </p>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Estilo {product.estilo} · Talla {product.talla}
                </p>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <div className="h-10 w-10 rounded-xl bg-zinc-900/5 border border-zinc-200 flex items-center justify-center text-lg">
                  👕
                </div>
                <p className="text-xs text-zinc-600">{mensajeAjuste}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-3">
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Aurea utiliza tu talla y preferencias guardadas para sugerir el
              ajuste más probable de cada prenda. Más adelante, podés activar
              el modo de prueba visual con foto y medidas detalladas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TryOnModal;
