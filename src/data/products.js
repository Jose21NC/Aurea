// src/data/products.js
import { currentUser } from "./user.jsx"; // o ./user.js según tu archivo

const ordenTallas = {
  XS: 1,
  S: 2,
  M: 3,
  L: 4,
  XL: 5,
  ÚNICA: 3,
  UNICA: 3,
};

function calcularPrecioBase(producto) {
  const margen = producto.margenDeseado ?? 0.3;
  return producto.costoVendedor * (1 + margen);
}

function calcularPrecioFinal(producto) {
  const costoEnvio = 80; // fijo para prototipo
  const precioBase = calcularPrecioBase(producto);

  const descuentoReglaStock = producto.stock > 20 ? 0.15 : 0;
  const descuentoExtra = producto.descuentoManual ?? 0;
  const descuentoTotal = Math.max(descuentoReglaStock, descuentoExtra);

  const precioConDesc = precioBase * (1 - descuentoTotal);
  const precioFinal = precioConDesc + costoEnvio;

  return {
    precioFinal: Math.round(precioFinal),
    precioAntesDescuento: Math.round(precioBase + costoEnvio),
    porcentajeDescuento: Math.round(descuentoTotal * 100),
    tieneDescuento: descuentoTotal > 0,
  };
}

function getEtiquetaInventario(stock) {
  if (stock > 20) return "Stock alto";
  if (stock >= 5) return "Stock normal";
  if (stock > 0) return "Pocas unidades";
  return "Agotado";
}

// catálogo generado a partir de las prendas suministradas por el usuario
const baseProducts = [
  {
    id: "p-camiseta-oversize",
    nombre: "Camiseta deportiva oversize",
    estilo: "deportivo",
    tallas: ["S", "M", "L", "XL"],
    talla: "M",
    costoVendedor: 120,
    margenDeseado: 0.4,
    stock: 12,
    colores: [
      {
        nombre: "Blanco",
        images: [
          "https://img.kwcdn.com/product/fancy/17feab76-5237-454d-8d94-8d9275aee261.jpg?imageView2/2/w/800/q/70/format/webp",
          "https://img.kwcdn.com/product/fancy/0a1b5142-4e88-417d-ae91-42e86ee099db.jpg?imageView2/2/w/800/q/70/format/webp",
        ],
      },
      {
        nombre: "Negro",
        images: [
          "https://img.kwcdn.com/product/fancy/7fb0003f-6f3c-4815-aa51-df9f77607da0.jpg?imageView2/2/w/800/q/70/format/webp",
        ],
      },
      {
        nombre: "Azul oscuro",
        images: [
          "https://img.kwcdn.com/product/fancy/a7201739-e165-40d8-93d3-b50de8be66f0.jpg?imageView2/2/w/800/q/70/format/webp",
        ],
      },
    ],
    imagenes: [
      "https://img.kwcdn.com/product/fancy/17feab76-5237-454d-8d94-8d9275aee261.jpg?imageView2/2/w/800/q/70/format/webp",
      "https://img.kwcdn.com/product/fancy/0a1b5142-4e88-417d-ae91-42e86ee099db.jpg?imageView2/2/w/800/q/70/format/webp",
      "https://img.kwcdn.com/product/fancy/7fb0003f-6f3c-4815-aa51-df9f77607da0.jpg?imageView2/2/w/800/q/70/format/webp",
      "https://img.kwcdn.com/product/fancy/a7201739-e165-40d8-93d3-b50de8be66f0.jpg?imageView2/2/w/800/q/70/format/webp",
    ],
    imagenUrl:
      "https://img.kwcdn.com/product/fancy/17feab76-5237-454d-8d94-8d9275aee261.jpg?imageView2/2/w/800/q/70/format/webp",
    calificacion: 4.5,
    vendidos: 32,
    sellerId: "seller-aurea",
    descripcionCorta: "Camiseta deportiva oversize, tela transpirable y caída relajada.",
    materiales: ["Poliéster 65%", "Algodón 35%"],
  },

  {
    id: "p-sueter-los-angeles",
    nombre: "Sueter Oversize Los Angeles",
    estilo: "casual",
    tallas: ["S", "M", "L", "XL"],
    talla: "M",
    costoVendedor: 220,
    margenDeseado: 0.35,
    stock: 15,
    colores: [
      {
        nombre: "Blanco",
        images: [
          "https://img.kwcdn.com/local-goods-image/2066d9069a/b3aa342a-42be-4c17-8319-b30b11af0249_1600x2133.png?imageView2/2/w/800/q/70/format/webp",
          "https://img.kwcdn.com/local-goods-image/2066d9069a/a957b074-b826-4921-a0fb-fa2fa211900f_1600x2133.png?imageView2/2/w/800/q/70/format/webp",
        ],
      },
      {
        nombre: "Negro",
        images: [
          "https://img.kwcdn.com/local-goods-image/2066d90ce6/85870f3d-ab94-40a6-8846-0be075623e8f_1601x2134.png?imageView2/2/w/800/q/70/format/webp",
        ],
      },
    ],
    imagenes: [
      "https://img.kwcdn.com/local-goods-image/2066d9069a/b3aa342a-42be-4c17-8319-b30b11af0249_1600x2133.png?imageView2/2/w/800/q/70/format/webp",
      "https://img.kwcdn.com/local-goods-image/2066d9069a/a957b074-b826-4921-a0fb-fa2fa211900f_1600x2133.png?imageView2/2/w/800/q/70/format/webp",
      "https://img.kwcdn.com/local-goods-image/2066d90ce6/85870f3d-ab94-40a6-8846-0be075623e8f_1601x2134.png?imageView2/2/w/800/q/70/format/webp",
    ],
    imagenUrl:
      "https://img.kwcdn.com/local-goods-image/2066d9069a/b3aa342a-42be-4c17-8319-b30b11af0249_1600x2133.png?imageView2/2/w/800/q/70/format/webp",
    probadorUrl:
      "https://firebasestorage.googleapis.com/v0/b/aurea-marketplace.firebasestorage.app/o/ropa%2FGemini_Generated_Image_437ect437ect437e.png?alt=media&token=e011bb0d-99f4-4ec9-93e9-45f9277c8fc8",
    calificacion: 4.7,
    vendidos: 48,
    sellerId: "seller-aurea",
    descripcionCorta: "Sueter oversize con estampado 'Los Angeles', corte amplio y cómodo.",
    materiales: ["Algodón 70%", "Poliéster 30%"],
  },

  {
    id: "p-jeans-mezclilla-azul",
    nombre: "Pantalon mezclilla azul de hombre",
    estilo: "casual",
    tallas: ["M", "L", "XL"],
    talla: "M",
    costoVendedor: 200,
    margenDeseado: 0.35,
    stock: 22,
    colores: [
      {
        nombre: "Azul",
        images: [
          "https://img.kwcdn.com/product/fancy/3e73cd06-8f8b-4363-b1fb-6df440ca2550.jpg?imageView2/2/w/800/q/70/format/webp",
          "https://img.kwcdn.com/product/fancy/f4628c9b-85a6-47f4-9e7f-13efbf09d7ca.jpg?imageView2/2/w/800/q/70/format/webp",
          "https://img.kwcdn.com/product/fancy/d8d9abbd-7e7d-4f47-bd83-cf0c268583ab.jpg?imageView2/2/w/800/q/70/format/webp",
        ],
      },
    ],
    imagenes: [
      "https://img.kwcdn.com/product/fancy/3e73cd06-8f8b-4363-b1fb-6df440ca2550.jpg?imageView2/2/w/800/q/70/format/webp",
      "https://img.kwcdn.com/product/fancy/f4628c9b-85a6-47f4-9e7f-13efbf09d7ca.jpg?imageView2/2/w/800/q/70/format/webp",
      "https://img.kwcdn.com/product/fancy/d8d9abbd-7e7d-4f47-bd83-cf0c268583ab.jpg?imageView2/2/w/800/q/70/format/webp",
    ],
    imagenUrl:
      "https://img.kwcdn.com/product/fancy/3e73cd06-8f8b-4363-b1fb-6df440ca2550.jpg?imageView2/2/w/800/q/70/format/webp",
    probadorUrl:
      "https://firebasestorage.googleapis.com/v0/b/aurea-marketplace.firebasestorage.app/o/ropa%2FGemini_Generated_Image_qupxq9qupxq9qupx.png?alt=media&token=d48c2c42-134c-4aa5-9717-aa94f5e216de",
    calificacion: 4.6,
    vendidos: 88,
    sellerId: "seller-aurea",
    descripcionCorta: "Jeans clásico azul para uso diario con corte recto.",
    materiales: ["Denim 100%"],
  },

  {
    id: "p-conjunto-hombre-sencillo",
    nombre: "Conjunto hombre sencillo",
    estilo: "casual",
    tallas: ["M", "L", "XL"],
    talla: "M",
    costoVendedor: 300,
    margenDeseado: 0.38,
    stock: 10,
    colores: [
      { nombre: "Beige", images: [
        "https://img.kwcdn.com/product/fancy/95336dc0-99bc-449e-96fe-8ce944721d17.jpg?imageView2/2/w/800/q/70/format/webp",
      ] },
      { nombre: "Caqui", images: [
        "https://img.kwcdn.com/product/fancy/06dbfe29-f225-4556-a082-5f47121b2b21.jpg?imageView2/2/w/800/q/70/format/webp",
      ] },
      { nombre: "Verde", images: [
        "https://img.kwcdn.com/product/fancy/18ca7e35-e82a-40fd-9af9-9e376c781bf3.jpg?imageView2/2/w/800/q/70/format/webp",
      ] },
      { nombre: "Negro", images: [
        "https://img.kwcdn.com/product/fancy/450778a6-f810-45fa-b70c-277b17197e99.jpg?imageView2/2/w/800/q/70/format/webp",
      ] },
    ],
    imagenes: [
      "https://img.kwcdn.com/product/fancy/3f8efcd0-4f5b-49ef-a5bc-f9c252b4c298.jpg?imageView2/2/w/800/q/70/format/webp",
      "https://img.kwcdn.com/product/fancy/95336dc0-99bc-449e-96fe-8ce944721d17.jpg?imageView2/2/w/800/q/70/format/webp",
    ],
    imagenUrl:
      "https://img.kwcdn.com/product/fancy/3f8efcd0-4f5b-49ef-a5bc-f9c252b4c298.jpg?imageView2/2/w/800/q/70/format/webp",
    probadorUrl:
      "https://firebasestorage.googleapis.com/v0/b/aurea-marketplace.firebasestorage.app/o/ropa%2FGemini_Generated_Image_w1q7tpw1q7tpw1q7.png?alt=media&token=46c3ab83-b867-41bb-bdd1-231f969f7124",
    calificacion: 4.4,
    vendidos: 40,
    sellerId: "seller-aurea",
    descripcionCorta: "Conjunto sencillo de dos piezas, cómodo y versátil para diario.",
    materiales: ["Algodón 60%", "Poliéster 40%"],
  },

  {
    id: "p-camisa-oversize-japonesa",
    nombre: "Camisa Oversize estilo japones para hombre",
    estilo: "street",
    tallas: ["M", "L", "XL"],
    talla: "M",
    costoVendedor: 140,
    margenDeseado: 0.4,
    stock: 9,
    colores: [
      { nombre: "Negro", images: [
        "https://img.kwcdn.com/product/open/47965e8dfda34b7f99e82bcb81502346-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/open/fbbe37d838a84e2793c26121ce392dac-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
      ] },
      { nombre: "Limon amarillo", images: [
        "https://img.kwcdn.com/product/fancy/c3329194-8262-4f89-a6a8-00829410e7cf.jpg?imageView2/2/w/800/q/70/format/webp",
      ] },
    ],
    imagenes: [
      "https://img.kwcdn.com/product/open/47965e8dfda34b7f99e82bcb81502346-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
    ],
    imagenUrl:
      "https://img.kwcdn.com/product/open/47965e8dfda34b7f99e82bcb81502346-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
    probadorUrl:
      "https://firebasestorage.googleapis.com/v0/b/aurea-marketplace.firebasestorage.app/o/ropa%2FGemini_Generated_Image_ek2npyek2npyek2n.png?alt=media&token=45ee4288-66c0-4a52-863d-ecfc6df5df30",
    calificacion: 4.3,
    vendidos: 22,
    sellerId: "seller-aurea",
    descripcionCorta: "Camisa oversize con silueta inspirada en el streetwear japonés.",
    materiales: ["Algodón 100%"],
  },

  {
    id: "p-camisa-polo-basica",
    nombre: "Camisa polo basica para hombre",
    estilo: "casual",
    tallas: ["S", "M", "L"],
    talla: "M",
    costoVendedor: 90,
    margenDeseado: 0.45,
    stock: 14,
    colores: [
      { nombre: "Azul", images: [
        "https://img.kwcdn.com/product/open/bcac1a69b5ab459092f56548e0447da5-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
      ] },
      { nombre: "Verde", images: [
        "https://img.kwcdn.com/product/open/8741828837494226885d3230c892f14f-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
      ] },
    ],
    imagenes: [
      "https://img.kwcdn.com/product/open/303407df2c6d46868db14b4fe194bb5c-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
    ],
    imagenUrl:
      "https://img.kwcdn.com/product/open/303407df2c6d46868db14b4fe194bb5c-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
    probadorUrl:
      "https://firebasestorage.googleapis.com/v0/b/aurea-marketplace.firebasestorage.app/o/ropa%2FGemini_Generated_Image_wr87s3wr87s3wr87.png?alt=media&token=dff44a96-1625-40f3-94cf-ed5c63df224b",
    calificacion: 4.2,
    vendidos: 19,
    sellerId: "seller-aurea",
    descripcionCorta: "Polo básico, cuello clásico y tejido ligero.",
    materiales: ["Algodón 60%", "Poliéster 40%"],
  },

  {
    id: "p-conjunto-casual-veranero",
    nombre: "Conjunto casual veranero de hombre",
    estilo: "verano",
    tallas: ["M", "L"],
    talla: "M",
    costoVendedor: 260,
    margenDeseado: 0.35,
    stock: 11,
    colores: [
      { nombre: "Cafe ligero", images: [
        "https://img.kwcdn.com/product/open/59bebbf8a10c4563833999385fd96689-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/open/b1618313410b45df9713e9d935424196-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
      ] },
      { nombre: "Celeste", images: [
        "https://img.kwcdn.com/product/open/c1d5b6fcbe6b4e4d950e975455dd6c62-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/open/fba0ac3f6df849afb40d030450b0f48b-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
      ] },
    ],
    imagenes: [
      "https://img.kwcdn.com/product/open/59bebbf8a10c4563833999385fd96689-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
    ],
    imagenUrl:
      "https://img.kwcdn.com/product/open/59bebbf8a10c4563833999385fd96689-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
    probadorUrl:
      "https://firebasestorage.googleapis.com/v0/b/aurea-marketplace.firebasestorage.app/o/ropa%2FGemini_Generated_Image_3rb7iv3rb7iv3rb7.png?alt=media&token=15b54b4b-dd52-4cd0-b442-6328506e6a27",
    calificacion: 4.6,
    vendidos: 33,
    sellerId: "seller-aurea",
    descripcionCorta: "Conjunto veraniego ligero, tela fresca y colores suaves.",
    materiales: ["Lino 50%", "Algodón 50%"],
  },

  {
    id: "p-camisa-formal-hombre",
    nombre: "Camisa formal hombre",
    estilo: "formal",
    tallas: ["S", "M", "L", "XL"],
    talla: "M",
    costoVendedor: 180,
    margenDeseado: 0.32,
    stock: 13,
    colores: [
      { nombre: "Blanca", images: [
        "https://img.kwcdn.com/product/open/429387f4a81d452d869e4272e41fb85d-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/open/6cf02399a2764ec1be99f48895a3f10c-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
      ] },
    ],
    imagenes: [
      "https://img.kwcdn.com/product/open/429387f4a81d452d869e4272e41fb85d-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
    ],
    imagenUrl:
      "https://img.kwcdn.com/product/open/429387f4a81d452d869e4272e41fb85d-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
    probadorUrl:
      "https://firebasestorage.googleapis.com/v0/b/aurea-marketplace.firebasestorage.app/o/ropa%2FGemini_Generated_Image_au2hq8au2hq8au2h.png?alt=media&token=f4b62350-6532-429d-a2e6-921937c6408f",
    calificacion: 4.5,
    vendidos: 27,
    sellerId: "seller-aurea",
    descripcionCorta: "Camisa formal clásica, ideal para oficina y eventos.",
    materiales: ["Algodón 100%"],
  },

  {
    id: "p-camisa-y2k",
    nombre: "Camisa estilo Y2K hombre",
    estilo: "vintage",
    tallas: ["M", "L"],
    talla: "M",
    costoVendedor: 130,
    margenDeseado: 0.42,
    stock: 7,
    colores: [
      { nombre: "Blanco", images: [
        "https://img.kwcdn.com/product/e9344444/a923eb58-6fed-44bf-bb61-71870231d5e9/af8e56b21a2ba48bde7ed81159099659.jpeg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/fancy/81cc23ef-717f-4b6c-ac96-17459f0928be.jpg?imageView2/2/w/800/q/70/format/webp",
      ] },
    ],
    imagenes: [
      "https://img.kwcdn.com/product/e9344444/a923eb58-6fed-44bf-bb61-71870231d5e9/af8e56b21a2ba48bde7ed81159099659.jpeg?imageView2/2/w/800/q/70/format/webp",
    ],
    imagenUrl:
      "https://img.kwcdn.com/product/e9344444/a923eb58-6fed-44bf-bb61-71870231d5e9/af8e56b21a2ba48bde7ed81159099659.jpeg?imageView2/2/w/800/q/70/format/webp",
    probadorUrl:
      "https://firebasestorage.googleapis.com/v0/b/aurea-marketplace.firebasestorage.app/o/ropa%2FGemini_Generated_Image_e1ueuoe1ueuoe1ue.png?alt=media&token=64543481-dfb9-4ced-8246-a446f7676985",
    calificacion: 4.1,
    vendidos: 14,
    sellerId: "seller-aurea",
    descripcionCorta: "Camisa con estética Y2K, estampados y silueta relajada.",
    materiales: ["Algodón 100%"],
  },

  {
    id: "p-camisa-algodon-japonesa",
    nombre: "Camisa de algodon estilo japones",
    estilo: "japones",
    tallas: ["M", "L"],
    talla: "M",
    costoVendedor: 145,
    margenDeseado: 0.38,
    stock: 9,
    colores: [
      { nombre: "Blanco", images: [
        "https://img.kwcdn.com/product/fancy/a3a33c65-b7d4-4511-ba57-cddd7d628ada.jpg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/fancy/81cc23ef-717f-4b6c-ac96-17459f0928be.jpg?imageView2/2/w/800/q/70/format/webp",
      ] },
    ],
    imagenes: [
      "https://img.kwcdn.com/product/fancy/a3a33c65-b7d4-4511-ba57-cddd7d628ada.jpg?imageView2/2/w/800/q/70/format/webp",
    ],
    imagenUrl:
      "https://img.kwcdn.com/product/fancy/a3a33c65-b7d4-4511-ba57-cddd7d628ada.jpg?imageView2/2/w/800/q/70/format/webp",
    probadorUrl:
      "https://firebasestorage.googleapis.com/v0/b/aurea-marketplace.firebasestorage.app/o/ropa%2FGemini_Generated_Image_s21fz6s21fz6s21f.png?alt=media&token=c849f46c-4070-4bc7-aa08-708c3c403df7",
    calificacion: 4.4,
    vendidos: 12,
    sellerId: "seller-aurea",
    descripcionCorta: "Camisa de algodón con patrón japonés, cómoda y transpirable.",
    materiales: ["Algodón 100%"],
  },

  {
    id: "p-camisa-beisbol-personalizable",
    nombre: "Camisa estilo beisboll personalizable",
    estilo: "sport",
    tallas: ["S", "M", "L"],
    talla: "M",
    costoVendedor: 160,
    margenDeseado: 0.36,
    stock: 8,
    colores: [
      { images: [
        "https://img.kwcdn.com/product/fancy/bf33ec43-5c01-4ab9-a14d-137adf8868d7.jpg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/fancy/ead43b89-71dc-4e86-8f31-e056e18d3921.jpg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/fancy/2804b155-80d2-48ef-afc4-444147f634d8.jpg?imageView2/2/w/800/q/70/format/webp",
      ] },
    ],
    imagenes: [
      "https://img.kwcdn.com/product/fancy/bf33ec43-5c01-4ab9-a14d-137adf8868d7.jpg?imageView2/2/w/800/q/70/format/webp",
    ],
    imagenUrl:
      "https://img.kwcdn.com/product/fancy/bf33ec43-5c01-4ab9-a14d-137adf8868d7.jpg?imageView2/2/w/800/q/70/format/webp",
    calificacion: 4.2,
    vendidos: 7,
    sellerId: "seller-aurea",
    descripcionCorta: "Camisa tipo béisbol personalizable con opción de añadir letras.",
    materiales: ["Poliéster 70%", "Algodón 30%"],
  },

  {
    id: "p-chaqueta-besibol",
    nombre: "Chaqueta con estampado béisbol",
    estilo: "sport",
    tallas: ["M", "L"],
    talla: "M",
    costoVendedor: 240,
    margenDeseado: 0.33,
    stock: 6,
    colores: [
      { nombre: "Azul", images: [
        "https://img.kwcdn.com/product/open/0f15724b07a84f8187e3677c31945d2b-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/open/714f5b98e2f64be9841302d3d7e87ab2-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
      ] },
    ],
    imagenes: [
      "https://img.kwcdn.com/product/open/0f15724b07a84f8187e3677c31945d2b-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
    ],
    imagenUrl:
      "https://img.kwcdn.com/product/open/0f15724b07a84f8187e3677c31945d2b-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
    calificacion: 4.5,
    vendidos: 9,
    sellerId: "seller-aurea",
    descripcionCorta: "Chaqueta estilo béisbol con estampado llamativo.",
    materiales: ["Poliéster 100%"],
  },

  {
    id: "p-pantalon-elegante-hombre",
    nombre: "Pantalón elegante hombre",
    estilo: "formal",
    tallas: ["M", "L", "XL"],
    talla: "M",
    costoVendedor: 210,
    margenDeseado: 0.3,
    stock: 10,
    colores: [
      { nombre: "Negro", images: [
        "https://img.kwcdn.com/product/open/bedb9c3c200e42d3801845d222b83e66-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/open/0fcef4c8403f41a7afbeb7582168b0e8-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/open/fc4bf03d42124b1989acd53a75ca0ee4-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
      ] },
    ],
    imagenes: [
      "https://img.kwcdn.com/product/open/bedb9c3c200e42d3801845d222b83e66-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
    ],
    imagenUrl:
      "https://img.kwcdn.com/product/open/bedb9c3c200e42d3801845d222b83e66-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
    calificacion: 4.6,
    vendidos: 21,
    sellerId: "seller-aurea",
    descripcionCorta: "Pantalón elegante con corte moderno y tela de calidad.",
    materiales: ["Poliéster 60%", "Viscosa 40%"],
  },

  {
    id: "p-pantalon-urbano-graffiti",
    nombre: "Pantalon urbano hombre - Graffiti",
    estilo: "urbano",
    tallas: ["M", "L"],
    talla: "M",
    costoVendedor: 190,
    margenDeseado: 0.36,
    stock: 5,
    colores: [
      { images: [
        "https://img.kwcdn.com/product/open/214bd35687124164938c89f6185c37a1-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/open/39c49706e1404de5b3cae02fc62c7513-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
      ] },
    ],
    imagenes: [
      "https://img.kwcdn.com/product/open/214bd35687124164938c89f6185c37a1-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
    ],
    imagenUrl:
      "https://img.kwcdn.com/product/open/214bd35687124164938c89f6185c37a1-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
    probadorUrl:
      "https://firebasestorage.googleapis.com/v0/b/aurea-marketplace.firebasestorage.app/o/ropa%2FGemini_Generated_Image_7ffvsk7ffvsk7ffv.png?alt=media&token=abfc72c2-06eb-49f0-bda0-fe9194f25b23",
    calificacion: 4.0,
    vendidos: 11,
    sellerId: "seller-aurea",
    descripcionCorta: "Pantalón urbano con print graffiti, look atrevido.",
    materiales: ["Algodón 80%", "Poliéster 20%"],
  },

  {
    id: "p-pantalon-casual-verde",
    nombre: "Pantalon casual hombre - verde",
    estilo: "casual",
    tallas: ["M", "L"],
    talla: "M",
    costoVendedor: 170,
    margenDeseado: 0.34,
    stock: 12,
    colores: [
      { nombre: "Verde", images: [
        "https://img.kwcdn.com/product/open/90b75b0c3f02470493d119c01f5aa471-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/open/f4da60b438d947219fb094188fc93d69-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
      ] },
    ],
    imagenes: [
      "https://img.kwcdn.com/product/open/90b75b0c3f02470493d119c01f5aa471-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
    ],
    imagenUrl:
      "https://img.kwcdn.com/product/open/90b75b0c3f02470493d119c01f5aa471-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
    calificacion: 4.3,
    vendidos: 16,
    sellerId: "seller-aurea",
    descripcionCorta: "Pantalón casual en tono verde, corte relajado.",
    materiales: ["Algodón 90%", "Elastano 10%"],
  },

  {
    id: "p-pantalon-ligero-deportivo",
    nombre: "Pantalon ligero para hombre - Deportivo blanco",
    estilo: "deportivo",
    tallas: ["S", "M", "L"],
    talla: "M",
    costoVendedor: 110,
    margenDeseado: 0.42,
    stock: 14,
    colores: [
      { nombre: "Blanco", images: [
        "https://img.kwcdn.com/product/fancy/fafc0222-8451-454c-add0-6d0c708d0492.jpg?imageView2/2/w/800/q/70/format/webp",
      ] },
      { nombre: "Rojo", images: [
        "https://img.kwcdn.com/product/fancy/b08c4a1b-b9c9-481d-9ba4-f024f97d3a5b.jpg?imageView2/2/w/800/q/70/format/webp",
      ] },
      { nombre: "Azul", images: [
        "https://img.kwcdn.com/product/fancy/90069c34-45bb-459a-8ecf-5d54494c653c.jpg?imageView2/2/w/800/q/70/format/webp",
      ] },
    ],
    imagenes: [
      "https://img.kwcdn.com/product/fancy/fafc0222-8451-454c-add0-6d0c708d0492.jpg?imageView2/2/w/800/q/70/format/webp",
    ],
    imagenUrl:
      "https://img.kwcdn.com/product/fancy/fafc0222-8451-454c-add0-6d0c708d0492.jpg?imageView2/2/w/800/q/70/format/webp",
    calificacion: 4.2,
    vendidos: 13,
    sellerId: "seller-aurea",
    descripcionCorta: "Pantalón deportivo ligero, ideal para entrenamiento y aire libre.",
    materiales: ["Poliéster 100%"],
  },

  {
    id: "p-overol-azul-hombre",
    nombre: "Overol Azul Hombre",
    estilo: "workwear",
    tallas: ["M", "L"],
    talla: "M",
    costoVendedor: 220,
    margenDeseado: 0.33,
    stock: 7,
    colores: [
      { nombre: "Azul", images: [
        "https://img.kwcdn.com/product/fancy/4f7ab810-a914-47cf-909f-214e1459133f.jpg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/fancy/bd868798-b668-4303-9e13-92e76c5763a8.jpg?imageView2/2/w/800/q/70/format/webp",
      ] },
    ],
    imagenes: [
      "https://img.kwcdn.com/product/fancy/4f7ab810-a914-47cf-909f-214e1459133f.jpg?imageView2/2/w/800/q/70/format/webp",
    ],
    imagenUrl:
      "https://img.kwcdn.com/product/fancy/4f7ab810-a914-47cf-909f-214e1459133f.jpg?imageView2/2/w/800/q/70/format/webp",
    calificacion: 4.4,
    vendidos: 10,
    sellerId: "seller-aurea",
    descripcionCorta: "Overol azul resistente, ideal para trabajos y estilo industrial.",
    materiales: ["Algodón 60%", "Poliéster 40%"],
  },

  {
    id: "p-pantalon-beige-trabajo",
    nombre: "Pantalon Beige de trabajo",
    estilo: "workwear",
    tallas: ["M", "L", "XL"],
    talla: "M",
    costoVendedor: 180,
    margenDeseado: 0.32,
    stock: 9,
    colores: [
      { nombre: "Beige", images: [
        "https://img.kwcdn.com/product/fancy/d4326746-5fe2-4aad-8e73-8b4460e2c0d2.jpg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/open/fc8a6ba9f4e3424896e95596583a3da4-goods.jpeg?imageView2/2/w/800/q/70/format/webp",
      ] },
    ],
    imagenes: [
      "https://img.kwcdn.com/product/fancy/d4326746-5fe2-4aad-8e73-8b4460e2c0d2.jpg?imageView2/2/w/800/q/70/format/webp",
    ],
    imagenUrl:
      "https://img.kwcdn.com/product/fancy/d4326746-5fe2-4aad-8e73-8b4460e2c0d2.jpg?imageView2/2/w/800/q/70/format/webp",
    calificacion: 4.3,
    vendidos: 6,
    sellerId: "seller-aurea",
    descripcionCorta: "Pantalón de trabajo en beige, refuerzos en rodilla y costuras resistentes.",
    materiales: ["Algodón 70%", "Poliéster 30%"],
  },
];

export function getAllProducts() {
  return baseProducts.map((p) => {
    const {
      precioFinal,
      precioAntesDescuento,
      porcentajeDescuento,
      tieneDescuento,
    } = calcularPrecioFinal(p);

    return {
      ...p,
      precioFinal,
      precioAntesDescuento,
      porcentajeDescuento,
      tieneDescuento,
      etiquetaInventario: getEtiquetaInventario(p.stock),
      tallaNumero: ordenTallas[p.talla] ?? 3,
    };
  });
}

export function getPersonalizedProductsForCurrentUser() {
  const all = getAllProducts();
  return all.filter(
    (p) =>
      p.talla === currentUser.talla &&
      (p.estilo === currentUser.estiloPreferido || p.estilo === "casual")
  );
}

export function getProductById(id) {
  return getAllProducts().find((p) => p.id === id);
}
