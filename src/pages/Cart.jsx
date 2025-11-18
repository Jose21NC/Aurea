// src/pages/Cart.jsx
import React from "react";

function CartPage() {
  return (
    <div className="pt-4 pb-20 px-4 space-y-4">
      <div className="flex justify-center mb-1">
        <p className="text-[15px] font-semibold text-[#111111] tracking-tight">
          Carrito
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-[13px] font-semibold text-[#111111]">
          Tus prendas
        </h2>

        <div className="space-y-3">
          {/* Item 1 */}
          <div className="flex gap-3 rounded-2xl bg-[#F7F7FB] px-3 py-3">
            <div className="h-16 w-16 rounded-2xl overflow-hidden bg-[#E4E4EA]">
              <img
                src="https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=200"
                className="w-full h-full object-cover"
                alt="Prenda carrito 1"
              />
            </div>
            <div className="flex-1">
              <p className="text-[12px] font-medium text-[#111111]">
                Camisa oversize urbana Managua
              </p>
              <p className="text-[11px] text-[#70707A]">
                Talla M · Color crema
              </p>
              <p className="text-[11px] text-[#A3A3AE]">1 unidad</p>
            </div>
            <p className="text-[13px] font-semibold text-[#111111]">
              C$378
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex gap-3 rounded-2xl bg-[#F7F7FB] px-3 py-3">
            <div className="h-16 w-16 rounded-2xl overflow-hidden bg-[#E4E4EA]">
              <img
                src="https://images.pexels.com/photos/6311650/pexels-photo-6311650.jpeg?auto=compress&cs=tinysrgb&w=200"
                className="w-full h-full object-cover"
                alt="Prenda carrito 2"
              />
            </div>
            <div className="flex-1">
              <p className="text-[12px] font-medium text-[#111111]">
                Vestido casual León sunset
              </p>
              <p className="text-[11px] text-[#70707A]">
                Talla M · Look 2
              </p>
              <p className="text-[11px] text-[#A3A3AE]">2 unidades</p>
            </div>
            <p className="text-[13px] font-semibold text-[#111111]">
              C$1,024
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-[13px] font-semibold text-[#111111]">
          Resumen
        </h2>
        <div className="rounded-3xl bg-white px-4 py-3 shadow-[0_6px_20px_rgba(0,0,0,0.06)] space-y-2">
          <div className="flex justify-between text-[12px] text-[#55555F]">
            <span>Subtotal</span>
            <span>C$1,402</span>
          </div>
          <div className="flex justify-between text-[12px] text-[#55555F]">
            <span>Envío a Managua</span>
            <span>Incluido</span>
          </div>
          <div className="border-t border-[#E4E4EA] pt-2 flex justify-between text-[13px] font-semibold text-[#111111]">
            <span>Total</span>
            <span>C$1,402</span>
          </div>
          <button className="w-full mt-2 rounded-full bg-[#111111] text-white text-[12px] font-medium py-2">
            Continuar con el pago (demo)
          </button>
        </div>
      </section>
    </div>
  );
}

export default CartPage;
