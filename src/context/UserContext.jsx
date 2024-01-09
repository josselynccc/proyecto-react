import {  createContext,useEffect,useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

export const UserContext = createContext()

const UserContextProvider = ({children})=>{
    
    const [usuario, setUsuario]=useState({})

    
    const update = async () =>{
        const tokenUsuario = localStorage.getItem("tokenUsuario");
        const id = localStorage.getItem("idUser")
        if(tokenUsuario && id)
        {
            axios.get(`https://servidordeprueba-efb66b95c2c5.herokuapp.com/api/1.0/users/${id}`, {headers: {Authorization: `Bearer ${tokenUsuario}`}})
        .then(data =>{
            setUsuario(data.data.data)
            /* console.log(data.data.data) */})
        .catch(e=>{console.log(e)})
        }
    }
    useEffect(()=>{update()},[])
    
    /* useEffect(()=>{
        setUsuario({
            name:"Beto Q.",
            registered:"15/agosto/2022"
        })
    },[]) */

    return (
        <>
        {usuario && <UserContext.Provider value={{usuario,update}}>
            {children}
        </UserContext.Provider>
        }
        
        </>
    )
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
} 

export default UserContextProvider