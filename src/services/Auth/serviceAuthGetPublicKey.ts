import { BACKEND_URL } from "@/config"
import { serviceSimplifier } from ".."

async function serviceAuthGetPublicKey(): Promise<string> {
  return serviceSimplifier("GET", "SendPublicKey",{})
}

export default serviceAuthGetPublicKey
