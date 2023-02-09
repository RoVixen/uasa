import { serviceSimplifier } from "."

type serviceExampleResponse = {
  some_results: {
    result: string
  }
}

function serviceExample(search: string = ""): Promise<serviceExampleResponse> {
  return serviceSimplifier(
    "GET",
    `api/example?${search ? "search=" + search : ""}`
  )
}

export default serviceExample
