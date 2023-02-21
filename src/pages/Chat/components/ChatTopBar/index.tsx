import { useMessages } from "@/hooks"

interface TChatTopBar {
  
}

function ChatTopBar({}:TChatTopBar){

  const {activeChatUser} = useMessages()

  return <div className="w-full bg-white rounded px-4 py-2">
    <h3 className="text-xl">{activeChatUser}</h3>
  </div>
}

export default ChatTopBar