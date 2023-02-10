interface TChatInput {}

function ChatInput({}: TChatInput) {
  return (
    <div className="w-full bg-white rounded p-2 flex gap-2">
      <input className="bg-gray-300 rounded flex-grow"></input>
      <button className="bg-gray-600 text-white px-2 rounded">Enviar</button>
    </div>
  )
}

export default ChatInput
