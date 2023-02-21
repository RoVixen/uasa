import serviceSimplifier from "../serviceSimplifier"

function serviceAddFriend(newFriendId: number, _id?: number) {
  const gotId = _id || JSON.parse(localStorage.getItem("userData") || "{}")?._id

  return serviceSimplifier("POST", "addfriend/v1", {
    body: {
      IDuser1: gotId,
      IDuser2: newFriendId,
    },
  })
}

export default serviceAddFriend
