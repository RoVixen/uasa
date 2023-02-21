import { contextMessages } from "@/providers/contexts"
import { useContext, useCallback, useMemo } from "react"
import useFriends from "./useFriends"

function useMessages() {
  const {
    messages,
    setMessages,
    setActiveChatWithUser,
    activeChatWithUser,
    pushMessage,
  } = useContext(contextMessages)

  const { friends } = useFriends()

  const setActiveChat = useCallback(
    (friendUsername: string | null) => {
      if (friendUsername === null) return setActiveChatWithUser(null)

      if (typeof friendUsername != "string")
        return console.error(
          "useMessages, setActiveChat: wtf, pasame un string o un null baboso"
        )

      if (!friends.some(f => f.user == friendUsername))
        return console.error(
          "useMessages, setActiveChat: el usuario con el nombre " +
            friendUsername +
            " no existe"
        )

      setActiveChatWithUser(friendUsername)
    },
    [setActiveChatWithUser, activeChatWithUser, friends]
  )

  // const sendMessage = useCallback(() => {}, [])

  const activeChat = useMemo(() => {
    if (activeChatWithUser === null) return []
    return messages?.[activeChatWithUser]?.messages || []
  }, [activeChatWithUser, messages, friends])

  return {
    messages,
    activeChat,
    setActiveChat,
    activeChatUser: activeChatWithUser,
    pushMessage,
  }
}

export default useMessages
