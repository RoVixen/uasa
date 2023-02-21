import { FriendSimple } from "@/types"

export interface FriendsState {
  friends: FriendSimple[]
  renderTriggerer:boolean
}

export type FriendsActions = {
  setFriends: FriendSimple[]
  patchFriend: {
    friendUser: string
    data: Partial<FriendSimple>
  }
}

export interface FriendsAction<Type extends keyof FriendsActions> {
  type: Type
  payload: FriendsActions[Type]
}
