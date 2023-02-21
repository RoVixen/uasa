import { useChatWS, useFriends, useMessages, useService } from "@/hooks"
import { serviceGetAllFriends } from "@/services/Friends"
import { ChatUsersAddFriend, ChatUsersEntry } from "./components"
import { useEffect, useMemo, useState, useCallback } from "react"

interface TChatUsers {}

interface Friend {
  active: boolean
  id: number
  lastname: string
  password: string
  publicKey: string
  user: string
}

function ChatUsers({}: TChatUsers) {
  const {
    call: callGetAllFriends,
    response: responseGetAllFriends,
    loading: loadingGetAllFriends,
  } = useService(serviceGetAllFriends, [])

  const { friends, patchOrAddFriends, setOnline, patchFriend, getFriend } =
    useFriends()
  const { setActiveChat } = useMessages()

  function onResponseGetFriends(res: Friend[]) {
    console.log("callGetAllFriends res", res)
    patchOrAddFriends(
      //@ts-ignore
      res.map(f => ({
        active: f.active,
        id: f.id,
        publicKey: getFriend(f.user)?.publicKey || f.publicKey,
        user: f.user,
      }))
    )

    //coloca al responder el primero en la lista de amigos como chat seleccionado
    if (res.length > 0) setActiveChat(res[0].user)
  }

  useEffect(() => {
    callGetAllFriends().then(onResponseGetFriends)
  }, [])

  useChatWS({
    onMessageText(e) {
      if (e === "null") {
        callGetAllFriends().then(onResponseGetFriends)
      }
    },
  })

  if (loadingGetAllFriends) return <h3>Cargando...</h3>

  return (
    <>
      <div className="flex flex-col gap-2 flex-grow">
        {friends?.map(friend => (
          <ChatUsersEntry
            key={friend.id}
            name={friend.user}
            online={friend.online || false}
          />
        ))}
      </div>
      <ChatUsersAddFriend />
    </>
  )
}

export default ChatUsers
