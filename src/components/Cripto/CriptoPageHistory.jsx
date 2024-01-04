import { useParams } from "react-router-dom"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Bar } from "react-chartjs-2"
import {format} from "date-fns"
import usePeticion from "../../hooks/usePeticion";


const CriptoPageHistory=()=>{
    const params = useParams()
    const cripto1=usePeticion(`assets/${params.id}/history?interval=d1`)
    const formattedDates = cripto1.map((item) => format(new Date(item.time), "dd/MM/yyyy"));
    

    /* useEffect(()=>{
        axios.get(`${API_URL}assets/${params.id}/history?interval=d1`)
        .then((data) =>{
            console.log(data.data.data)
            setcripto(data.data.data)
        })
        .catch(()=>{
            console.log('ALGO FALLO... ')
        })
    },[]) */

    if(!cripto1) return <><span>Cargando...</span></>

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    )

// Configurar los datos del gráfico
    const chartData = {
        labels: formattedDates,
        datasets: [
          {
            label: 'Valores',
            backgroundColor: 'rgba(75,192,192,0.4)',
            data: cripto1.map((item)=>item.priceUsd),
          },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins:{
            legend: {
                position: "top"
            }
        },
        title:{
            display: true,
            text: 'Historia por día'
        }
      }

    return(
        <>
        
            {cripto1 && (
                <div>
                    <h1>Historia</h1>
                    <Bar data={chartData} options={chartOptions}/>
                </div>
            )}
        </>
    )
}

export default CriptoPageHistory