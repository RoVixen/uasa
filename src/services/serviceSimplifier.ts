import { BACKEND_URL } from "@/config"

function serviceSimplify(
  method: RequestInit["method"] = "GET",
  path: string = "",
  body?: RequestInit["body"]
) {
  const pathToUse = path
    .split("/")
    .filter(p => !!p)
    .join("/")

  return fetch(BACKEND_URL + pathToUse, {
    method,
    body,
  }).then(tojson=>tojson.json())
}

export default serviceSimplify
