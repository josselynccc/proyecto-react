import { useEffect, useState } from "react"
//import { UserContext } from "../../context/UserContext"
//import Imagen  from "../../assets/usuario.png"
import axios from "axios";
import './Perfil.css';

const Perfil=()=>{

    
    const [datauser,setdatauser]= useState({})

    useEffect(()=>{
        const token = localStorage.getItem("tokenUsuario")
        const userID = localStorage.getItem("idUser")
        if(token && userID){
            axios.get(`https://reqres.in/api/users/${userID}`, {})
            .then((data) =>{setdatauser(data.data.data)
            console.log(data.data.data)
            })
            .catch((error)=>{ console.error ("error :", error)})
        }
    },[])
    
    return (
        <div className="perfil">
          <h1>Perfil del Usuario</h1>
          <img src={datauser.avatar} alt="" />
          <p><span>First Name: </span>{datauser.first_name}</p>
          <p><span>Last Name: </span>{datauser.last_name}</p>
          <p><span>Email: </span>{datauser.email}</p>
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