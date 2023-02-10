import { ChatInput, ChatMessages, ChatTopBar, ChatUsers } from "./components"

interface TChat {}

function Chat({}: TChat) {
  return (
    <div className="w-full min-h-screen bg-slate-400 flex gap-4">
      
      <div className="border w-44 border-gray-700 p-2 m-2 rounded flex flex-col gap-2">
        <ChatUsers />
      </div>

      <div className="border flex-grow border-gray-700 p-2 m-2 rounded flex flex-col gap-2">
        <ChatTopBar />
        <ChatMessages />
        <ChatInput />
      </div>
    </div>
  )
}

export default Chat
