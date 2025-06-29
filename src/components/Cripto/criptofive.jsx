import usePeticion from "../../hooks/usePeticion";
import "./cripto.css"
import Upper from "../Shared/upper"

import bitImg from "../../assets/bit.png"
import bitPImg from "../../assets/bitp.png"
import bitWImg from "../../assets/bitw.jpg"
import pxImg from "../../assets/px.png"
import tetherImg from "../../assets/tether.jpg"
import { useRef, useEffect } from "react";

const CriptoFive = () =>{
    const criptos= usePeticion(`assets`)
    const criptosOrder = criptos.sort((a,b) => b.priceUsd - a.priceUsd)
    const criptofive = criptosOrder.slice(0,5)

    const imgs = [bitImg, bitPImg, bitWImg, pxImg, tetherImg]


    const secciones = useRef([]);
    useEffect(()=>{
        const targets = [...secciones.current];
        if (targets.length === 0) return;
        const observer = new IntersectionObserver(
            (entries)=>{
                entries.forEach((entry)=>{
                    const target = entry.target
                    if(entry.isIntersecting){
                        target.classList.add("apilado")
                        target.classList.remove("oculto")
                    } else{
                        target.classList.add("oculto")
                        target.classList.remove("apilado")
                    }
                })
            },
            {
                threshold: 0.5
            }
        )
        targets.forEach((el)=>{ el &&observer.observe(el)})

        return ()=>{
            targets.forEach((el)=>{ el && observer.unobserve(el)})
        }
    },[criptofive.length])

    return(
        <>
        <div className="contenedor-cripto">
            {criptofive.map((objeto, index) => (
                <section
                key={objeto.id}
                ref={(el=> (secciones.current[index] = el))}
                className="imgcripto apilado"
                style={{ backgroundImage: `url(${imgs[index]})` , zIndex: 100 - index,}}
                >
                <div className="divfivecripto">
                    <h2 className="cripto-nombre-vertical">{Upper(objeto.id)}</h2>
                    <div className="cripto-detalles">
                        <p>Precio USD: <span>{parseFloat(objeto.priceUsd).toFixed(4)}</span></p>
                        <p>Símbolo: <span>{objeto.symbol}</span></p>
                        <p>Cambio 24h: <span>{parseFloat(objeto.changePercent24Hr).toFixed(3)}%</span></p>
                    </div>
                </div>
                </section>
            ))}
        </div>
                
            
        </>
    )
}
export default CriptoFive