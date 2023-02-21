import { useService } from "@/hooks"
import serviceAddFriend from "@/services/Friends/serviceAddFriend"
import serviceGetUserIdByName from "@/services/Friends/serviceGetUserIdByName"
import { useRef } from "react"

interface TChatUsersAddFriend {}

function ChatUsersAddFriend({}: TChatUsersAddFriend) {
  const { call: callGetId } = useService(serviceGetUserIdByName)
  const { call: callAddFriend } = useService(serviceAddFriend)

  const refInput = useRef<HTMLInputElement>(null)

  function sendHandler(e: React.MouseEvent) {
    if (!refInput.current) return

    callGetId(refInput.current.value.trim()).then(res => {
      callAddFriend(res.id).finally(() => window.location.reload())
    })
  }

  return (
    <div className="border rounded border-gray-700 bg-white p-1">
      <h4 className="mb-1">Añadir amigos:</h4>
      <input
        ref={refInput}
        className="w-full rounded bg-gray-300"
        type="text"
        name=""
        id=""
      />
      <button
        onClick={sendHandler}
        className="bg-gray-600 text-white px-2 mt-1 rounded"
      >
        Añadir
      </button>
    </div>
  )
}

export default ChatUsersAddFriend
