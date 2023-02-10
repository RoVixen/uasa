socket.onmessage = function (event) {
  var reader = new FileReader()

  reader.addEventListener("loadend", e => {
    const text = JSON.parse(e.srcElement.result)

    ans = Array.isArray(text)

    console.log(text)

    if (ans == true || text == null) {
      let AllFriends = GetAllFriends()

      AllFriends.then(value => {
        for (var i = 0; i < value.length; i++) {
          var Lielement = document.createElement("li")
          Lielement.className = "clearfix"
          Lielement.id = value[i]["user"]

          var elementimg = document.createElement("img")
          elementimg.alt = "avatar"
          elementimg.src = "https://bootdey.com/img/Content/avatar/avatar2.png"

          var elementfirstdiv = document.createElement("div")
          elementfirstdiv.className = "message-data"

          var elementsecondtdiv = document.createElement("div")
          elementsecondtdiv.className = "name"
          elementsecondtdiv.appendChild(
            document.createTextNode(value[i]["user"])
          )

          var elementthriddiv = document.createElement("div")
          elementthriddiv.className = "status"

          var elementI = document.createElement("i")
          elementI.className = "fa fa-circle offline"
          elementI.id = "status" + value[i]["user"]

          elementthriddiv.appendChild(elementI)
          elementthriddiv.appendChild(
            document.createTextNode(" left 7 mins ago")
          )

          elementfirstdiv.appendChild(elementsecondtdiv)
          elementfirstdiv.appendChild(elementthriddiv)

          Lielement.appendChild(elementimg)
          Lielement.appendChild(elementfirstdiv)

          var divmodifed = document.getElementById("listaamigos")
          divmodifed.appendChild(Lielement)

          try {
            var f = value.filter(function (value) {
              return value.user == text[i]["user"]
            })

            if (Array.isArray(f) == true) {
              var userDiv = document.getElementById("status" + text[i]["user"])
              userDiv.className = "fa fa-circle online"
              map.set(text[i]["user"], text[i]["publicKey"])
            }
          } catch (error) {}
        }
      })
    }

    if (text["Disconected"] != null) {
      var userDiv = document.getElementById("status" + text["Disconected"])
      userDiv.className = "fa fa-circle offline"
      map.delete(text["Disconected"])
    }

    if (ans != true && text["Disconected"] == null && text["msg"] == null) {
      var userDiv = document.getElementById("status" + text["username"])
      userDiv.className = "fa fa-circle online"
      map.set(text["username"], text["publicKey"])
    }

    if (text["msg"] != null) {
      var txt = text["key"].split(",")

      var keyDecrypted = decryptFunction(txt)

      const utf8Encode = new TextEncoder()

      const key = utf8Encode.encode(keyDecrypted)

      var encryptedBytes = aesjs.utils.hex.toBytes(text["msg"])

      var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5))

      var decryptedBytes = aesCtr.decrypt(encryptedBytes)

      var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes)

      if (text["state"] != "finish") {
        if (text["state"] == "1") {
          msgToDecrypt.set(keyDecrypted, decryptedText)
        } else {
          msgToDecrypt.set(
            keyDecrypted,
            msgToDecrypt.get(keyDecrypted) + decryptedText
          )
        }
      }

      if (text["state"] == "finishone") {
        if (decryptedText.search("data:image/jpeg;base64") != -1) {
          var img = document.getElementById("main")

          img.src = decryptedText
        } else {
          var Lielement = document.createElement("li")
          Lielement.className = "clearfix"

          var elementfirstdiv = document.createElement("div")
          elementfirstdiv.className = "message-data"

          var currentdate = new Date()

          hour = currentdate.getHours()
          min = currentdate.getMinutes()
          var ampm = hour >= 12 ? "pm" : "am"

          hour = hour % 12
          hour = hour ? hour : 12 // the hour '0' should be '12'
          min = min < 10 ? "0" + min : min
          var strTime = hour + ":" + min + " " + ampm

          var elementSpan = document.createElement("span")
          elementSpan.className = "message-data-time"
          elementSpan.appendChild(document.createTextNode(strTime))

          elementfirstdiv.appendChild(elementSpan)

          var elementlastDiv = document.createElement("div")
          elementlastDiv.className = "message my-message"
          elementlastDiv.appendChild(document.createTextNode(decryptedText))

          Lielement.appendChild(elementfirstdiv)
          Lielement.appendChild(elementlastDiv)

          var divmodifed = document.getElementById("chat-history_si")
          divmodifed.appendChild(Lielement)
        }
      }

      if (text["state"] == "finish") {
        if (
          msgToDecrypt.get(keyDecrypted).search("data:image/jpeg;base64") != -1
        ) {
          var img = document.getElementById("main")

          img.src = msgToDecrypt.get(keyDecrypted) + decryptedText

          msgToDecrypt.delete(keyDecrypted)
        } else {
          var Lielement = document.createElement("li")
          Lielement.className = "clearfix"

          var elementfirstdiv = document.createElement("div")
          elementfirstdiv.className = "message-data"

          var elementSpan = document.createElement("span")
          elementSpan.className = "message-data-time"

          var currentdate = new Date()

          hour = currentdate.getHours()
          min = currentdate.getMinutes()
          var ampm = hour >= 12 ? "pm" : "am"

          elementSpan.appendChild(
            document.createTextNode(hour + ":" + min + " " + ampm)
          )

          elementfirstdiv.appendChild(elementSpan)

          var elementlastDiv = document.createElement("div")
          elementlastDiv.className = "message my-message"
          elementlastDiv.appendChild(
            document.createTextNode(
              msgToDecrypt.get(keyDecrypted) + decryptedText
            )
          )

          Lielement.appendChild(elementfirstdiv)
          Lielement.appendChild(elementlastDiv)

          var divmodifed = document.getElementById("chat-history_si")
          divmodifed.appendChild(Lielement)

          msgToDecrypt.delete(keyDecrypted)
        }
      }
    }
  })

  reader.readAsText(event.data)
}
