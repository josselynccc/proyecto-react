import { useState , useEffect} from "react"
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "./Perfil.css"
import Imagen from "../../assets/usuario.png"
import Mostrar from "../../assets/mostrar.jpg"
import Ocultar from "../../assets/ocultar.jpg"
import { Link } from "react-router-dom";
import Alert from "../Alert/Alert"

const Login =()=>{
    const[user,setUser]=useState({
        email:"",
        password:"",
    })

    const [cargando,setCargando]=useState(false)
    const [error,setError]= useState(undefined)
    const [position, setPosition] = useState({top:0, left:0})
    const [seePass, setSeePass] = useState(false)
    const [expand, setExpand] = useState(false);
    const navigate = useNavigate()

    function submit(e){
        setCargando(true)
        e.preventDefault(); // para que no se dispare el formuladiro directamente y actualice la pagina
        //console.log(e.target)
        //console.log(user)
        axios.post(`https://servidor-email-production.up.railway.app/api/1.0/auth/login`, user)
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

    function newInputPosition(e){
        if(!user.email || !user.password){
            e.preventDefault()
            const randomtop = Math.floor(Math.random()*100) - 100
            const randomLeft = Math.floor(Math.random() * (100 - 40 + 1)) + 40

            setPosition({
                top: randomtop,
                left: randomLeft
            })
        }
    }

    function changePass(e){
        if(user.password){
            e.preventDefault()
            setSeePass(prev => !prev)
        }
    }
    useEffect(() => {
        if (user.email && user.password) {
            setPosition({ top: 0, left: 0 }); // vuelve a su lugar
        }
    }, [user.email, user.password]);

    if( localStorage.getItem("tokenUsuario")) return <Navigate to="/"></Navigate>

 return <>

 <div className="login-container Tcenter">
    <form action="" className={expand ? "expandido" : "colapsado"} onSubmit={submit}>
    <span className="glow-line right"></span>

    <h2 onClick={() => setExpand(true)}>INICIAR SESIÓN</h2>

    {expand && (
        <>
            <img src={Imagen} alt="" />

            <div className="field">
                <label htmlFor="email">Correo</label>
                <div className="container-input">
                    <input required autoComplete="username" type="email" name="email" 
                        onChange={(e)=>{
                            setUser({
                                ...user, //que lea lo que hay en el user
                                email: e.target.value
                            })
                        }}
                    />
                </div>
            </div>
            <div className="field">
                <label htmlFor="password">Contraseña</label>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '5px'}}>
                    <div className="container-input">
                        <input required autoComplete="current-password" type={seePass? 'text' : 'password'} name="password"
                            onChange={(e)=>{
                                setUser({
                                    ...user, //que lea lo que hay en el user
                                    password: e.target.value
                                })
                            }}
                        />
                    </div>
                    <button type="button" style={{borderRadius: '100%' }} onClick={changePass}>
                        <img style={{ width: '20px', borderRadius: '100%' }} src={seePass? Ocultar : Mostrar} alt="" />
                    </button>
                </div>
            </div>
            <div className="submit">
                <input onMouseEnter={newInputPosition} style={
                    {
                        position: 'relative',
                        top: `${position.top}px`,
                        left:`${position.left}px`,
                        transition: 'top 0.2s, left 0.2s'
                    }
                } type="submit" value={cargando ? "CARGANDO" : "INGRESAR"} name=""/>
            </div>
            <Link className="submit" to="/register"><input type="button" value="REGISTRARSE" /></Link>
        
        </>)}
    </form>
    <div>
        {error ? <Alert message={error} type="error"/>: ""}
        
    </div>
    </div>
 </>
}
export default Login