export type UserData = {
  user: string
  _id: integer
  name: string
}

export interface SessionState {
  token?: string
  userData?: UserData
  privateKey?: string
  publicKey?: string
}

export type SessionActions = {
  save: SessionState
  patch: Partial<SessionState>
}

export interface SessionAction<Type extends keyof SessionActions> {
  type: Type
  payload: SessionActions[Type]
}
