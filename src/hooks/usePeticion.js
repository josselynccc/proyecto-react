import { useEffect, useState } from "react"
import  axios  from "axios"

const usePeticion=(endpoint)=>{

    const [data,setdata]=useState([])
    const API_URL=import.meta.env.VITE_API_URL

    useEffect(()=>{
        axios.get(`${API_URL}${endpoint}`,{
          headers: {
            Authorization: 'Bearer 3ffe6bc2db168942c86803d2a75d07d66554b8afb7ec7837cdd0498d38255f85'
          } 
        })
        .then(async (data) =>{
            if (typeof endpoint === "string") {
                data = await axios.get(`${API_URL}${endpoint}`);
              } else if (Array.isArray(endpoint)) {
                data = await axios.get(`${API_URL}${endpoint[0]}`);
              } else if (typeof endpoint === "object") {
                data = await axios.get(`${API_URL}${endpoint.path}`);
              }
            /* console.log(data.data.data) */
            setdata(data.data.data)
        })
        .catch(()=>{
            console.log('ALGO FALLO... ')
        })
    },[])

    return data
}

export default usePeticion