// src/pages/ProductDetail.jsx
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getAllProducts } from "../data/products.js";
import { currentUser } from "../data/user.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";

function ProductDetail() {
  const params = useParams();
  const idString = params.id != null ? String(params.id) : null;
  const navigate = useNavigate();

  const product = getAllProducts().find((p) => String(p.id) === idString);
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = product ? isFavorite(product.id) : false;

  

  // Imágenes del producto
  const imagenes =
    (product?.imagenes && product.imagenes.length > 0
      ? product.imagenes
      : [
          product?.imagenUrl,
          "https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/6311650/pexels-photo-6311650.jpeg?auto=compress&cs=tinysrgb&w=600",
        ])?.filter(Boolean) || [];

  const [activeImage, setActiveImage] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [isTryOnZoomOpen, setIsTryOnZoomOpen] = useState(false);
  const [isTryOnLoading, setIsTryOnLoading] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isCombining, setIsCombining] = useState(false);
  const [hasCombinations, setHasCombinations] = useState(false);

  // Tallas
  const tallasDisponibles =
    product?.tallas && product.tallas.length > 0
      ? product.tallas
      : ["XS", "S", "M", "L", "XL"];
  const [tallaSeleccionada, setTallaSeleccionada] = useState(
    product?.talla || tallasDisponibles[2] || "M"
  );

  // Estilos visuales (defaults)
  const defaultStyleOptions = [
    { id: "look1", label: "Look 1", imageUrl: imagenes[0] || "https://picsum.photos/seed/look1/200/260" },
    { id: "look2", label: "Look 2", imageUrl: imagenes[1] || "https://picsum.photos/seed/look2/200/260" },
    { id: "look3", label: "Look 3", imageUrl: imagenes[2] || "https://picsum.photos/seed/look3/200/260" },
  ];

  const styleOptions = product?.estilosVisuales && product.estilosVisuales.length ? product.estilosVisuales : defaultStyleOptions;
  const [estiloSeleccionado, setEstiloSeleccionado] = useState(styleOptions[0]?.id || "look1");

  const estiloBaseTexto = product?.estilo || "Urbano";
  const estiloVarianteTexto = styleOptions.find((s) => s.id === estiloSeleccionado)?.label || "Estilo seleccionado";
  const stockTexto = product?.stockEstado || "Stock normal";

  // Cantidad
  const [cantidad, setCantidad] = useState(1);
  const incrementarCantidad = () => setCantidad((c) => (c < 10 ? c + 1 : c));
  const decrementarCantidad = () => setCantidad((c) => (c > 1 ? c - 1 : c));
  const subtotal = (product?.precioFinal ?? 0) * cantidad;

  // Puntuación de Aura (1–10 con un decimal)
  const baseCal = product?.calificacion ?? 4.5;
  let rawScore = 7.5 + (baseCal - 3) * 0.8;
  if (rawScore > 9.7) rawScore = 9.7;
  if (rawScore < 7.5) rawScore = 7.5;
  const aureaScore = Number(rawScore.toFixed(1));

  // Estilo actual (para probador e imagen)
  const currentStyle = styleOptions.find((s) => s.id === estiloSeleccionado) || styleOptions[0] || null;

  // Si el producto tiene una imagen ya generada para el probador (probadorUrl),
  // la usamos cuando se abre el modal de "Probar con IA".
    const probadorVariant = product?.colores && product.colores.length > 0 ? product.colores[0].nombre : null;

  // Lista de productos que ya tienen probador IA generado (excluye el actual)
  const productsWithTryOn = getAllProducts().filter((p) => p.probadorUrl && String(p.id) !== String(product?.id));

  // URL base del probador: se puede personalizar desde Perfil (localStorage)
  const getTryOnBaseUrl = () => {
    try {
      return (
        window.localStorage.getItem("aurea:tryOnBaseImageUrl") ||
        currentUser.tryOnBaseImageUrl ||
        "https://firebasestorage.googleapis.com/v0/b/aurea-marketplace.firebasestorage.app/o/ropa%2FGemini_Generated_Image_li87k9li87k9li87.png?alt=media&token=1d2504ba-6ecc-4d8a-8a3e-12f4a4295ab5"
      );
    } catch (e) {
      return (
        currentUser.tryOnBaseImageUrl ||
        "https://firebasestorage.googleapis.com/v0/b/aurea-marketplace.firebasestorage.app/o/ropa%2FGemini_Generated_Image_li87k9li87k9li87.png?alt=media&token=1d2504ba-6ecc-4d8a-8a3e-12f4a4295ab5"
      );
    }
  };

  // Helpers para personalizar el contenido del probador según la prenda
  const primaryColor = (product?.colores && product.colores[0] && product.colores[0].nombre) || "";

  const colorimetryFor = (colorName) => {
    const c = (colorName || "").toLowerCase();
    if (!c) return "neutra";
    if (c.includes("amar") || c.includes("beig") || c.includes("naranja") || c.includes("rojo") || c.includes("rosa")) return "cálida";
    if (c.includes("azul") || c.includes("verde") || c.includes("gris") || c.includes("negro") || c.includes("blanco")) return "neutra";
    return "neutra";
  };

  const ajusteRecomendadoFor = (style) => {
    switch ((style || "").toLowerCase()) {
      case "deportivo":
        return { label: "relajado", description: "Corte deportivo: cómodo, con libertad de movimiento y buena ventilación." };
      case "formal":
        return { label: "entallado", description: "Corte elegante y estructurado para una silueta pulida en oficina y eventos." };
      case "street":
      case "urbano":
        return { label: "oversize", description: "Corte amplio y moderno: ideal para superponer y crear volumen urbano." };
      case "verano":
        return { label: "holgado", description: "Corte fresco y ligero, pensado para climas cálidos y movimiento libre." };
      case "workwear":
        return { label: "regular", description: "Corte resistente y funcional, pensado para uso diario y trabajo." };
      case "vintage":
        return { label: "relajado", description: "Corte inspirado en tendencias retro, cómodo y con caída natural." };
      default:
        return { label: "regular", description: "Corte estándar, cómodo y versátil para distintas ocasiones." };
    }
  };
  const lookRecommendationsFor = (style) => {
    switch ((style || "").toLowerCase()) {
      case "deportivo":
        return ["Tenis deportivos blancos", "Jogger o short técnico", "Gorra deportiva minimal"];
      case "formal":
        return ["Zapatos oxford en cuero", "Pantalón sastre oscuro", "Reloj clásico"];
      case "street":
      case "urbano":
        return ["Zapatillas chunky", "Chaqueta bomber o denim", "Gorro beanie o riñonera"];
      case "workwear":
        return ["Botas resistentes", "Cinturón utilitario", "Chaqueta tipo overcoat"];
      case "vintage":
        return ["Zapatos retro", "Cinturón ancho", "Accesorios dorados discretos"];
      default:
        return ["Tenis blancos limpios", "Chaqueta ligera", "Bolso cruzado pequeño"];
    }
  };

  const ajusteInfo = ajusteRecomendadoFor(product.estilo);
  const recommendedLook = lookRecommendationsFor(product.estilo);
  const colorimetry = colorimetryFor(primaryColor);

  // Tap en imagen principal: centro = zoom, bordes = siguiente imagen
  const handleImageAreaClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const relX = x / rect.width;
    const relY = y / rect.height;

    const inCenter = relX >= 0.33 && relX <= 0.67 && relY >= 0.33 && relY <= 0.67;

    if (inCenter) {
      setIsZoomOpen(true);
    } else {
      setActiveImage((prev) => (prev + 1) % imagenes.length);
    }
  };

  const handleDotClick = (e, index) => {
    e.stopPropagation();
    setActiveImage(index);
  };
  const handleAddToCart = () => {
    setIsCartModalOpen(true);
  };

  const handleCombineClick = () => {
    setHasCombinations(false);
    setIsCombining(true);
    setTimeout(() => {
      setIsCombining(false);
      setHasCombinations(true);
    }, 1700);
  };

  const handleOpenTryOn = (e) => {
    e.stopPropagation();
    setIsZoomOpen(false);
    setIsTryOnOpen(true);
    setIsTryOnLoading(true);
    setIsCombining(false);
    setHasCombinations(false);

    setTimeout(() => {
      setIsTryOnLoading(false);
    }, 1400);
  };

  const handleCloseTryOn = () => {
    setIsTryOnOpen(false);
    setIsTryOnLoading(false);
    setIsCombining(false);
    setHasCombinations(false);
  };

  if (!product) {
    return (
      <div className="pt-4 px-4">
        <p className="text-sm text-[#111111]">Prenda no encontrada.</p>
      </div>
    );
  }

  return (
    <div className="pt-4 pb-24 px-4 space-y-4 relative">
      {/* Cabecera: Aurea con botón volver */}
      <div className="flex items-center justify-between mb-1">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-[13px] text-[#111111] px-2 py-1 rounded-lg"
        >
          ← Volver
        </button>

        <p className="text-[18px] font-semibold text-[#111111] tracking-tight">
          Aurea
        </p>

        {/* placeholder para mantener el título centrado */}
        <div className="w-16" />
      </div>

      {/* Imagen a ancho completo con fade superior */}
      <div className="-mx-4 relative">
        <div className="rounded-b-[28px] overflow-hidden bg-[#F4F4F7]">
          <div
            className="relative w-full aspect-[4/5]"
            onClick={handleImageAreaClick}
          >
            {imagenes.map((src, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  index === activeImage ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={src}
                  alt={`${product.nombre} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Corazón */}
            <button
              type="button"
              className={`absolute top-3 right-5 h-8 w-8 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] flex items-center justify-center text-[17px] ${
                favorite ? "text-[#FF4D4F]" : "text-[#111111]"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (product?.id != null) {
                  toggleFavorite(product.id);
                }
              }}
            >
              {favorite ? "❤" : "♡"}
            </button>

            {/* Botón PROBAR CON IA */}
            <button
              type="button"
              className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#111111] to-[#333333] text-[11px] text-white font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.35)] flex items-center gap-1.5"
              onClick={handleOpenTryOn}
            >
              <span className="text-[13px]">✨</span>
              <span>Probar con IA</span>
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {imagenes.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={(e) => handleDotClick(e, index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeImage
                      ? "w-4 bg-white"
                      : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Fade en borde superior */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[#F5F5F8] to-transparent" />
      </div>

      {/* Overlay de zoom */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70"
          onClick={() => setIsZoomOpen(false)}
        >
          <div className="w-full max-w-sm">
            <div className="mx-4 rounded-[28px] overflow-hidden bg-black">
              <img
                src={imagenes[activeImage]}
                alt={product.nombre}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="mt-2 text-center text-[11px] text-white/80">
              Toca para cerrar
            </p>
          </div>
        </div>
      )}

      {/* Zoom de la imagen del probador (siempre por encima del modal) */}
      {isTryOnZoomOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80"
          onClick={() => setIsTryOnZoomOpen(false)}
        >
          <div className="w-full max-w-sm">
            <div className="mx-4 rounded-[28px] overflow-hidden bg-black">
              <img
                src={product.probadorUrl || getTryOnBaseUrl()}
                alt="Vista previa probador grande"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="mt-2 text-center text-[11px] text-white/80">
              Toca para cerrar
            </p>
          </div>
        </div>
      )}

      {/* Probador con IA */}
      {isTryOnOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-sm px-4">
            <div className="bg-white rounded-[28px] px-4 py-4 space-y-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
              {/* Header */}
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-[#111111]">
                  Probador con IA
                </p>
                <button
                  type="button"
                  className="text-[18px] text-[#A3A3AE]"
                  onClick={handleCloseTryOn}
                >
                  ×
                </button>
              </div>

              {isTryOnLoading ? (
                <>
                  {/* Estado "pensando" */}
                  <div className="rounded-2xl overflow-hidden bg-[#F4F4F7] h-40 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-10 w-10 rounded-full border-2 border-[#111111] border-t-transparent animate-spin" />
                      <p className="text-[11px] text-[#55555F] font-medium">
                        Ajustando la prenda a tu perfil…
                      </p>
                    </div>
                  </div>
                  <div className="mt-1 rounded-xl bg-[#F5F3FF] px-2.5 py-2">
                    <p className="text-[10px] font-semibold text-[#4C1D95] mb-1">
                      Analizando
                    </p>
                    <p className="text-[11px] text-[#4C1D95] mb-2">
                      Tomando en cuenta tus medidas, estilo guardado y clima en{" "}
                      {currentUser.ciudad || "tu ciudad"} para sugerirte el
                      mejor ajuste.
                    </p>
                    <div className="w-full h-1.5 rounded-full bg-[#E4E4EA] overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-[#4C1D95] via-[#7C3AED] to-[#C4B5FD] animate-pulse" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Imagen IA (clic para ver en grande) */}
                  <div
                    className="rounded-2xl overflow-hidden bg-[#F4F4F7] h-48 flex items-center justify-center cursor-zoom-in"
                    onClick={() => setIsTryOnZoomOpen(true)}
                  >
                    <img
                      src={product.probadorUrl || getTryOnBaseUrl()}
                      alt="Vista previa probador"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Badges resumen (personalizados por prenda) */}
                  <div className="flex flex-wrap gap-2 text-[10px]">
                    <span className="px-2.5 py-1 rounded-full bg-[#111111] text-white font-medium flex items-center gap-1">
                      <span>✨</span>
                      <span>Perfil conectado</span>
                    </span>
                    {probadorVariant && (
                      <span className="px-2.5 py-1 rounded-full bg-[#F3F4F6] text-[#111827] font-medium">
                        Variante mostrada: {probadorVariant}
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] font-medium">
                      Ajuste: {ajusteInfo.label}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] font-medium">
                      Colorimetría: {colorimetry}
                    </span>
                    {product.materiales && (
                      <span className="px-2.5 py-1 rounded-full bg-[#F7F7FB] text-[#111827] font-medium">
                        Materiales: {product.materiales.slice(0,2).join(", ")}
                      </span>
                    )}
                  </div>

                  {/* Métricas IA (personalizadas) */}
                  <div className="space-y-2 text-[11px] text-[#55555F] leading-relaxed">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-[#111111]">
                        Puntuación Aura — ajuste sugerido para tu perfil
                      </p>
                      <span className="text-[12px] font-bold text-[#16A34A]">
                        {aureaScore.toFixed(1)}/10
                      </span>
                    </div>

                    {/* Barra de puntuación */}
                    <div className="w-full h-2 rounded-full bg-[#E4E4EA] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF6B95] via-[#FFB347] to-[#22C55E]"
                        style={{ width: `${(aureaScore / 10) * 100}%` }}
                      />
                    </div>

                    {/* Grid de detalles personalizados */}
                    <div className="grid grid-cols-2 gap-3 mt-1">
                      <div className="rounded-xl bg-[#F9FAFB] px-2.5 py-2">
                        <p className="text-[10px] font-semibold text-[#111111] mb-1">
                          Ajuste recomendado
                        </p>
                        <p className="text-[11px]">{ajusteInfo.description}</p>
                      </div>

                      <div className="rounded-xl bg-[#F9FAFB] px-2.5 py-2">
                        <p className="text-[10px] font-semibold text-[#111111] mb-1">
                          Colorimetría
                        </p>
                        <p className="text-[11px]">
                          {primaryColor ? (
                            <>El tono <span className="font-medium">{primaryColor}</span> sugiere una paleta <span className="font-medium">{colorimetry}</span>, que combina bien con accesorios adecuados.</>
                          ) : (
                            <>Paleta neutra: combina con dorados y tonos tierra.</>
                          )}
                        </p>
                      </div>

                      <div className="rounded-xl bg-[#ECFEFF] px-2.5 py-2 col-span-2">
                        <p className="text-[10px] font-semibold text-[#0F766E] mb-1">
                          Recomendación de look
                        </p>
                        <ul className="text-[11px] text-[#155E75] list-disc pl-4 space-y-1">
                          {recommendedLook.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Estado de combinaciones / sugerencias */}
                    {isCombining && (
                      <div className="mt-2 rounded-xl bg-[#F5F3FF] px-2.5 py-2">
                        <p className="text-[10px] font-semibold text-[#4C1D95] mb-1">
                          Creando combinaciones
                        </p>
                        <p className="text-[11px] text-[#4C1D95] mb-2">
                          Analizando tu estilo, clima en tu ciudad y prendas
                          similares que suelen comprar usuarios como vos...
                        </p>
                        <div className="w-full h-1.5 rounded-full bg-[#E4E4EA] overflow-hidden">
                          <div className="h-full w-2/3 bg-gradient-to-r from-[#4C1D95] via-[#7C3AED] to-[#C4B5FD] animate-pulse" />
                        </div>
                      </div>
                    )}

                    {!isCombining && hasCombinations && (
                      <div className="mt-2 rounded-xl bg-[#F5F3FF] px-2.5 py-2">
                        <p className="text-[10px] font-semibold text-[#4C1D95] mb-1">
                          Combinaciones sugeridas
                        </p>
                        <div className="flex gap-2 text-[11px] text-[#4C1D95]">
                          <div className="flex-1 space-y-1">
                            <p>
                              •{" "}
                              <span className="font-semibold">
                                Sandalias nude minimalistas
                              </span>{" "}
                              y bolso pequeño cruzado.
                            </p>
                            <p>
                              •{" "}
                              <span className="font-semibold">
                                Chaqueta denim ligera
                              </span>{" "}
                              para noches frescas.
                            </p>
                          </div>
                          <div className="flex-1 space-y-1">
                            <p>
                              •{" "}
                              <span className="font-semibold">
                                Aretes dorados delicados
                              </span>{" "}
                              y pulsera fina.
                            </p>
                            <p>
                              •{" "}
                              <span className="font-semibold">
                                Tenis blancos limpios
                              </span>{" "}
                              para mantener el look urbano y cómodo.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Botones inferiores del probador */}
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      className="flex-1 rounded-full border border-[#E4E4EA] text-[12px] text-[#111111] py-2"
                      onClick={handleCombineClick}
                      disabled={isCombining}
                    >
                      Combinar prenda
                    </button>
                    <button
                      type="button"
                      className="flex-1 rounded-full bg-[#111111] text-white text-[12px] font-medium py-2"
                      onClick={handleCloseTryOn}
                    >
                      Cerrar probador
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Info principal */}
      <section className="space-y-3">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-[#111111] leading-snug">
            {product.nombre}
          </h1>
          <p className="text-[12px] text-[#70707A]">
            {estiloBaseTexto.toLowerCase()} · Talla {tallaSeleccionada} ·{" "}
            {estiloVarianteTexto}
          </p>
          <p className="text-[11px] text-[#A3A3AE]">
            Configuración de perfil: {currentUser.talla || "talla M"},{" "}
            {currentUser.ciudad || "Managua"}.
          </p>
        </div>

        {/* Precio + rating + Puntuación de Aura en la misma fila */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-3xl font-semibold text-[#111111]">
              C$
              {product.precioFinal.toLocaleString("es-NI", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
            <div className="flex flex-col items-end gap-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#111111] text-[11px] text-white font-medium">
                <span>⭐</span>
                <span>{(product.calificacion ?? 4.6).toFixed(1)}</span>
                <span>·</span>
                <span>
                  {(product.vendidos ?? 74).toLocaleString("es-NI")} vendidos
                </span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ECFEFF] text-[11px] text-[#0F766E] font-semibold">
                <span className="text-[12px]">◎</span>
                <span>Puntuación de Aura</span>
                <span>{aureaScore.toFixed(1)}/10</span>
              </span>
            </div>
          </div>

          <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-[#E4E4EA] text-[11px] text-[#55555F]">
            {stockTexto}
          </span>
        </div>

        {/* Estilos */}
        <div className="space-y-2">
          <p className="text-[13px] font-semibold text-[#111111]">
            Estilo / variante
          </p>
          <div className="flex flex-wrap gap-2">
            {styleOptions.map((s, index) => {
              const active = s.id === estiloSeleccionado;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setEstiloSeleccionado(s.id);
                    setActiveImage(index % imagenes.length);
                  }}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className={`h-10 w-16 rounded-[10px] overflow-hidden border ${
                      active ? "border-[#111111]" : "border-[#E4E4EA]"
                    }`}
                  >
                    <div
                      className="w-full h-full bg-center bg-cover"
                      style={{
                        backgroundImage: `url(${s.imageUrl})`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-[#70707A]">
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Talla + Cantidad */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-[13px] font-semibold text-[#111111]">Talla</p>
            <div className="flex flex-wrap gap-2">
              {tallasDisponibles.map((t) => {
                const active = t === tallaSeleccionada;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTallaSeleccionada(t)}
                    className={`px-3 py-1.5 rounded-full text-[12px] border transition-colors ${
                      active
                        ? "bg-[#111111] text-white border-[#111111]"
                        : "bg-white text-[#41414A] border-[#E4E4EA]"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[13px] font-semibold text-[#111111]">
              Cantidad
            </p>
            <div className="inline-flex items-center rounded-full border border-[#E4E4EA] bg-white px-2 py-1">
              <button
                type="button"
                className="h-6 w-6 rounded-full flex items-center justify-center text-[16px] text-[#111111]"
                onClick={decrementarCantidad}
                disabled={cantidad <= 1}
              >
                −
              </button>
              <span className="px-3 text-[12px] text-[#111111] min-w-[24px] text-center">
                {cantidad}
              </span>
              <button
                type="button"
                className="h-6 w-6 rounded-full flex items-center justify-center text-[16px] text-[#111111]"
                onClick={incrementarCantidad}
                disabled={cantidad >= 10}
              >
                +
              </button>
            </div>
            <p className="text-[10px] text-[#A3A3AE]">
              Máx. 10 unidades (demo).
            </p>
          </div>
        </div>

        {/* Descripción */}
        <div className="space-y-2 text-[12px] text-[#55555F] leading-relaxed">
          <p>
            Prenda ligera para tardes cálidas, con caída suave. Pensada para
            combinar con tenis blancos o sandalias minimalistas.
          </p>
          <p>
            El precio mostrado ya incluye envío hasta tu dirección en{" "}
            {currentUser.ciudad || "Managua"}. Los descuentos se ajustan según
            la rotación de inventario y el margen configurado por el vendedor.
          </p>
          <p className="text-[11px] text-[#A3A3AE]">
            Materiales: Rayón 70% · Viscosa 30% (referencial).
          </p>
        </div>
      </section>

      {/* Vendedor */}
      <section className="space-y-2">
        <h2 className="text-[13px] font-semibold text-[#111111]">Vendedor</h2>

        <div className="rounded-3xl bg-[#F7F7FB] px-3 py-3 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-[#E4E4EA]">
            <img
              src={
                product.vendedor?.avatarUrl ||
                "https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=200"
              }
              alt={product.vendedor?.nombre || "Luna Casual"}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <p className="text-[13px] font-medium text-[#111111]">
              {product.vendedor?.nombre || "Luna Casual"}
            </p>
            <p className="text-[11px] text-[#70707A]">
              {product.vendedor?.estilo || "Casual / diario"} ·{" "}
              {product.vendedor?.ciudad || "León"}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#70707A]">
              <span>⭐ 4.6</span>
              <span>
                ·{" "}
                {(product.vendedor?.seguidores ?? 4600).toLocaleString("es-NI")}{" "}
                seguidores
              </span>
            </div>
          </div>

          <button
            type="button"
            className="px-3 py-1 rounded-full bg-[#111111] text-[11px] text-white font-medium"
          >
            Ver tienda
          </button>
        </div>
      </section>

      {/* Comentarios */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-[13px] font-semibold text-[#111111]">
            Comentarios
          </h2>
          <button className="text-[11px] text-[#9696A1]">Ver todos</button>
        </div>

        <div className="space-y-2">
          <div className="rounded-2xl bg-[#F7F7FB] px-3 py-2">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-medium text-[#111111]">
                María G.
              </p>
              <span className="text-[10px] text-[#A3A3AE]">Hace 2 días</span>
            </div>
            <p className="mt-1 text-[11px] text-[#55555F]">
              La talla coincide perfecto con mi perfil de Aurea y el envío fue
              rapidísimo.
            </p>
          </div>

          <div className="rounded-2xl bg-[#F7F7FB] px-3 py-2">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-medium text-[#111111]">
                Daniela R.
              </p>
              <span className="text-[10px] text-[#A3A3AE]">
                Hace 1 semana
              </span>
            </div>
            <p className="mt-1 text-[11px] text-[#55555F]">
              El color es igual a las fotos y el tejido se siente fresco para el
              clima de Nicaragua.
            </p>
          </div>
        </div>
      </section>

      {/* Prendas que tienen probador IA */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-[13px] font-semibold text-[#111111]">
            Prendas con probador IA
          </h2>
          <span className="text-[11px] text-[#9696A1]">
            {productsWithTryOn.length} disponibles
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto py-2">
          {productsWithTryOn.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="min-w-[120px] rounded-2xl bg-[#F7F7FB] p-2 flex-shrink-0"
            >
              <div className="h-20 w-full rounded-lg overflow-hidden bg-[#EDEEF2]">
                <img
                  src={p.probadorUrl || p.imagenUrl}
                  alt={p.nombre}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[11px] mt-2 text-[#111111]">{p.nombre}</p>
            </Link>
          ))}
          {productsWithTryOn.length === 0 && (
            <p className="text-[12px] text-[#9696A1]">No hay prendas con probador IA aún.</p>
          )}
        </div>
      </section>

      {/* Barra de subtotal + Agregar al carrito (un poco más abajo) */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 z-30">
        <div className="bg-white rounded-3xl shadow-[0_6px_20px_rgba(0,0,0,0.15)] px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] text-[#A3A3AE]">Subtotal</p>
            <p className="text-[14px] font-semibold text-[#111111]">
              C$
              {subtotal.toLocaleString("es-NI", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
          <button
            type="button"
            className="rounded-full bg-[#111111] text-white text-[12px] font-medium py-2 px-4 flex-none"
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </button>
        </div>
      </div>

      {/* Modal de confirmación carrito */}
      {isCartModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-xs px-4">
            <div className="bg-white rounded-3xl px-4 py-4 space-y-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
              <p className="text-[13px] font-semibold text-[#111111]">
                Agregado al carrito
              </p>
              <p className="text-[12px] text-[#55555F]">
                {cantidad} × {product.nombre}
              </p>
              <p className="text-[12px] text-[#111111] font-medium">
                Subtotal: C$
                {subtotal.toLocaleString("es-NI", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  className="flex-1 rounded-full border border-[#E4E4EA] text-[12px] text-[#111111] py-1.5"
                  onClick={() => setIsCartModalOpen(false)}
                >
                  Seguir viendo
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-full bg-[#111111] text-[12px] text-white py-1.5"
                  onClick={() => setIsCartModalOpen(false)}
                >
                  Ver carrito (demo)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
