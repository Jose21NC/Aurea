// src/pages/Orders.jsx
import React from "react";

function OrdersPage() {
  return (
    <div className="pt-4 pb-20 px-4 space-y-4">
      <div className="flex justify-center mb-1">
        <p className="text-[15px] font-semibold text-[#111111] tracking-tight">
          Pedidos
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-[13px] font-semibold text-[#111111]">
          En curso
        </h2>

        <div className="rounded-3xl bg-[#F7F7FB] px-3 py-3 space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-[12px] font-medium text-[#111111]">
              Pedido #AUR-2048
            </p>
            <span className="px-2.5 py-1 rounded-full bg-[#ECFEFF] text-[10px] text-[#0F766E] font-semibold">
              En camino
            </span>
          </div>
          <p className="text-[11px] text-[#70707A]">
            2 prendas · Entrega estimada: mañana, 6:00 pm
          </p>
          <p className="text-[12px] font-semibold text-[#111111]">
            Total C$1,024
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-[13px] font-semibold text-[#111111]">
          Historial
        </h2>

        <div className="space-y-3">
          <div className="rounded-3xl bg-white px-3 py-3 shadow-[0_4px_14px_rgba(0,0,0,0.04)] space-y-1">
            <div className="flex justify-between items-center">
              <p className="text-[12px] font-medium text-[#111111]">
                Pedido #AUR-1973
              </p>
              <span className="px-2.5 py-1 rounded-full bg-[#ECFDF3] text-[10px] text-[#166534] font-semibold">
                Entregado
              </span>
            </div>
            <p className="text-[11px] text-[#70707A]">
              3 prendas · Entregado hace 5 días
            </p>
            <p className="text-[12px] font-semibold text-[#111111]">
              Total C$1,890
            </p>
          </div>

          <div className="rounded-3xl bg-white px-3 py-3 shadow-[0_4px_14px_rgba(0,0,0,0.04)] space-y-1">
            <div className="flex justify-between items-center">
              <p className="text-[12px] font-medium text-[#111111]">
                Pedido #AUR-1860
              </p>
              <span className="px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[10px] text-[#92400E] font-semibold">
                Cancelado
              </span>
            </div>
            <p className="text-[11px] text-[#70707A]">
              1 prenda · Pedido cancelado
            </p>
            <p className="text-[12px] font-semibold text-[#111111]">
              Total C$512
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OrdersPage;
