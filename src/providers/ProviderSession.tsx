import { PropsWithChildren, useReducer } from "react"
import { contextSession } from "./contexts"
import Cookies from "js-cookie"
import { SessionAction, SessionActions, SessionState } from "./types"

function reducerSession<Type extends keyof SessionActions>(
  state: SessionState,
  { type, payload }: SessionAction<Type>
) {
  switch (type) {
    case "save":
      return payload

    case "patch":
      return {
        ...state,
        ...payload,
      }

    default:
      return state
  }
}

function ProviderSession({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducerSession, {
    token: Cookies.get("token"),
    userData: JSON.parse(localStorage.getItem("userData") || "{}") || {},
    privateKey:"",
    publicKey:"",
  })

  return (
    <contextSession.Provider value={{ state, dispatch }}>
      {children}
    </contextSession.Provider>
  )
}

export default ProviderSession
