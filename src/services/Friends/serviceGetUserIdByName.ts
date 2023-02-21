import serviceSimplifier from "../serviceSimplifier"

type getUserIdResponse = {
  id: number
  user: string
  lastname: string
  password: string
  active: boolean
  publicKey: string
}

function serviceGetUserIdByName(user: string): Promise<getUserIdResponse> {
  return serviceSimplifier("GET", "SearshByNameUser/v1?Name=" + user, {})
}

export default serviceGetUserIdByName
