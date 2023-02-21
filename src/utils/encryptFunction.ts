import JSEncrypt from "jsencrypt"

function encryptFunction(publickey: string, msg: string) {
  var msgLength = msg.length

  var step = 126

  var finish = 0

  var result = []

  var encrypter = new JSEncrypt()
  encrypter.setPublicKey(publickey)

  for (let start = 0; start < msgLength; start += step) {
    finish = start + step

    if (finish > msgLength) {
      finish = msgLength
    }

    var encrypted = encrypter.encrypt(msg.slice(start, finish))

    result.push(encrypted)
  }

  return result
}

export default encryptFunction
