import { useEffect,useContext } from "react"
//import { UserContext } from "../../context/UserContext"
//import Imagen  from "../../assets/usuario.png"
import './Perfil.css';
import { UserContext } from "../../context/UserContext"
import {format} from "date-fns"

const Perfil=()=>{

    const {usuario,update} = useContext(UserContext)

    useEffect(()=>{update()},[])
    
    return (
        <div className="perfil">
          <h1>Perfil del Usuario</h1>
          <p><span>First Name:  </span>{usuario.nombre}</p>
          <p><span>Last Name:  </span>{usuario.apellido}</p>
          <p><span>Edad:  </span>{usuario.edad}</p>
          <p><span>Email:  </span>{usuario.email}</p> <br />
          <div>Agregado desde {format(new Date(usuario.createdAt), "dd/MM/yyyy")}</div>
        </div> 
      )

    }

    /*const usuario = useContext(UserContext)
    return <>
     <div className="Tcenter">
        <div className="content">
            <img src={Imagen} alt="" />
            <p>{usuario.name}</p>
        </div>
     </div>
    </>*/

export default Perfil