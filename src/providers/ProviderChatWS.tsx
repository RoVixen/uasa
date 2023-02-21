import { BACKEND_WEBSOCKET_URL } from "@/config"
import { useSession } from "@/hooks"
import { PropsWithChildren, useCallback } from "react"
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket"
import { contextChatWS } from "./contexts"

function ProviderChatWS({ children }: PropsWithChildren) {
  const {
    state: { token, userData },
    createPublicPrivateKey,
    logOut,
  } = useSession()

  const dispatchWSNotificationEvent = useCallback(
    (
      event: Event | { custom: any },
      type: "open" | "close" | "message" | "messageText" | "error"
    ) => {
      window.dispatchEvent(
        new CustomEvent("uasa--ws_chat_event", {
          detail: { event, type },
        })
      )
    },
    []
  )

  const notificationWebsocket = useWebSocket(
    token ? BACKEND_WEBSOCKET_URL + "?token=" + token : "BACKEND_WEBSOCKET_URL",
    {
      onOpen: event => {
        //implementando pong para no morir el ws
        // event.target.pongTimerId = setInterval(
        //   () => event.target?.send(JSON.stringify({ type: "pong" })),
        //   2000
        // )

        //generando y guardando public key
        const { publicKey } = createPublicPrivateKey()

        //@ts-ignore
        event.target.send(
          JSON.stringify({
            publicKey,
          })
        )

        dispatchWSNotificationEvent(event, "open")
      },
      onClose: event => {
        // clearInterval(event.target.pongTimerId)
        dispatchWSNotificationEvent(event, "close")
      },
      onMessage: event => {
        //transformando bytes en texto legible
        const reader = new FileReader()

        reader.addEventListener("load", e => {
          // console.log(e.target?.result)

          dispatchWSNotificationEvent(
            { custom: e.target?.result },
            "messageText"
          )
        })

        reader.readAsText(event.data)

        dispatchWSNotificationEvent(event, "message")
      },
      onError: event => dispatchWSNotificationEvent(event, "error"),
    }
  )

  return (
    <contextChatWS.Provider value={notificationWebsocket}>
      {children}
    </contextChatWS.Provider>
  )
}

export default ProviderChatWS
