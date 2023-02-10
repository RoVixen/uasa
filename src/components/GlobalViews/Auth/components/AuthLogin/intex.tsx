import { InputPassword, InputText } from "@/components/Inputs"
import { useAuthVisibility, useService, useSession } from "@/hooks"
import serviceAuthGetPublicKey from "@/services/Auth/serviceAuthGetPublicKey"
import serviceAuthLogin from "@/services/Auth/serviceAuthLogin"
import JSEncrypt from "jsencrypt"
import jwtDecode from "jwt-decode"

interface TAuthLogin {}

function AuthLogin({}: TAuthLogin) {
  const loginService = useService(serviceAuthLogin)
  const getKeyService = useService(serviceAuthGetPublicKey, [])

  const { setAuthView } = useAuthVisibility()

  const { state, saveSession } = useSession()

  async function submitHandler(e: React.FormEvent) {
    e.preventDefault()

    const publicKey = await getKeyService.call()
    const crypt = new JSEncrypt()
    crypt.setPublicKey(publicKey)

    const response = await loginService.call(
      //@ts-ignore
      e.target.user.value,
      //@ts-ignore
      crypt.encrypt(e.target.password.value)
    )

    //@ts-ignore
    const decoded: { _id: number; name: string } = jwtDecode(response.token)

    //@ts-ignore
    saveSession(response.token, {
      //@ts-ignore
      user: e.target.user.value,
      _id: decoded._id,
      name: decoded.name,
    })
    setAuthView(null)
  }

  if (getKeyService.loading || loginService.loading)
    return (
      <>
        <h3 className="text-4xl mb-3 mx-2">Ingresando...</h3>
      </>
    )

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col gap-3 py-4"
    >
      <InputText
        title="Nombre"
        name="user"
        id="user"
      />
      <InputPassword
        title="Contraseña"
        name="password"
        id="password"
      />

      <button className="bg-black text-white w-max mx-auto px-2 py-0.5 rounded text-2xl">
        Ingresar
      </button>
    </form>
  )
}

export default AuthLogin
