import { useCallback, useState } from "react"

type SwaggetError = {
  message: string
  code: string
}

type SwaggetErrorObject = {
  [key: string]: SwaggetError[]
}

/**
 *
 * Como parametro se pasa una funcion que retorne un callback, idealmente proveniente de la carpeta @/services
 *
 * se usa a funcion call() que retorna este hook en vez de el servicio mismo
 * 
 * ejemplo de uso:
 * 
 * ```js
 * const {call, loading, response, error} = useService(serviceToSomeEndpoint)
 * ```
 */
function useService<ServiceToUse extends (...args: any) => Promise<unknown>>(
  service: ServiceToUse,
  args?: Parameters<ServiceToUse>
) {
  const [loading, setLoading] = useState(false)

  const [response, setResponse] = useState<Awaited<
    ReturnType<ServiceToUse>
  > | null>(null)

  const [error, setError] = useState<SwaggetErrorObject | null>(null)

  const call = useCallback(
    async (
      ...callArgs: Parameters<ServiceToUse> | undefined[]
    ): Promise<Awaited<ReturnType<ServiceToUse>>> => {
      //Validando que la funcion tenga argumentos
      let argsToUse = [...(callArgs ? callArgs : [])]

      if (
        !argsToUse ||
        argsToUse.length == 0 ||
        argsToUse.every(a => a === undefined)
      ) {
        if (!args)
          throw new Error(
            "useService, call: you didn't provided arguments for the service " +
              "on the hook call neither on the 'call' method call"
          )

        argsToUse = [...args]
      }

      //Preparacion antes de enviar
      setLoading(true)
      setResponse(null)
      setError(null)

      let response: Awaited<ReturnType<ServiceToUse>>
      try {
        // Fetch exitoso
        //////////////////////////////////
        //@ts-ignore
        response = await service(...argsToUse)
        //@ts-ignore
        setResponse(response)
      } catch (error) {
        // En caso de error
        //////////////////////////////////
        //@ts-ignore
        response = error
        //@ts-ignore
        setError(error)
      }

      setLoading(false)

      return response
    },
    [service, args]
  )

  return {
    call,
    loading,
    response,
    error,
  }
}

export default useService