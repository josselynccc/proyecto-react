import "./Perfil.css"
import axios from "axios";
import Imagen from "../../assets/usuario.png"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ()=>{
    const [user,setUser] = useState({
    email:"",
    password:""
    })

    const [cargando,setCargando] = useState(false)

    const [error,setError] = useState("")
    const navigation = useNavigate()

    function submit(e){
        setCargando(true)
        e.preventDefault()
        console.log(e)

        axios.post(`https://reqres.in/api/register`, user)
        .then(data=>{
            console.log(data)
            navigation("/login")
            }
            )
            .catch(e=>{setError(e)})

        axios.post(`https://reqres.in/api/users`, user)
        .then(data=>{
            console.log(data)})

        axios.get(`https://gorest.co.in/public/v2/users`, user)
        .then(data=>{
            console.log(data)})
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
        <div className="submit">
            <input type="submit" value={cargando ? "Cargando" : "Registrarse"} name="" id="" />
        </div>

    </form>
    {error && <span className="error">{JSON.stringify(error.response.data)}</span>}
 </div>
    </>)
}

export default Register