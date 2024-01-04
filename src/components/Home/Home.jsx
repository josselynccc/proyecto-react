import { Link } from "react-router-dom"
import './Home.css'
const Home =()=>{
    return(
        <>
        
        <h1 className="HomeTitle">Bienvenidos a ED</h1>
        <div className="DivHomeCripto">
            <Link className="HomeCripto" to="/criptomonedas">VER CRIPTOMONEDAS</Link>
        </div>
        </>
    )
}
export default Home