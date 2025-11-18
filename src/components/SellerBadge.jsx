// Muestra resumen del vendedor (usaremos en ProductDetail y SellerProfile)
import { Link } from "react-router-dom";

function SellerBadge({ seller }) {
  if (!seller) return null;

  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
          {seller.logoUrl ? (
            <img
              src={seller.logoUrl}
              alt={seller.nombreTienda}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
              Tienda
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900">
            {seller.nombreTienda}
          </p>
          <p className="text-[11px] text-slate-500">
            {seller.tipo} · {seller.ciudad}
          </p>
          <p className="text-[11px] text-slate-500 flex items-center gap-1">
            <span>⭐ {seller.calificacion.toFixed(1)}</span>
            <span className="text-slate-400">· {seller.seguidores} seguidores</span>
          </p>
        </div>
      </div>
      <Link
        to={`/tienda/${seller.id}`}
        className="text-[11px] px-3 py-1.5 rounded-full bg-white text-emerald-700 border border-emerald-200 hover:border-emerald-400"
      >
        Ver tienda
      </Link>
    </div>
  );
}

export default SellerBadge;
