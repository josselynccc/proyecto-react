import { useEffect, useState } from "react"
import axios from "axios";
import { useParams } from "react-router-dom"
import CriptoPageHistory from "./CriptoPageHistory";
import Upper from "../Shared/upper"
const CriptoPage=()=>{

    const API_URL= import.meta.env.VITE_API_URL
    const params = useParams() 
    const [cripto,setcripto]=useState([])

    console.log(API_URL+'assets/'+params.id)
    console.log(params)

    useEffect(()=>{
        axios.get(`${API_URL}assets/${params.id}`)
        .then((data) =>{
            console.log(data.data.data)
            setcripto(data.data.data)
        })
        .catch(()=>{
            console.error("la peticion fallo")
        })
    },[])

    if(!cripto.id) return <><span>Cargando...</span></>

    return (
        <>
            <h1>{Upper(params.id)}</h1>
            
            <div>
                <p>Ranking :  <span> { cripto.rank}</span></p>
                <p>Simbolo :  <span> { cripto.symbol}</span></p>
                <p>Precio :  <span> { parseFloat(cripto.priceUsd).toFixed(3)}</span></p>
                <p>Comprar :  <span> { parseFloat(cripto.supply).toFixed(3)}</span></p>
                <p>Precio de mercado :  <span> {parseFloat(cripto.marketCapUsd).toFixed(3)}</span></p>
            </div>

            <CriptoPageHistory/>
        </>
    )
}

export default CriptoPage