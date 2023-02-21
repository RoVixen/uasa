import { useMessages } from "@/hooks"
import { ChatMessageBubble } from "./components"

interface TChatMessages {}

function ChatMessages({}: TChatMessages) {
  const { activeChat } = useMessages()

  return (
    <div className="w-full bg-white rounded p-2 flex-grow">
      <div className="border border-gray-700 h-[calc(100vh-10rem)] overflow-y-scroll rounded">

        {activeChat.length > 0 &&
          activeChat.map((message, index) => (
            <ChatMessageBubble
              message={message}
              key={index}
            />
          ))}

      </div>
    </div>
  )
}

export default ChatMessages
