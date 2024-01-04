import { useEffect, useState } from 'react';
import {Cripto} from '../Cripto/cripto';
import axios from "axios";
import './Inicio.css';

function Inicio() {
  const API_URL= import.meta.env.VITE_API_URL

  const [criptos,setcriptos]=useState([])

  /* useEffect(() => {
    fetch(`${API_URL}assets`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        setcriptos(data.data)
      })
      .catch(() => {
        console.error("La petición falló");
      });
  }, []); */


  useEffect(() => {
    axios.get(`${API_URL}assets`)
      .then((data) => {
        console.log(data)
        setcriptos(data.data.data)
      })
      .catch(() => {
        console.error("La petición falló");
      });
  }, []);



  if(!criptos) return <><span>Cargando...</span></>

  return (
    <>
      <h1>LISTA DE CRIPTOMONEDAS</h1>
      <div>
        <div className='container-list'>
        {criptos.map(({id,name,priceUsd,symbol,changePercent24Hr}) => (
          <Cripto
            id={id}
            key={id}
            name={name}
            priceUsd={Number(priceUsd)}
            symbol={symbol}
            changePercent24Hr={Number(changePercent24Hr)}
          />
        ))}
        </div>
      </div>
    </>
  );
}

export default Inicio;
