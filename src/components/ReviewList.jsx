// Lista simple de reseñas simuladas
function ReviewList() {
  // datos fake; podrías personalizarlos por productoId
  const reviews = [
    {
      id: 1,
      usuario: "María G.",
      rating: 5,
      comentario: "La tela se siente súper cómoda y la talla M me quedó perfecta.",
      tallaComprada: "M",
      fecha: "Hace 2 días",
    },
    {
      id: 2,
      usuario: "Kevin R.",
      rating: 4,
      comentario: "Buen producto por el precio. El envío fue rápido.",
      tallaComprada: "M",
      fecha: "Hace 1 semana",
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">
          Comentarios (simulados)
        </h3>
        <span className="text-[11px] text-emerald-600 cursor-pointer">
          Ver todos
        </span>
      </div>

      <div className="space-y-2">
        {reviews.map((r) => (
          <article
            key={r.id}
            className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-800">
                {r.usuario}
              </p>
              <p className="text-[11px] text-slate-400">{r.fecha}</p>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Talla comprada: {r.tallaComprada}
            </p>
            <p className="text-xs text-slate-700 mt-1">{r.comentario}</p>
            <p className="text-[11px] text-amber-500 mt-1">
              {"⭐".repeat(r.rating)}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ReviewList;
