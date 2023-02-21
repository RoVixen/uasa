import { useSession } from "@/hooks"
import { Message } from "@/types"
import { useMemo } from "react"

interface TChatMessageBubble {
  message: Message
}

function ChatMessageBubble({ message }: TChatMessageBubble) {
  const {
    state: { userData },
  } = useSession()

  const dateText = useMemo(() => {
    const date = new Date(message.time)

    return (
      (date.getHours() < 9 ? "0" : "") +
      date.getHours() +
      " : " +
      (date.getMinutes() < 9 ? "0" : "") +
      date.getMinutes()
    )
  }, [message.time])

  return (
    <div
      className={`p-1 m-1 rounded border border-gray-500 bg-gray-200 ${
        message.fromUser == userData?.user ? "text-right" : ""
      }`}
    >
      <h3
        className={`text-xs ${
          message.fromUser == userData?.user
            ? "text-green-800"
            : "text-blue-800"
        }`}
      >
        {message.fromUser}
      </h3>

      {message.text.slice(0, "data:image/".length) == "data:image/" ? (
        <img
          className=""
          src={message.text}
          alt={"image"}
        />
      ) : (
        <p className="break-all break-words ">{message.text}</p>
      )}

      <h3
        className={`text-xs text-gray-700`}
      >
        {dateText}
      </h3>
    </div>
  )
}

export default ChatMessageBubble
