import { useSession } from "@/hooks"
import { MessagesObject } from "@/types"
import JSEncrypt from "jsencrypt"
import { PropsWithChildren, useCallback } from "react"
import { AES, enc, format, lib } from "crypto-js"
import aesjs from "aes-js"

function useProviderMessages(
  messages: MessagesObject,
  setMessage: React.Dispatch<React.SetStateAction<MessagesObject>>,
  totalMessages: number
) {
  const {
    state: { privateKey },
  } = useSession()

  const decriptPiece = useCallback(
    (messageKey: string, piece: string) => {
      if (!privateKey)
        return console.error(
          "pushPiece, tratando de desencriptar pieza de mensaje pero no hay llave publica ni privada"
        )

      const decrypter = new JSEncrypt({ default_key_size: "2048" })

      decrypter.setPrivateKey(privateKey)

      const decriptedMessageKey = decrypter.decrypt(messageKey)

      if (!decriptedMessageKey)
        return console.error(
          "pushPiece, error al desencriptar la key " +
            messageKey +
            " que viene dentro del mensaje "
        )

      // const pieceBytes = AES.decrypt(piece, decriptedMessageKey)
      // const decriptedPiece = pieceBytes.toString(enc.Utf8)
      // console.log("decriptedMessageKey", decriptedMessageKey)
      // console.log("pieceBytes", pieceBytes)
      // console.log("decriptedPiece", decriptedPiece)
      var encryptedBytes = aesjs.utils.hex.toBytes(piece)

      const utf8Encode = new TextEncoder()
      const messaeKeyBytes = utf8Encode.encode(decriptedMessageKey)
      var aesCtr = new aesjs.ModeOfOperation.ctr(
        messaeKeyBytes,
        new aesjs.Counter(5)
      )
      var decryptedBytes = aesCtr.decrypt(encryptedBytes)
      var decriptedPiece = aesjs.utils.utf8.fromBytes(decryptedBytes)

      if (!decriptedPiece)
        return console.error(
          "pushPiece, error al desencriptar la pieza " + piece
        )

      return decriptedPiece
    },
    [privateKey]
  )

  const pushPiece = useCallback(
    (intoUser: string, piece: string, messageKey: string) => {
      const decriptedPiece = decriptPiece(messageKey, piece)

      if (!decriptedPiece) return

      setMessage(prev => {
        return {
          ...prev,
          [intoUser]: {
            ...prev?.[intoUser],
            messagePieces: [
              ...(prev?.[intoUser]?.messagePieces || []),
              decriptedPiece,
            ],
          },
        }
      })
    },
    [totalMessages, setMessage, decriptPiece]
  )

  const endWithThisPieces = useCallback(
    (intoUser: string, piece: string, messageKey: string) => {
      const decriptedPiece = decriptPiece(messageKey, piece)
      if (!decriptedPiece) return

      setMessage(prev => {
        const completedMessage = [
          ...(prev[intoUser]?.messagePieces || []),
          decriptedPiece,
        ].join("")

        return {
          ...prev,
          [intoUser]: {
            ...prev?.[intoUser],
            messages: [
              ...(prev?.[intoUser]?.messages || []),
              {
                fromUser: intoUser,
                text: completedMessage,
                time: new Date().getTime(),
                isImage: /^data\:image\/jpeg;base64.*/.test(completedMessage),
              },
            ],
            messagePieces: [],
          },
        }
      })
    },
    [totalMessages, setMessage, pushPiece]
  )

  return {
    pushPiece,
    decriptPiece,
    endWithThisPieces,
  }
}

export default useProviderMessages
