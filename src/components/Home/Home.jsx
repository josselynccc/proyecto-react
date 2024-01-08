import { Link } from "react-router-dom"
import './Home.css'
import Alert from "../Alert/Alert"
import { useEffect, useState } from "react"
const Home =()=>{
    const [showmessage,setshowmessage] = useState(true)
    
    useEffect(()=>{
        const showM = localStorage.getItem("showM")
        if(!showM){
            setshowmessage(true)
            const timeout = setTimeout(()=>{
                setshowmessage(false)
                localStorage.setItem('showM','true')
            },1000)
            return()=> clearTimeout(timeout)
        }
        else{
            setshowmessage(false)
        }
    },[])


    return(
        <>
        {showmessage && 
        <div className="div_alert">
            <Alert  message="¡Sesión Iniciada!" type="success" />
        </div>
        }
        
        <h1 className="HomeTitle">Bienvenidos</h1>
        <div className="DivHomeCripto">
            <Link className="HomeCripto" to="/criptomonedas">VER CRIPTOMONEDAS</Link>
        </div>
        </>
    )
}
export default Home