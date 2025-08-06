import { Outlet } from "react-router-dom"
import Navbar from "../componets/Navbar"

function Root() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Root;