import { Friend } from "@/types"
import { serviceSimplifier } from ".."

function serviceGetAllFriends(_id?: number): Promise<Friend[]> {
  const gotId = _id || JSON.parse(localStorage.getItem("userData") || "{}")?._id

  if (!gotId)
    throw new Error(
      "serviceGetAllFriends session not saved in local and _id not passed"
    )

  return serviceSimplifier("GET", "look_friend/v1?id=" + gotId, {})
}

export default serviceGetAllFriends

// const rawResponse = await fetch('http://localhost:8080/API/look_friend/v1?id='+parseJwt(getCookie("token"))["_id"], {
//     method: 'GET',
//     headers: {
//         'Authorization': `Bearer${getCookie("token")}`, // notice the Bearer before your token
//     },
// });

// const content = await rawResponse;

// var data = await content.json();

// return data;
