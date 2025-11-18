import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="max-w-sm mx-auto bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm">
      <h1 className="text-lg font-semibold text-zinc-900 mb-1">
        Inicia sesión en Aurea
      </h1>
      <p className="text-xs text-zinc-500 mb-4">
        Guarda tu talla, estilo y direcciones para que las siguientes compras
        sean mucho más rápidas.
      </p>

      <form
        className="space-y-3 text-sm"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/perfil-inicial");
        }}
      >
        <div className="space-y-1">
          <label className="text-xs text-zinc-600">Correo electrónico</label>
          <input
            type="email"
            required
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-black"
            defaultValue="jose@example.com"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-zinc-600">Contraseña</label>
          <input
            type="password"
            required
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-black"
            defaultValue="********"
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
        ¿No tenés cuenta?{" "}
        <Link to="/registro" className="text-zinc-900 font-medium">
          Crear cuenta
        </Link>
      </p>
    </div>
  );
}

export default Login;
