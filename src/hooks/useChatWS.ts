import { contextChatWS } from "@/providers"
import { useContext } from "react"
import useEventListener from "./useEventListener"

type useChatWSEventEvent = Event & { data: string; dataObject: any }
type useChatWSEvent = {
  event: useChatWSEventEvent | { custom: any }
  type: "open" | "close" | "message" | "error" | "messageText"
}

interface useChatWSOptions {
  onOpen?: (event: useChatWSEvent) => any
  onClose?: (event: useChatWSEvent) => any
  onMessage?: (event: useChatWSEvent) => any
  onMessageText?: (event: string) => any
  onMessageJson?: (event: any) => any
  onError?: (event: useChatWSEvent) => any
}

function useChatWS(options: useChatWSOptions = {}) {
  const websocketNotifications = useContext(contextChatWS)

  useEventListener(
    //@ts-ignore
    "uasa--ws_chat_event",
    (event: CustomEvent<useChatWSEvent>) => {
      let chatWSEvent = event.detail.event
      const type = event.detail.type

      if (typeof chatWSEvent.data == "string")
        chatWSEvent.dataObject = JSON.parse(chatWSEvent.data)

      if (type == "open" && options.onOpen) options.onOpen(chatWSEvent)
      if (type == "close" && options.onClose) {
        console.log("useChatWS closed")

        options.onClose(chatWSEvent)
      }
      if (type == "message" && options.onMessage) options.onMessage(chatWSEvent)
      if (
        type == "messageText" &&
        (options.onMessageText || options.onMessageJson)
      ) {
        if (options.onMessageText) options.onMessageText(chatWSEvent.custom)

        try {
          if (options.onMessageJson)
            options.onMessageJson(JSON.parse(chatWSEvent.custom))
        } catch (error) {
          console.error("useChatWS: Error parsing json message")
          console.error(error)
        }
      }
      if (type == "error" && options.onError) options.onError(chatWSEvent)
    }
  )

  return websocketNotifications
}

export default useChatWS
