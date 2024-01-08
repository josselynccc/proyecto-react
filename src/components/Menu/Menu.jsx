import { useEffect,useContext } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import './Menu.css'
import letter from "../Shared/letter"

const Menu = ()=>{

    const {usuario,update} = useContext(UserContext)
    const navigation = useNavigate()

    useEffect(()=>{update()},[])

    return(
        <>
        <div className="Menu">
            <nav>
                <ul>
                    <li><NavLink to="/">Inicio</NavLink></li>
                    <li><NavLink to="/perfil">Perfil de {usuario.nombre && letter(usuario.nombre)} {usuario.apellido && letter(usuario.apellido) }</NavLink></li>
                    <li><NavLink to="/criptomonedas">Lista de Criptomonedas</NavLink></li>
                    <li><NavLink to="/login">Inicio de sesión</NavLink></li>
                    <li><Link onClick={()=>{
                        localStorage.removeItem("tokenUsuario")
                        localStorage.removeItem("idUser")
                        localStorage.removeItem("showM")
                        navigation("/login")
                    }}>Cerrar Sesión</Link></li>
                </ul>
            </nav>
        </div>
        </>
    )

}

export default Menu