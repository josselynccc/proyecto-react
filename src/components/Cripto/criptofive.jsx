import usePeticion from "../../hooks/usePeticion";
import "./cripto.css"
import Upper from "../Shared/upper"
const CriptoFive = () =>{
    const criptos= usePeticion(`assets`)
    const criptosOrder = criptos.sort((a,b) => b.priceUsd - a.priceUsd)
    const criptofive = criptosOrder.slice(0,5)
    console.log(criptofive)
    return(
        <>
                {criptofive.map((objeto) => (
                    <div className="divfivecripto" key={objeto.id}>
                        <h2>{Upper(objeto.id)}</h2>
                        <p>PrecioUSD: <span>{parseFloat(objeto.priceUsd).toFixed(4)}</span></p>
                        <p>Simbolo: <span>{objeto.symbol}</span></p>
                        <p>Cambio de porcentaje en las ultimas 24h: <span>{parseFloat(objeto.changePercent24Hr).toFixed(3)}%</span></p>
                    </div>
                ))}
            
        </>
    )
}
export default CriptoFive