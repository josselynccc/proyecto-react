import { Link } from "react-router-dom"
import './Home.css'
import Alert from "../Alert/Alert"
import CriptoFive from "../Cripto/criptofive"
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
            },2*1000)
            return()=> clearTimeout(timeout)
        }
        else{
            setshowmessage(false)
        }
    },[])


    return(
        <>
        {showmessage && 
        <div className="div_alert1">
            <Alert  message="¡Sesión Iniciada!" type="success" />
        </div>
        }
        
        <h1 className="HomeTitle">BIENVENIDO</h1><br />
        <div className="DivHomeCripto">
            <Link className="HomeCripto" to="/criptomonedas">VER CRIPTOMONEDAS</Link>
        </div> 

        <h1 className="HomeTitle2">LAS 5 CRIPTOMONEDAS CON MAYOR PRECIO</h1>
        <div  className="divfivecriptos"><CriptoFive /></div>
        </>


    )
}
export default Home