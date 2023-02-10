import { useChatWS, useService } from "@/hooks"
import { serviceGetAllFriends } from "@/services/Friends"
import { ChatUsersEntry } from "./components"
import { useEffect } from "react"

interface TChatUsers {}

function ChatUsers({}: TChatUsers) {
  const { call, response, loading } = useService(serviceGetAllFriends, [])

  useEffect(() => {
    call().then(res => console.log(res))
  }, [])

  // useChatWS({
  //   onMessageText(e) {
  //     console.log(e);

  //     if (e !== "null") return

  //     call().then(res => console.log(res))
  //   },
  // })

  if (loading) return <h3>Cargando...</h3>

  return (
    <>
      {response?.map(friend => (
        <ChatUsersEntry
          key={friend.id}
          name={friend.user}
          online={friend.active}
        />
      ))}
    </>
  )
}

export default ChatUsers
