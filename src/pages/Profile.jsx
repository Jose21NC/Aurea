import React, { useEffect, useState } from "react";
import { currentUser } from "../data/user.jsx";

function Profile() {
  const getBaseUrl = () => {
    try {
      return (
        window.localStorage.getItem("aurea:tryOnBaseImageUrl") ||
        currentUser.tryOnBaseImageUrl ||
        "https://firebasestorage.googleapis.com/v0/b/aurea-marketplace.firebasestorage.app/o/ropa%2FGemini_Generated_Image_li87k9li87k9li87.png?alt=media&token=1d2504ba-6ecc-4d8a-8a3e-12f4a4295ab5"
      );
    } catch {
      return (
        currentUser.tryOnBaseImageUrl ||
        "https://firebasestorage.googleapis.com/v0/b/aurea-marketplace.firebasestorage.app/o/ropa%2FGemini_Generated_Image_li87k9li87k9li87.png?alt=media&token=1d2504ba-6ecc-4d8a-8a3e-12f4a4295ab5"
      );
    }
  };

  const [tryOnUrl, setTryOnUrl] = useState(getBaseUrl());
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  useEffect(() => {
    setTryOnUrl(getBaseUrl());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeImage = () => {
    const url = window.prompt("Pega la nueva URL de tu imagen base del probador:", tryOnUrl);
    if (!url) return;
    try {
      window.localStorage.setItem("aurea:tryOnBaseImageUrl", url);
      setTryOnUrl(url);
    } catch (e) {
      console.error("No se pudo guardar en localStorage", e);
      setTryOnUrl(url);
    }
  };

  return (
    <div className="pt-4 px-4 space-y-5">
      <div className="flex justify-center">
        <p className="text-[13px] font-medium text-[#111111]">
          Perfil
        </p>
      </div>

      <section className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-[#111111] text-white flex items-center justify-center text-sm font-semibold">
          J
        </div>
        <div>
          <p className="text-[14px] font-semibold text-[#111111]">
            {currentUser.nombre || "José"}
          </p>
          <p className="text-[12px] text-[#70707A]">
            {currentUser.ciudad || "Managua"}, Nicaragua
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-[13px] font-semibold text-[#111111]">
          Configuración de talla
        </h2>
        <div className="rounded-3xl bg-[#F7F7FB] px-3 py-3 text-[12px] text-[#55555F]">
          <p>
            Talla guardada:{" "}
            <span className="font-medium">
              {currentUser.talla || "M"}
            </span>
          </p>
          <p>
            Estilo preferido:{" "}
            <span className="font-medium">
              {currentUser.estilo || "Urbano / casual"}
            </span>
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-[13px] font-semibold text-[#111111]">
          Preferencias
        </h2>
        <div className="space-y-2 text-[12px] text-[#55555F]">
          <button className="w-full text-left px-3 py-2 rounded-2xl bg-[#F7F7FB]">
            Colores favoritos
          </button>
          <button className="w-full text-left px-3 py-2 rounded-2xl bg-[#F7F7FB]">
            Estilos que no te gustan
          </button>
          <button className="w-full text-left px-3 py-2 rounded-2xl bg-[#F7F7FB]">
            Direcciones de envío
          </button>
        </div>
      </section>

      {/* Imagen base del probador */}
      <section className="space-y-2">
        <h2 className="text-[13px] font-semibold text-[#111111]">Imagen base del probador</h2>
        <div className="rounded-3xl bg-[#F7F7FB] p-3">
          <div
            className="h-48 w-full rounded-2xl overflow-hidden bg-[#EDEEF2] flex items-center justify-center cursor-zoom-in"
            onClick={() => setIsZoomOpen(true)}
          >
            <img src={tryOnUrl} alt="Imagen base del probador" className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              className="flex-1 rounded-full bg-[#111111] text-white text-[12px] font-medium py-2"
              onClick={handleChangeImage}
            >
              Cambiar imagen
            </button>
            <button
              type="button"
              className="flex-1 rounded-full border border-[#E4E4EA] text-[#111111] text-[12px] py-2"
              onClick={() => setIsZoomOpen(true)}
            >
              Ver en grande
            </button>
          </div>
          <p className="text-[11px] text-[#70707A] mt-2">
            Consejo: usa una foto frontal con buena iluminación. Guardamos el enlace localmente en tu dispositivo.
          </p>
        </div>
      </section>

      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setIsZoomOpen(false)}
        >
          <div className="w-full max-w-sm">
            <div className="mx-4 rounded-[28px] overflow-hidden bg-black">
              <img src={tryOnUrl} alt="Imagen base probador grande" className="w-full h-full object-contain" />
            </div>
            <p className="mt-2 text-center text-[11px] text-white/80">Toca para cerrar</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
