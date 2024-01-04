import { useState } from "react"
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "./Perfil.css"
import Imagen from "../../assets/usuario.png"

const Login =()=>{
    const[user,setUser]=useState({
        email:"",
        password:""
    })

    const [cargando,setCargando]=useState(false)
    const [error,setError]= useState(undefined)

    const navigation= useNavigate()

    function submit(e){
        setCargando(true)
        e.preventDefault(); // para que no se dispare el formuladiro directamente y actualice la pagina
        //console.log(e.target)
        //console.log(user)
        axios.post(`https://reqres.in/api/login`, user)
        .then(data=>{
            setCargando(false)
            localStorage.setItem("tokenUsuario",data.data.token)
            navigation("/")
        })
        .catch(e=>{ 
            setCargando(false)
            setError(e)
            console.error(e)})
            
        axios.get(`https://reqres.in/api/users`, {})
        .then(data=>{
            const arraydata= data.data.data
            const objData = arraydata.find(obj => obj.email === user.email)
            localStorage.setItem("idUser",objData.id)
            
            console.log(objData.id)
            console.log(user.email)
        })
        .catch(e=>{
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
        
    </form>
    {error && <span className="error">{JSON.stringify(error.response.data)}</span>}
 </div>
 </>
}
export default Login