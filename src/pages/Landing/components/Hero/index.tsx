import { ROUTES } from "@/config"
import { useAuthVisibility, useSession } from "@/hooks"
import { Link } from "react-router-dom"

interface THero {}

function Hero({}: THero) {
  const { auth, setAuthView } = useAuthVisibility()
  const {
    state: { token, userData },
    logOut,
  } = useSession()

  return (
    <header className="bg-slate-500 w-full h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="text-9xl">UASA 2.0</h1>
      <div className="flex gap-8 text-xl">
        {/* Si sesion */}
        {!token && (
          <>
            <button
              onClick={() => setAuthView("login")}
              className="bg-black text-white px-2 py-1 rounded"
            >
              Ingresar
            </button>
            <button
              onClick={() => setAuthView("register")}
              className="bg-black text-white px-2 py-1 rounded"
            >
              Registrarse
            </button>
          </>
        )}

        {/* Con sesion */}
        {token && (
          <>
            <div>
              <h2>Bienvenido {userData?.user}</h2>
              <button
                onClick={logOut}
                className="bg-black text-white px-2 py-1 rounded"
              >
                Terminar Sesión
              </button>
              {" "}
              <Link
                to={ROUTES.chat}
                className="bg-black text-white px-2 py-1 rounded"
              >
                Ir al chat
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default Hero
