import { useFriends, useMessages } from "@/hooks"

interface TChatUsersEntry {
  name: string
  online: boolean
}

function ChatUsersEntry({ name, online }: TChatUsersEntry) {
  // const { setOnline, friends } = useFriends()
  const { setActiveChat } = useMessages()

  return (
    <div
      // onClick={() => setOnline(name, !friends.find(f=>f.user==name)?.active)}
      onClick={() => setActiveChat(name)}
      className="rounded bg-white py-2 px-4 flex justify-between items-center cursor-pointer"
    >
      <span>{name}</span>{" "}
      <div
        className={
          "inline-block w-3 h-3 rounded-full " +
          (online ? "bg-green-600" : "bg-gray-600")
        }
      ></div>
    </div>
  )
}

export default ChatUsersEntry
