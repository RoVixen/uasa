import { useSession } from "@/hooks"
import { Message } from "@/types"

interface TChatMessageBubble {
  message: Message
}

function ChatMessageBubble({ message }: TChatMessageBubble) {
  const {
    state: { userData },
  } = useSession()

  return (
    <div
      className={`p-1 m-1 rounded border border-gray-500 bg-gray-200 ${
        message.fromUser == userData?.user ? "text-right" : ""
      }`}
    >
      <h3 className={`text-xs ${message.fromUser == userData?.user ? "text-green-800" : "text-blue-800"}`}>{message.fromUser}</h3>

      {message.text.slice(0, "data:image/".length) == "data:image/" ? (
        <img
          className=""
          src={message.text}
          alt={"image"}
        />
      ) : (
        <p className="break-all break-words ">{message.text}</p>
      )}
    </div>
  )
}

export default ChatMessageBubble
