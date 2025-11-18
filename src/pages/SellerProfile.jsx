import { useParams } from "react-router-dom";
import { getSellerById } from "../data/sellers.js";
import { getAllProducts } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

function SellerProfile() {
  const { sellerId } = useParams();
  const seller = getSellerById(sellerId);
  const products = getAllProducts().filter((p) => p.sellerId === sellerId);

  if (!seller) {
    return (
      <p className="text-sm text-slate-600">
        No encontramos esta tienda.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabecera tienda */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white rounded-3xl border border-slate-100 shadow-sm px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
            {seller.logoUrl ? (
              <img
                src={seller.logoUrl}
                alt={seller.nombreTienda}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              {seller.nombreTienda}
            </h1>
            <p className="text-xs text-slate-500">
              {seller.tipo} · {seller.ciudad}
            </p>
            <p className="text-[11px] text-slate-500">
              ⭐ {seller.calificacion.toFixed(1)} · {seller.seguidores} seguidores
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="text-xs px-3 py-2 rounded-full bg-emerald-500 text-white">
            Seguir tienda (demo)
          </button>
          <button className="text-xs px-3 py-2 rounded-full bg-white border border-slate-200 text-slate-700">
            Chat (demo)
          </button>
        </div>
      </section>

      {/* Info logística */}
      <section className="bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3 text-xs text-slate-700">
        {seller.tiempoEntrega}
      </section>

      {/* Productos de la tienda */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">
            Productos de esta tienda
          </h2>
          <p className="text-xs text-slate-500">
            {products.length} artículos activos
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default SellerProfile;
