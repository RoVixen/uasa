import { FriendSimple } from "@/types"
import { createContext } from "react"

const contextFriends = createContext<{
  friends: FriendSimple[]
  setFriends: React.Dispatch<React.SetStateAction<FriendSimple[]>>
  patchOrAddFriends: (toPatchFriends: FriendSimple[]) => void
  getFriend: (friendUser: string) => FriendSimple | undefined
}>({
  friends: [],
  setFriends: () => {},
  patchOrAddFriends: () => {},
  getFriend: (user: string) => {
    return { active: false, id: 0, publicKey: "", user: "" }
  },
})

export default contextFriends
