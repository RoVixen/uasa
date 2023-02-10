import { serviceSimplifier } from ".."

interface IserviceAuthRegisterResponse {
  id: number
  user: string
  lastname: string
  password: string
  active: boolean
  publicKey: string
}

function serviceAuthRegister(
  user: string,
  lastname: string,
  password: string
): Promise<IserviceAuthRegisterResponse> {
  return serviceSimplifier("POST", "users/v1", {
    body: JSON.stringify({
      user,
      lastname,
      password,
      active: false,
    }),
  })
}

export default serviceAuthRegister
