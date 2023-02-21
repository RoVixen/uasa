import { Message, MessagesObject } from "@/types"
import { createContext } from "react"

const contextMessages = createContext<{
  messages: MessagesObject
  setMessages: React.Dispatch<React.SetStateAction<MessagesObject>>
  activeChatWithUser: string | null
  setActiveChatWithUser: React.Dispatch<React.SetStateAction<string | null>>
  totalMessages: number
  pushMessage: (user: string, newMessage: Message) => void
}>({
  messages: {},
  setMessages: () => {},
  totalMessages: 0,
  activeChatWithUser: null,
  setActiveChatWithUser: () => {},
  pushMessage: () => {},
})

export default contextMessages
