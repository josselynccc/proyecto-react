import { Navigate, Outlet } from "react-router-dom"
import Menu from "./components/Menu/Menu"
import './index.css'

const App = ()=>{
    if(!localStorage.getItem("tokenUsuario")) return <Navigate to="/login"></Navigate>
    return (
        <>
        <div className="ContainerMenu">
            <Menu />
        </div>
        <div className="ContainerBody">
            <Outlet />
        </div>
        </>
    )
}
export default App