// src/pages/SellerDashboard.jsx
import React from "react";
import { getAllProducts } from "../data/products.js";

function SellerDashboard() {
  const productos = getAllProducts();
  const stockAlto = productos.filter((p) => p.etiquetaInventario === "Stock alto");
  const pocasUnidades = productos.filter(
    (p) => p.etiquetaInventario === "Pocas unidades"
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            Panel del vendedor
          </h1>
          <p className="text-sm text-slate-500">
            Inventario, precios sugeridos y promociones automáticas (simulado).
          </p>
        </div>
        <button
          className="text-sm px-4 py-2 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-600"
          onClick={() =>
            alert(
              "Aquí se abriría el formulario para crear un nuevo producto (simulado)."
            )
          }
        >
          + Nuevo producto
        </button>
      </header>

      {/* Métricas rápidas */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <p className="text-xs text-slate-500">Ventas este mes (simulado)</p>
          <p className="text-xl font-semibold text-slate-900 mt-1">
            C$ 18,450
          </p>
          <p className="text-xs text-emerald-600 mt-1">
            +32% vs. mes anterior
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <p className="text-xs text-slate-500">Productos con stock alto</p>
          <p className="text-xl font-semibold text-slate-900 mt-1">
            {stockAlto.length}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Marcados para descuento automático del {15}%.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <p className="text-xs text-slate-500">Pocas unidades</p>
          <p className="text-xl font-semibold text-slate-900 mt-1">
            {pocasUnidades.length}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Recomendado subir precio o limitar promociones.
          </p>
        </div>
      </section>

      {/* Lista de productos */}
      <section className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-900">
            Productos publicados
          </h2>
          <p className="text-[11px] text-slate-500 hidden sm:block">
            Vista resumida del catálogo con precios finales y reglas aplicadas.
          </p>
        </div>

        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="min-w-full text-[11px] sm:text-xs mx-2 sm:mx-0">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 bg-slate-50/60">
                <th className="text-left py-2 pr-3 pl-2 sm:pl-3">Producto</th>
                <th className="text-left py-2 pr-3">Estilo</th>
                <th className="text-left py-2 pr-3">Talla</th>
                <th className="text-right py-2 pr-3">Stock</th>
                <th className="text-right py-2 pr-3">Precio final</th>
                <th className="text-left py-2 pr-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-slate-50 hover:bg-slate-50/60"
                >
                  <td className="py-2 pr-3 pl-2 sm:pl-3 text-slate-900">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                        {p.imagenUrl ? (
                          <img
                            src={p.imagenUrl}
                            alt={p.nombre}
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                      </div>
                      <span className="line-clamp-2">{p.nombre}</span>
                    </div>
                  </td>
                  <td className="py-2 pr-3 text-slate-600">{p.estilo}</td>
                  <td className="py-2 pr-3 text-slate-600">{p.talla}</td>
                  <td className="py-2 pr-3 text-right text-slate-700">
                    {p.stock}
                  </td>
                  <td className="py-2 pr-3 text-right font-semibold text-slate-900">
                    C${p.precioFinal.toLocaleString("es-NI")}
                  </td>
                  <td className="py-2 pr-3">
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-slate-200 text-[10px] text-slate-700 bg-slate-50">
                        {p.etiquetaInventario}
                      </span>
                      {p.tieneDescuento && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-rose-50 text-[10px] text-rose-600 border border-rose-100">
                          -{p.porcentajeDescuento}% auto desc.
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {productos.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-4 text-center text-slate-500 text-xs"
                  >
                    Aún no tienes productos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-slate-500 mt-2">
          En la versión real, este panel se conectaría a una base de datos y a
          un motor de reglas o modelos de machine learning para ajustar precios,
          promociones y visibilidad sin que el vendedor tenga que intervenir
          manualmente.
        </p>
      </section>
    </div>
  );
}

export default SellerDashboard;
