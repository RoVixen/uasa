import { createContext } from "react"
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket"

//@ts-ignore
const contextChatWS = createContext<ReturnType<typeof useWebSocket>>({})

export default contextChatWS
