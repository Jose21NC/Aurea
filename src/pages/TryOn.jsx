import React from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../data/products.js";

function TryOn() {
  const navigate = useNavigate();
  const productsWithTryOn = getAllProducts().filter((p) => !!p.probadorUrl);

  const auraScore = (p) => {
    const base = p.calificacion ?? 4.5;
    let raw = 7.5 + (base - 3) * 0.8;
    if (raw > 9.7) raw = 9.7;
    if (raw < 7.5) raw = 7.5;
    return Number(raw.toFixed(1));
  };

  const colorPrimario = (p) => p?.colores?.[0]?.nombre || null;

  return (
    <div className="pt-4 pb-20 px-4 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-center">
        <p className="text-[13px] font-semibold text-[#111111] tracking-tight">Probador</p>
      </div>

      {/* Hero/Descripción */}
      <section className="rounded-3xl bg-white border border-[#E4E4EA] shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="relative h-28 bg-[#F4F4F7]">
          <img
            src={productsWithTryOn[0]?.probadorUrl || "https://picsum.photos/seed/tryon/640/400"}
            alt="Hero probador"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="flex items-center gap-2 text-[10px]">
              <span className="px-2 py-1 rounded-full bg-white/90 text-[#111111] font-medium">✨ Recientes</span>
              <span className="px-2 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] font-medium">IA simulada</span>
              <span className="px-2 py-1 rounded-full bg-[#ECFEFF] text-[#0F766E] font-medium">Perfil conectado</span>
            </div>
            <p className="mt-2 text-[12px] text-white leading-snug">
              Aquí verás las prendas que te probaste recientemente. Por ahora te
              mostramos todas las que tienen imagen de probador disponible.
            </p>
          </div>
        </div>
      </section>

      {productsWithTryOn.length === 0 ? (
        <div className="rounded-3xl bg-[#F7F7FB] p-4 text-center text-[12px] text-[#9696A1]">
          Aún no hay prendas con probador.
        </div>
      ) : (
        <section className="space-y-2">
          <h2 className="text-[13px] font-semibold text-[#111111]">Tus últimas pruebas</h2>
          <div className="grid grid-cols-2 gap-3">
            {productsWithTryOn.map((p) => (
              <div
                key={p.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/product/${p.id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate(`/product/${p.id}`);
                }}
                className="group rounded-2xl bg-white border border-[#E4E4EA] shadow-[0_6px_18px_rgba(0,0,0,0.04)] overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#111111]/20"
              >
                <div className="relative h-40 w-full bg-[#EDEEF2]">
                  <img
                    src={p.probadorUrl}
                    alt={p.nombre}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1 text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-white/90 text-[#111111] font-medium shadow">Reciente</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] font-medium shadow">{p.estilo || "Urbano"}</span>
                    {colorPrimario(p) && (
                      <span className="px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#4338CA] font-medium shadow">{colorPrimario(p)}</span>
                    )}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/80 text-white text-[10px]">
                      <span className="text-[12px]">◎</span>
                      <span>Aura {auraScore(p)}/10</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 text-[#111111] text-[10px]">
                      ⭐ {(p.calificacion ?? 4.6).toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-[12px] text-[#111111] line-clamp-2">{p.nombre}</p>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-[#70707A]">
                    <span>{(p.vendidos ?? 74).toLocaleString("es-NI")} vendidos</span>
                    <span className="font-semibold text-[#111111]">
                      C$
                      {p.precioFinal.toLocaleString("es-NI", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Retroalimentación general */}
      <section className="rounded-3xl bg-[#F7F7FB] px-3 py-3">
        <p className="text-[13px] font-semibold text-[#111111] mb-1">Consejos rápidos</p>
        <ul className="text-[11px] text-[#55555F] list-disc pl-4 space-y-1">
          <li>Mejor desempeño con fotos claras y de frente para tu imagen base.</li>
          <li>Colores fríos (azules, grises) combinan bien con accesorios metálicos.</li>
          <li>Revisa la etiqueta “Aura” para una idea rápida de afinidad a tu perfil.</li>
        </ul>
      </section>
    </div>
  );
}

export default TryOn;
