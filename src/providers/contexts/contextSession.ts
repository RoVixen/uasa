import Cookies from "js-cookie"
import { createContext } from "react"
import { SessionAction, SessionActions, SessionState } from "../types"

const contextSession = createContext<{
  state: SessionState
  dispatch: React.Dispatch<SessionAction<keyof SessionActions>>
}>({
  state: {
    token: Cookies.get("token"),
    userData: JSON.parse(localStorage.getItem("userData") || "{}"),
    privateKey:"",
    publicKey:"",
  },
  dispatch: (...args) => {
    console.log("from contextSession", ...args)
  },
})

export default contextSession
