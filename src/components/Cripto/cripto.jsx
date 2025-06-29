import PropTypes from 'prop-types';
import "./cripto.css"
import { Link } from 'react-router-dom';
export const Cripto=({id,name,priceUsd,symbol, changePercent24Hr, index})=>{
    let color = ""
    if(changePercent24Hr>0){
        color ="green"
    }else{color="red"}

    return(
        <>
        <Link className='LinkCripto' to={`/criptomonedas/${id}`}>
            <div className='contaniner-cripto' style={{ animationDelay: `${index * 100}ms` }}>
                <h2>{name}</h2>
                <p>Precio : <span>{parseFloat(priceUsd).toFixed(4)}</span></p>
                <p>Código : <span>{symbol}</span></p>
                <p>Cambio 24hrs : <span className={color}>{parseFloat(changePercent24Hr).toFixed(3)}%</span></p>
                
            </div>
        </Link>
        </>
    )
}

Cripto.propTypes ={
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    symbol:PropTypes.string.isRequired,
    changePercent24Hr : PropTypes.number.isRequired,
    priceUsd : PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
}