// import Navbar from "@/components/Navbar";
import Auth from "@/components/GlobalViews/Auth"
import { Outlet } from "react-router-dom"

function LayoutDefault() {
  return (
    <div>
      <Auth />
      {/* <Navbar/> */}
      <Outlet />
    </div>
  )
}

export default LayoutDefault
