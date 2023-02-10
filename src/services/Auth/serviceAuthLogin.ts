import { serviceSimplifier } from ".."

interface IserviceAuthLoginResponse {
  id: number
  user: string
  lastname: string
  password: string
  active: boolean
  publicKey: string
}

function serviceAuthLogin(
  user: string,
  password: string
): Promise<IserviceAuthLoginResponse> {
  return serviceSimplifier("POST", "login/v1", {
    body: JSON.stringify({
      user,
      password,
    }),
  })
}

export default serviceAuthLogin
