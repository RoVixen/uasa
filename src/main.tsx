import React from "react"
import ReactDOM from "react-dom/client"
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { LazyElement } from "./components"
import { ROUTES } from "./config"
import "./index.css"

function rsl(pathToRemoveSlash: string) {
  return pathToRemoveSlash.slice(1)
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LazyElement cb={() => import("@/layout/LayoutDefault")} />}
        >
          <Route
            path={rsl(ROUTES.landing)}
            element={<LazyElement cb={() => import("@/pages/Landing")} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
