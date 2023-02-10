import { ChatMessageBubble } from "./components"

interface TChatMessages {
  
}

function ChatMessages({}:TChatMessages){
  return <div className="w-full bg-white rounded p-2 flex-grow">
    <div className="border border-gray-700 h-full rounded">
    <ChatMessageBubble/>
    <ChatMessageBubble/>
    <ChatMessageBubble/>
    </div>
  </div>
}

export default ChatMessages