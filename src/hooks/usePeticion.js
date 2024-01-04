import { useEffect, useState } from "react"
import  axios  from "axios"

const usePeticion=(endpoint)=>{

    const [data,setdata]=useState([])
    const API_URL=import.meta.env.VITE_API_URL

    useEffect(()=>{
        axios.get(`${API_URL}${endpoint}`)
        .then(async (data) =>{
            if (typeof endpoint === "string") {
                data = await axios.get(`${API_URL}${endpoint}`);
              } else if (Array.isArray(endpoint)) {
                data = await axios.get(`${API_URL}${endpoint[0]}`);
              } else if (typeof endpoint === "object") {
                data = await axios.get(`${API_URL}${endpoint.path}`);
              }
            console.log(data.data.data)
            setdata(data.data.data)
        })
        .catch(()=>{
            console.log('ALGO FALLO... ')
        })
    },[])

    return data
}

export default usePeticion