import { AuthView } from "@/types"
import { useCallback, useMemo } from "react"
import { useSearchParams } from "react-router-dom"

const authViews = ["login", "register"]

function useAuthVisibility() {
  const [searchParams, setSearchParams] = useSearchParams()

  //@ts-ignore
  const auth: AuthView | null = useMemo(() => {
    const gotAuth = searchParams.get("auth") || ""

    if (authViews.includes(gotAuth)) return gotAuth

    return null
  }, [searchParams.get("auth")])

  const setAuthView = useCallback(
    (toSetAuth: AuthView | null) => {
      if (toSetAuth == auth) return

      if (toSetAuth == null) searchParams.delete("auth")
      else searchParams.set("auth", toSetAuth)

      setSearchParams(searchParams)
    },
    [setSearchParams, searchParams, auth]
  )

  return {
    auth,
    setAuthView,
  }
}

export default useAuthVisibility
