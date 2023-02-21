import { useChatWS, useFriends } from "@/hooks"
import { Message, MessagesObject } from "@/types"
import { isImage } from "@/utils"
import { PropsWithChildren, useState, useEffect, useCallback } from "react"
import contextMessages from "./contexts/contextMessages"
import { useProviderMessages } from "./hooks"

type MessageFromWS = {
  id: number
  userSender: string
  msg: string
  userDestination: string
  key: string
  state?: "finishone" | "finish"
}

function ProviderMessages({ children }: PropsWithChildren) {
  const [messages, setMessages] = useState<MessagesObject>({})
  const [activeChatWithUser, setActiveChatWithUser] = useState<string | null>(
    null
  )

  const totalMessages = Object.values(messages).reduce(
    (prev, current) => prev + (current.messages?.length || 0),
    0
  )

  const { endWithThisPieces, pushPiece, decriptPiece } = useProviderMessages(
    messages,
    setMessages,
    totalMessages
  )

  const pushMessage = useCallback(
    (user: string, newMessage: Message) => {
      setMessages(prev => {
        if (!prev[user])
          return {
            ...prev,
            [user]: {
              messagePieces: [],
              messages: [newMessage],
            },
          }

        return {
          ...prev,
          [user]: {
            ...prev[user],
            messages: [...prev[user].messages, newMessage],
          },
        }
      })
    },
    [messages, setMessages]
  )

  useChatWS({
    onMessageJson(e: MessageFromWS) {
      if (
        typeof e.userDestination != "string" ||
        typeof e.userSender != "string"
      )
        return

      if (e.state == "finishone") {
        // return endWithThisPieces(e.userSender, e.msg, e.key)
        const decriptedPiece = decriptPiece(e.key, e.msg)
        if (!decriptedPiece) return

        return pushMessage(e.userSender, {
          text: decriptedPiece,
          fromUser: e.userSender,
          time: new Date().getTime(),
          isImage: isImage(decriptedPiece),
        })
      }

      if (e.state != "finish") pushPiece(e.userSender, e.msg, e.key)
      else endWithThisPieces(e.userSender, e.msg, e.key)
    },
  })

  return (
    <contextMessages.Provider
      value={{
        messages,
        setMessages,
        totalMessages,
        activeChatWithUser,
        setActiveChatWithUser,
        pushMessage,
      }}
    >
      {children}
    </contextMessages.Provider>
  )
}

export default ProviderMessages
