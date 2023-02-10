import { InputPassword, InputText } from "@/components/Inputs"
import { useAuthVisibility, useService } from "@/hooks"
import { serviceAuthRegister } from "@/services/Auth"

interface TAuthRegister {}

function AuthRegister({}: TAuthRegister) {
  const { call, error, loading, response } = useService(serviceAuthRegister)
  const {setAuthView} = useAuthVisibility()

  function submitHandler(e: React.FormEvent) {
    e.preventDefault()

    //@ts-ignore
    call(e.target.user.value,e.target.lastname.value,e.target.password.value).then(res=>{
      setAuthView("login")
    })
    
  }

  if (loading)
    return (
      <>
        <h3 className="text-4xl mb-3 mx-2">Registrando su usuario...</h3>
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
      <InputText
        title="Apellido"
        name="lastname"
        id="lastname"
      />
      <InputPassword
        title="Contraseña"
        name="password"
        id="password"
      />
      {/* <InputPassword
        title="Repita su contraseña"
        name="password_repeat"
        id="password_repeat"
      /> */}

      <button className="bg-black text-white w-max mx-auto px-2 py-0.5 rounded text-2xl">
        Registrarse
      </button>
    </form>
  )
}

export default AuthRegister
