import { useAuthVisibility } from "@/hooks"
import React from "react"
import { AuthRegister } from "./components"
import AuthLogin from "./components/AuthLogin/intex"

interface TAuth {}

function Auth({}: TAuth) {
  const { auth, setAuthView } = useAuthVisibility()

  function close() {
    setAuthView(null)
  }

  function bgClickhandler(e: React.MouseEvent) {
    //@ts-ignore
    if (e.target.id == "auth_bg") close()
  }

  if (!auth) return <></>

  return (
    <div
      id="auth_bg"
      className="fixed w-screen h-screen bg-[#00000056] flex justify-center items-center"
      onClick={bgClickhandler}
    >
      <section className="bg-white px-4 py-2 pt-8 rounded relative">
        <div
          onClick={close}
          className="absolute top-1 right-4 bg-gray-700 rounded-full px-2 py-0.5 text-white font-extrabold select-none cursor-pointer"
        >
          X
        </div>

        {
          {
            login: <AuthLogin />,
            register: <AuthRegister />,
          }[auth]
        }
      </section>
    </div>
  )
}

export default Auth
