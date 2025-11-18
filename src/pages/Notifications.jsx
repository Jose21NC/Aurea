// src/pages/Notifications.jsx
import React from "react";

function Notifications() {
  const items = [
    {
      id: 1,
      tipo: "promo",
      titulo: "25% OFF en colección urbana",
      texto:
        "Solo hoy en camisetas y jeans seleccionados para Managua y León.",
      tiempo: "Hace 2 h",
      destacado: true,
    },
    {
      id: 2,
      tipo: "envio",
      titulo: "Tu pedido #AUR-1045 está en camino",
      texto: "Llega hoy entre 3:00 p.m. y 5:00 p.m.",
      tiempo: "Hace 5 h",
    },
    {
      id: 3,
      tipo: "perfil",
      titulo: "Completa tus preferencias de color",
      texto:
        "Elige tus tonos favoritos para mejorar las recomendaciones de Aurea.",
      tiempo: "Ayer",
    },
  ];

  const iconForType = (tipo) => {
    if (tipo === "promo") return "🎉";
    if (tipo === "envio") return "📦";
    return "⚙️";
  };

  return (
    <div className="pt-4 px-4 space-y-4 pb-4">
      <div className="flex justify-center">
        <p className="text-[13px] font-medium text-[#111111]">
          Notificaciones
        </p>
      </div>

      <div className="space-y-2 text-[12px]">
        {items.map((n) => (
          <div
            key={n.id}
            className={`rounded-2xl px-3 py-3 flex gap-3 ${
              n.destacado ? "bg-[#FFF4F4]" : "bg-[#F7F7FB]"
            }`}
          >
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-lg">
              {iconForType(n.tipo)}
            </div>
            <div className="flex-1 space-y-0.5">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-medium text-[#111111]">
                  {n.titulo}
                </p>
                <span className="text-[10px] text-[#A3A3AE]">
                  {n.tiempo}
                </span>
              </div>
              <p className="text-[11px] text-[#55555F]">{n.texto}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
