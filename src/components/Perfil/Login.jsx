import { useState } from "react"
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "./Perfil.css"
import Imagen from "../../assets/usuario.png"
import { Link } from "react-router-dom";
import Alert from "../Alert/Alert"

const Login =()=>{
    const[user,setUser]=useState({
        email:"",
        password:"",
    })

    const [cargando,setCargando]=useState(false)
    const [error,setError]= useState(undefined)
    const navigate = useNavigate()

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
            setTimeout(()=>{
                navigate('/')
            },100000)
        })
        .catch(e=>{ 
            setCargando(false)
            setError(e.response.data.error)
            console.error(e)})
    }

    if( localStorage.getItem("tokenUsuario")) return <Navigate to="/"></Navigate>

 return <>
 <div className="login-container Tcenter">
    <form action="" onSubmit={submit}>
        
    <h2>Iniciar sesión</h2>
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
    <div>
        {error ? <Alert message={error} type="error"/>: ""}
        
    </div>
    </div>
 </>
}
export default Login