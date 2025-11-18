// src/data/sellers.js

const baseSellers = [
  {
    id: "seller-nomad",
    nombreTienda: "Nomad Streetwear",
    ciudad: "Managua",
    tipo: "Moda urbana",
    logoUrl: "https://picsum.photos/seed/nomad-logo/80/80",
    calificacion: 4.8,
    seguidores: 1240,
    tiempoEntrega: "Entrega mismo día en Managua",
  },
  {
    id: "seller-luna",
    nombreTienda: "Luna Casual",
    ciudad: "León",
    tipo: "Casual / diario",
    logoUrl: "https://picsum.photos/seed/luna-logo/80/80",
    calificacion: 4.6,
    seguidores: 830,
    tiempoEntrega: "Entrega 24–48h Occidente",
  },
];

export function getSellerById(id) {
  return baseSellers.find((s) => s.id === id);
}

export function getAllSellers() {
  return baseSellers;
}
