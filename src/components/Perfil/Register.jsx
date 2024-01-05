import "./Perfil.css"
import axios from "axios";
import Imagen from "../../assets/usuario.png"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ()=>{
    const [user,setUser] = useState({
    email:"",
    password:"",
    nombre:"",
    apellido:"",
    edad:0,
    })

    const [cargando,setCargando] = useState(false)

    const [error,setError] = useState("")
    const navigation = useNavigate()

    function submit(e){
        setCargando(true)

        e.preventDefault()
        console.log(e)

        axios.post(`http://localhost:3000/api/1.0/auth/register`, user)
        .then(data=>{
            console.log(data)
            navigation('/login')
        })
            .catch(e=>{setError(e)})
    }


    return (<>
    <div className="login-container Tcenter">
    <form action="" onSubmit={submit}>
        
    <h1>Registrarse</h1>
    <img src={Imagen} alt="" />

        <div className="field">
            <label htmlFor="email">Correo</label>
            <input required autoComplete="username" type="email" name="email" 
                onChange={(e)=>{
                    setUser({
                        ...user, //que lea lo que hay en el user
                        email: e.target.value
                    })
                }}
            />
        </div>
        <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input required autoComplete="current-password" type="password" name="password"
                onChange={(e)=>{
                    setUser({
                        ...user, //que lea lo que hay en el user
                        password: e.target.value
                    })
                }}
            />
        </div>
        <div className="field">
            <label htmlFor="nombre">Nombre</label>
            <input required autoComplete="username" type="text" name="name" 
                onChange={(e)=>{
                    setUser({
                        ...user, //que lea lo que hay en el user
                        nombre: e.target.value
                    })
                }}
            />
        </div>
        <div className="field">
            <label htmlFor="apellido">Apellido</label>
            <input required autoComplete="username" type="text" name="apellido" 
                onChange={(e)=>{
                    setUser({
                        ...user, //que lea lo que hay en el user
                        apellido: e.target.value
                    })
                }}
            />
        </div>
        <div className="field">
            <label htmlFor="edad">Edad</label>
            <input required autoComplete="username" type="number" name="edad" 
                onChange={(e)=>{
                    setUser({
                        ...user, //que lea lo que hay en el user
                        edad: e.target.value
                    })
                }}
            />
        </div>
        <div className="submit">
            <input type="submit" value={cargando ? "Creando usuario" : "Registrarse"} name="" id="" />
        </div>

    </form>
    {error && <span className="error">{JSON.stringify(error.response.data)}</span>}
 </div>
    </>)
}

export default Register