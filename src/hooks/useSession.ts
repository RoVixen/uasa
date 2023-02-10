import { contextSession } from "@/providers"
import { UserData } from "@/providers/types"
import Cookies from "js-cookie"
import { useCallback, useContext } from "react"
import JSEncrypt from "jsencrypt"

function useSession() {
  const { state, dispatch } = useContext(contextSession)

  const saveSession = useCallback(
    (token: string, userData: UserData) => {
      Cookies.set("token", token)
      localStorage.setItem("userData", JSON.stringify(userData))

      dispatch({
        type: "save",
        payload: {
          token,
          userData,
        },
      })
    },
    [dispatch]
  )

  const logOut = useCallback(() => {
    Cookies.remove("token")
    localStorage.removeItem("userData")

    dispatch({
      payload: {},
      type: "save",
    })
  }, [dispatch])

  const createPublicPrivateKey = useCallback(() => {
    const crypt = new JSEncrypt({ default_key_size: "2048" })
    const privateKey = crypt.getPrivateKey()
    const publicKey = crypt.getPublicKey()

    dispatch({
      type: "patch",
      payload: {
        privateKey,
        publicKey,
      },
    })

    return {
      privateKey,
      publicKey,
    }
  }, [dispatch])

  return {
    saveSession,
    logOut,
    createPublicPrivateKey,
    state,
  }
}

export default useSession
