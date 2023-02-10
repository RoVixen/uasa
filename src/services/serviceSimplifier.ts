import { BACKEND_URL } from "@/config"
import Cookies from "js-cookie"

interface serviceSimplifierOptions {
  token?: string
  body?: BodyInit | { [key: string]: any }
  query?: {
    [key: string | symbol]: any
  }
  headers?: {
    [key: string | symbol]: string
  }
}

type HTTPMethod =
  | "CONNECT"
  | "DELETE"
  | "GET"
  | "HEAD"
  | "OPTIONS"
  | "PATCH"
  | "POST"
  | "PUT"

const defaultHeaders = {
  // "Content-Type": "application/json",
  // accept: "application/json",
}

async function serviceSimplifier(
  method: HTTPMethod = "GET",
  path: string = "",
  { token, body, query, headers = defaultHeaders }: serviceSimplifierOptions
) {
  token = token || Cookies.get("token") || undefined

  const toSpreadTokenData = token ? { Authorization: "Bearer " + token } : {}

  let pathToUse = path
    .split("/")
    .filter(p => !!p)
    .join("/")

  if (query) {
    pathToUse += "?" + new URLSearchParams(query).toString()
  }

  try {
    const response = await fetch(BACKEND_URL + pathToUse, {
      method,
      //@ts-ignore
      headers: {
        ...headers,
        ...toSpreadTokenData,
      },
      body: typeof body == "string" ? body : JSON.stringify(body),
    })

    if (response.status < 200 || response.status > 299)
      throw (await response?.json()) || response

    const successReturn = await response.json()
    return successReturn
  } catch (error) {
    throw error
  }
}

export default serviceSimplifier
