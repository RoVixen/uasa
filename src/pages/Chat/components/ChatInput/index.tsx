import { useMessages } from "@/hooks"
import useSendMessage from "@/hooks/useSendMessage"
import { blobToBase64 } from "@/utils"
import { useRef } from "react"

interface TChatInput {}

function ChatInput({}: TChatInput) {
  const { sendText, sendBlob } = useSendMessage()
  const { activeChatUser } = useMessages()

  const refInput = useRef<HTMLInputElement>(null)
  const refFile = useRef<HTMLInputElement>(null)

  function sendHandler(e?: React.MouseEvent) {
    if (!activeChatUser || !refInput.current) return

    sendText(activeChatUser, refInput.current.value)
    refInput.current.value = ""
  }

  function uploadImageHanlder(e: React.ChangeEvent<HTMLInputElement>) {
    if (!activeChatUser || !e.target.files) return

    sendBlob(activeChatUser, e.target.files[0])
  }

  return (
    <div className="w-full bg-white rounded p-2 flex gap-2">
      <input
        ref={refInput}
        className="bg-gray-300 rounded flex-grow"
        onKeyDown={e => e.key == "Enter" && sendHandler()}
      ></input>

      <button
        onClick={sendHandler}
        className="bg-gray-600 text-white px-2 rounded"
      >
        Enviar
      </button>

      <label
        htmlFor="file"
        className="cursor-pointer"
      >
        <p className="bg-gray-600 text-white px-2 rounded">Subir imagen</p>
        <input
          onChange={uploadImageHanlder}
          ref={refFile}
          className="hidden"
          accept="image/*"
          type="file"
          id="file"
        />
      </label>
    </div>
  )
}

export default ChatInput
