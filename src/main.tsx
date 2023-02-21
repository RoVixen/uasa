import React, { PropsWithChildren } from "react"
import ReactDOM from "react-dom/client"
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { LazyElement } from "./components"
import { ROUTES } from "./config"
import "./index.css"
import {
  ProviderChatWS,
  ProviderFriends,
  ProviderMessages,
  ProviderSession,
} from "./providers"

function AllProviders({ children }: PropsWithChildren) {
  return (
    <>
      <ProviderSession>
        <ProviderChatWS>
          <ProviderFriends>
            <ProviderMessages>{children}</ProviderMessages>
          </ProviderFriends>
        </ProviderChatWS>
      </ProviderSession>
    </>
  )
}

function rsl(pathToRemoveSlash: string) {
  return pathToRemoveSlash.slice(1)
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AllProviders>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LazyElement cb={() => import("@/layout/LayoutDefault")} />
            }
          >
            <Route
              path={rsl(ROUTES.landing)}
              element={<LazyElement cb={() => import("@/pages/Landing")} />}
            />
            <Route
              path={rsl(ROUTES.chat)}
              element={<LazyElement cb={() => import("@/pages/Chat")} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AllProviders>
  </React.StrictMode>
)
