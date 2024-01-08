import "./Perfil.css"
import axios from "axios";
import Imagen from "../../assets/usuario.png"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert"
import { useForm } from "react-hook-form";

const Register = ()=>{

    const {register, handleSubmit, formState:{errors}} = useForm()

    const [user,setUser] = useState({
    email:"",
    password:"",
    nombre:"",
    apellido:"",
    edad:0,
    })

    const [data,setdata] = useState(undefined)


    const [cargando,setCargando] = useState(false)
    const navigation = useNavigate()

    function submit(){
        setCargando(true)


        axios.post(`https://servidordeprueba-efb66b95c2c5.herokuapp.com/api/1.0/auth/register`, user)
        .then(data=>{
            console.log(data)
            setdata(data.statusText)
            setTimeout(()=>{
                navigation('/login')
            },1000)
            
        })
            .catch(e=>{console.log(e)})
    }


    return (<>
    <div className="login-container Tcenter">
    <form action="" onSubmit={handleSubmit(submit)}>
        
    <h2>Registrarse</h2>
    <img src={Imagen} alt="" />

        <div className="field">
            <label htmlFor="email">Correo</label>
            <input 
                {...register("email" , 
                    {
                        required: "El correo es requerido",
                        minLength: {
                            value: 4,
                            message: "El correo debe tener al menos 4 caracteres"
                          }

                    })
                }
                autoComplete="username" type="email" name="email" 
                onChange={(e)=>{
                    setUser({
                        ...user, //que lea lo que hay en el user
                        email: e.target.value
                    })
                }}
            />
        </div>
        {errors?.email && <div className="error">{errors?.email?.message}</div> }
        <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input 
                {...register("password",
                    {
                        required: "La contraseña es requerido",
                        minLength: {
                            value: 4,
                            message: "La contraseña debe tener al menos 4 caracteres"
                          }
                        
                    })
                }
                autoComplete="current-password" type="password" name="password"
                onChange={(e)=>{
                    setUser({
                        ...user, //que lea lo que hay en el user
                        password: e.target.value
                    })
                }}
            />
        </div>
        {errors?.password && <div className="error">{errors?.password?.message}</div>}
        <div className="field">
            <label htmlFor="nombre">Nombre</label>
            <input 
                {...register("nombre",
                    {
                        required: "El nombre es requerido",
                        minLength: {
                            value: 4,
                            message: "El nombre debe tener al menos 4 caracteres"
                          }
                    
                    })
                }
                autoComplete="username" type="text" name="nombre" 
                onChange={(e)=>{
                    setUser({
                        ...user, //que lea lo que hay en el user
                        nombre: e.target.value
                    })
                }}
            />
        </div>
        {errors?.nombre && <div className="error">{errors?.nombre?.message}</div>}

        <div className="field">
            <label htmlFor="apellido">Apellido</label>
            <input
                {...register("apellido",
                    {
                        required: "El apellido es requerido",
                        minLength: {
                            value: 4,
                            message: "El apellido debe tener al menos 4 caracteres"
                          }
                    
                    })
                } 
                autoComplete="username" type="text" name="apellido" 
                onChange={(e)=>{
                    setUser({
                        ...user, //que lea lo que hay en el user
                        apellido: e.target.value
                    })
                }}
            />
        </div>
        {errors?.apellido && <div className="error">{errors?.apellido?.message}</div>}

        <div className="field">
            <label htmlFor="edad">Edad</label>
            <input 
                {...register("edad",
                    {
                        required: "La edad es requerida",
                        min: {
                            value:18,
                            message:"Debes tener la mayoría de edad"
                        },
                        max: {
                            value:99,
                            message:"Edad inválida"
                        }
                    })
                }
                autoComplete="username" type="number" name="edad" 
                onChange={(e)=>{
                    setUser({
                        ...user, //que lea lo que hay en el user
                        edad: e.target.value
                    })
                }}
            />
        </div>
        {errors?.edad && <div className="error">{errors?.edad?.message}</div>}

        <div className="submit">
            <input type="submit" value={cargando ? "Creando usuario" : "Registrarse"} name="" id="" />
        </div>
    </form>

    {data==="OK" ? 
    <div className="div_alert">
        <Alert message="USUARIO REGISTRADO!" type="success" />
    </div>
     : ""}

 </div>
    </>)
}

export default Register