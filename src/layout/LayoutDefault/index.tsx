// import Navbar from "@/components/Navbar";
import {Outlet} from "react-router-dom"

function LayoutDefault(){
  return <div>
    {/* <Navbar/> */}
    <Outlet/>
  </div>
}

export default LayoutDefault;