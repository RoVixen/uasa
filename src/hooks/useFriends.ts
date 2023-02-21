import { contextFriends } from "@/providers"
import { FriendSimple } from "@/types"
import { useContext, useCallback } from "react"

function useFriends() {
  const { friends, setFriends, patchOrAddFriends, getFriend } =
    useContext(contextFriends)

  const patchFriend = useCallback(
    (friendUser: FriendSimple["user"], data: Partial<FriendSimple>) => {
      setFriends(prev =>
        prev.map(f => {
          if (f.user == friendUser)
            return {
              ...f,
              ...data,
            }
          return f
        })
      )
    },
    [friends, setFriends]
  )

  const setOnline = useCallback(
    (friendUser: FriendSimple["user"], online: boolean) => {
      patchFriend(friendUser, { online })
    },
    [patchFriend]
  )

  return {
    setFriends,
    getFriend,
    patchFriend,
    patchOrAddFriends,
    setOnline,
    friends,
  }
}

export default useFriends
