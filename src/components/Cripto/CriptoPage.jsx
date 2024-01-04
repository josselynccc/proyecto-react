import { useEffect, useState } from "react"
import axios from "axios";
import { useParams } from "react-router-dom"
import CriptoPageHistory from "./CriptoPageHistory";

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
            <h1>{params.id}</h1>
            
            <div>
                <p>ranking: {cripto.rank}</p>
                <p>simbolo: {cripto.symbol}</p>
                <p>precio: {parseFloat(cripto.priceUsd).toFixed(3)}</p>
                <p>comprar: {parseFloat(cripto.supply).toFixed(3)}</p>
                <p>Precio de mercado: {parseFloat(cripto.marketCapUsd).toFixed(3)}</p>
            </div>

            <CriptoPageHistory/>
        </>
    )
}

export default CriptoPage