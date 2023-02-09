import { useCallback, useState } from "react"

/**
 * 
 * Como parametro se pasa una funcion que retorne un callback, idealmente proveniente de la carpeta @/services
 * 
 * se usa a funcion call() que retorna este hook en vez de el servicio mismo
 */
function useService<ServiceToUse extends (...args: any) => Promise<any>>(
  service: ServiceToUse,
  args: Parameters<ServiceToUse>
) {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<Awaited<
    ReturnType<ServiceToUse>
  > | null>(null)

  const call = useCallback(
    async (...callArgs: typeof args | undefined[]) => {
      let argsToUse = [...callArgs]
      if (
        !argsToUse ||
        argsToUse.length == 0 ||
        argsToUse.every(a => a === undefined)
      )
        argsToUse = [...args]

      setLoading(true)
      setResponse(null)

      try {
        const response = await service(...argsToUse)
        setResponse(response)
      } catch (error) {}

      setLoading(false)

      return response
    },
    [service, args]
  )

  return {
    call,
    loading,
    response,
  }
}

export default useService