import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  return (
    <div className="max-w-sm mx-auto bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm">
      <h1 className="text-lg font-semibold text-zinc-900 mb-1">
        Crear cuenta en Aurea
      </h1>
      <p className="text-xs text-zinc-500 mb-4">
        Empezá guardando tu información básica. Luego podrás ajustar tu perfil
        de estilo.
      </p>

      <form
        className="space-y-3 text-sm"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/perfil-inicial");
        }}
      >
        <div className="space-y-1">
          <label className="text-xs text-zinc-600">Nombre</label>
          <input
            type="text"
            required
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-black"
            defaultValue="José"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-zinc-600">Correo electrónico</label>
          <input
            type="email"
            required
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-black"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-zinc-600">Contraseña</label>
          <input
            type="password"
            required
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-black"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full text-sm px-4 py-2.5 rounded-full bg-black text-amber-200 font-medium hover:bg-zinc-900"
        >
          Continuar
        </button>
      </form>

      <p className="mt-4 text-xs text-zinc-500 text-center">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" className="text-zinc-900 font-medium">
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
}

export default Register;
