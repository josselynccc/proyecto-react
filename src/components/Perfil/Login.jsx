import { useState } from "react"
import axios from "axios";
import { Navigate } from "react-router-dom";
import "./Perfil.css"
import Imagen from "../../assets/usuario.png"
import { Link } from "react-router-dom";

const Login =()=>{
    const[user,setUser]=useState({
        email:"",
        password:"",
    })

    const [cargando,setCargando]=useState(false)
    const [error,setError]= useState(undefined)


    function submit(e){
        setCargando(true)
        e.preventDefault(); // para que no se dispare el formuladiro directamente y actualice la pagina
        //console.log(e.target)
        //console.log(user)
        axios.post(`https://servidordeprueba-efb66b95c2c5.herokuapp.com/api/1.0/auth/login`, user)
        .then(data=>{
            setCargando(false)
            console.log(data.data)
            localStorage.setItem("idUser",data.data.data._id)
            localStorage.setItem("tokenUsuario",data.data.tokenSession)
        })
        .catch(e=>{ 
            setCargando(false)
            setError(e)
            console.error(e)})
    }

    if( localStorage.getItem("tokenUsuario")) return <Navigate to="/"></Navigate>

 return <>
 <div className="login-container Tcenter">
    <form action="" onSubmit={submit}>
        
    <h1>Iniciar sesión</h1>
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
        <div className="submit">
            <input type="submit" value={cargando ? "Cargando" : "Ingresar"} name="" id="" />
        </div>
        
        <Link className="submit" to="/register"><input type="button" value="Registrarse" /></Link>
    </form>
    {error && <span className="error">{JSON.stringify(error.response.data)}</span>}
 </div>
 </>
}
export default Login