import { useChatWS } from "@/hooks"
import { Friend, FriendSimple } from "@/types"
import { useCallback, useState, PropsWithChildren } from "react"
import { contextFriends } from "./contexts"

function ProviderFriends({ children }: PropsWithChildren) {
  const [friends, setFriends] = useState<FriendSimple[]>([])

  const getFriend = useCallback(
    (friendUser: string) => {
      return friends.find(f => f.user == friendUser)
    },
    [friends]
  )

  const patchOrAddFriends = useCallback(
    (toPatchFriends: FriendSimple[]) => {
      setFriends(prev => {
        const newFriends: FriendSimple[] = []
        //importante primero ...prev, y luego ...friends
        const joinedFriends: FriendSimple[] = [...prev, ...toPatchFriends]

        //itera ambas listas concatenadas, las primeras entradas seran de entradas que probablemente
        //ya exisitian dentro de la lista, las ultimas seran de valores nuevos que puede
        //que no existian antes, si no existia, se agrega, si existia, se actualizan los valores
        joinedFriends.forEach(pf => {
          const foundIndex = newFriends.findIndex(f => f.user == pf.user)

          if (foundIndex == -1) newFriends.push(pf)
          else
            newFriends[foundIndex] = {
              ...newFriends[foundIndex],
              ...pf,
              publicKey: newFriends[foundIndex].publicKey || pf.publicKey,
            }
        })

        return newFriends
      })
    },
    [friends, setFriends]
  )

  useChatWS({
    onMessageJson(
      e:
        | Friend[]
        | { username: string; publicKey: string }
        | { Disconected: string }
    ) {
      //administrar mensaje inicial de usuarios conectados
      if (Array.isArray(e)) {
        if (e.length == 0) return
        if (!e[0]?.user || !e[0].publicKey) return

        console.log("providerFriends userLogin", e)

        patchOrAddFriends(
          //@ts-ignore
          e.map(f => {
            const aaaa = getFriend(f.user)

            return {
              id: f.id,
              user: f.user,
              active: f.active,
              online: true,
              publicKey: aaaa?.publicKey || f.publicKey,
            }
          })
        )
      }

      //actualizando estatus del usuario al conectarse
      if ("username" in e) {
        console.log("providerFriends userLogin", e)

        patchOrAddFriends([
          //@ts-ignore
          { user: e.username, publicKey: e.publicKey, online: true },
        ])
      }

      //actualizando estatus del usuario al desconectarse
      if ("Disconected" in e) {
        patchOrAddFriends([
          //@ts-ignore
          { user: e.Disconected, online: false },
        ])
      }
    },
  })

  return (
    <contextFriends.Provider
      value={{ friends, setFriends, patchOrAddFriends, getFriend }}
    >
      {children}
    </contextFriends.Provider>
  )
}

export default ProviderFriends
