export type Friend = {
  id: integer
  user: string
  lastname: string
  password: ""
  active: boolean
  publicKey: string
}

export type FriendSimple = {
  id: integer
  user: string
  active: boolean
  online?: boolean
  publicKey: string
}
