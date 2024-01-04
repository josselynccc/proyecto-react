import {  createContext, useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

export const UserContext = createContext()

const UserContextProvider = ({children})=>{

    const id = localStorage.getItem("idUser")
    const [usuario, setUsuario]=useState({})

    function update(){
        axios.get(`https://reqres.in/api/users/${id}`, usuario)
        .then(data =>{
            setUsuario(data.data.data)
            console.log(data)})
        .catch(e=>{console.log(e)})
    }

    /* useEffect(()=>{
        setUsuario({
            name:"Beto Q.",
            registered:"15/agosto/2022"
        })
    },[]) */

    return (
        <>
        <UserContext.Provider value={{usuario,update}}>
            {children}
        </UserContext.Provider>
        </>
    )
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default UserContextProvider