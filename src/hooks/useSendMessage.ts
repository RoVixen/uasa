import { blobToBase64, encryptFunction, isImage, makeid } from "@/utils"
import { useContext, useCallback, useMemo } from "react"
import useChatWS from "./useChatWS"
import useSession from "./useSession"
import aesjs from "aes-js"
import JSEncrypt from "jsencrypt"
import useFriends from "./useFriends"
import useMessages from "./useMessages"

const PIECES_LENGTH = 20000

const utf8Encode = new TextEncoder()

function useSendMessage() {
  const {
    state: { publicKey, privateKey, userData },
  } = useSession()

  const { sendMessage } = useChatWS()
  const { friends, getFriend } = useFriends()
  const { pushMessage } = useMessages()

  const encryptText = useCallback(
    (text: string, keyString: string) => {
      const key = utf8Encode.encode(keyString)

      const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5))
      var encryptedBytes = aesCtr.encrypt(utf8Encode.encode(text))
      var textoEncriptado = aesjs.utils.hex.fromBytes(encryptedBytes)

      return textoEncriptado
    },
    [utf8Encode]
  )

  const send = useCallback(
    (
      text: string,
      keyString: string,
      userReceiver: string,
      encryptedkey: string,
      state?: "finish" | "finishone"
    ) => {
      sendMessage(
        JSON.stringify({
          userSender: userData?.user || "{{username}}",
          msg: encryptText(text, keyString),
          userDestination: userReceiver,
          key: encryptedkey,
          state,
        })
      )
    },
    [sendMessage, encryptText, userData?.user]
  )

  const sendTextShort = useCallback(
    (
      text: string,
      keyString: string,
      userReceiver: string,
      encryptedkey: string
    ) => {
      pushMessage(userReceiver, {
        fromUser: userData?.user || "yo",
        text,
        time: new Date().getTime(),
        isImage: isImage(text),
      })

      send(text, keyString, userReceiver, encryptedkey, "finishone")
    },
    [send, pushMessage, userData]
  )

  const sendTextLong = useCallback(
    (
      text: string,
      keyString: string,
      userReceiver: string,
      encryptedkey: string
    ) => {
      let cuttedMessage = text

      while (cuttedMessage.length > 0) {
        send(
          cuttedMessage.slice(0, PIECES_LENGTH),
          keyString,
          userReceiver,
          encryptedkey,
          cuttedMessage.length < PIECES_LENGTH ? "finish" : undefined
        )

        cuttedMessage = cuttedMessage.slice(PIECES_LENGTH)
      }

      pushMessage(userReceiver, {
        fromUser: userData?.user || "yo",
        text,
        time: new Date().getTime(),
        isImage: isImage(text),
      })
    },
    [send, pushMessage, userData]
  )

  const sendText = useCallback(
    (userReceiver: string, text: string) => {
      if (!publicKey || !privateKey) return
      const friendToSend = getFriend(userReceiver)
      if (!friendToSend || !friendToSend.publicKey) return

      var keyString = makeid(32)

      const encryptedkey = JSON.stringify(
        encryptFunction(friendToSend.publicKey, keyString)
      )

      if (text.length < PIECES_LENGTH)
        sendTextShort(text, keyString, userReceiver, encryptedkey)
      else sendTextLong(text, keyString, userReceiver, encryptedkey)
    },
    [publicKey, privateKey, getFriend, sendMessage, sendTextShort]
  )

  const sendBlob = useCallback(
    async (userReceiver: string, blob: Blob) => {
      const base64 = await blobToBase64(blob)

      if (typeof base64 != "string")
        return console.error(
          "useSendMessage, sendBlob: la convercion del archivo a texto no resultó"
        )

      sendText(userReceiver, base64)
    },
    [sendText]
  )

  return {
    sendText,
    sendBlob,
  }
}

export default useSendMessage
