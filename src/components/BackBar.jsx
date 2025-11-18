// src/components/BackBar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function BackBar({ titulo }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 mb-3">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-[13px] text-[#111111]"
      >
        <span className="text-lg">‹</span>
        <span>Volver</span>
      </button>
      {titulo && (
        <span className="ml-2 text-[13px] font-semibold text-[#111111] truncate">
          {titulo}
        </span>
      )}
    </div>
  );
}

export default BackBar;
