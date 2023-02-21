function isImage(text: string) {
  return text.slice(0, "data:image/".length) == "data:image/"
}

export default isImage
