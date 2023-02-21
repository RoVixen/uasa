export interface Message {
  fromUser: string
  text: string
  time: number
  isImage?: boolean
}

export interface MessagesObject {
  [friendUser: string]: {
    messages: Message[]
    messagePieces: string[]
  }
}
