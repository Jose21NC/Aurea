import { useNavigate } from "react-router-dom";

function ProfileSetup() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-zinc-900">
          Configurá tu perfil
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Guardaremos estos datos para recomendarte prendas que realmente te
          quedan bien.
        </p>
      </div>

      <form
        className="space-y-3 text-sm"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-zinc-600">Talla principal</label>
            <select className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-black">
              <option>M</option>
              <option>S</option>
              <option>L</option>
              <option>XS</option>
              <option>XL</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-zinc-600">Altura aprox.</label>
            <input
              type="number"
              className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-black"
              placeholder="Ej. 170"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-zinc-600">Estilo principal</label>
          <div className="flex flex-wrap gap-2">
            {["urbano", "casual", "formal"].map((est) => (
              <button
                key={est}
                type="button"
                className={`px-3 py-1.5 rounded-full border border-zinc-200 bg-zinc-50 text-xs text-zinc-700`}
              >
                {est.charAt(0).toUpperCase() + est.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-zinc-600">
            ¿A dónde te enviamos?
          </label>
          <input
            type="text"
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-black"
            placeholder="Managua, León, etc."
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full text-sm px-4 py-2.5 rounded-full bg-black text-amber-200 font-medium hover:bg-zinc-900"
        >
          Guardar y continuar
        </button>
      </form>
    </div>
  );
}

export default ProfileSetup;
