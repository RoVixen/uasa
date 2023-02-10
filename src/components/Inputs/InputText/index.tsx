interface TInputText {
  title: string
  name: string
  id?: string
}

function InputText({title, name, id }: TInputText) {
  return (
    <label htmlFor={id}>
      <h3>{title}</h3>
      <input
        id={id}
        className="border border-gray-500"
        name={name}
        type={"text"}
      />
    </label>
  )
}

export default InputText
