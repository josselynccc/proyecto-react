import { useEffect, useState } from "react"
import  axios  from "axios"

const usePeticion=(endpoint)=>{

    const [data,setdata]=useState([])
    const API_URL=import.meta.env.VITE_API_URL
    const API_P=import.meta.env.VITE_P

    useEffect(() => {
    let url = "";

    if (typeof endpoint === "string") {
      url = `${API_URL}${endpoint}`;
    } else if (Array.isArray(endpoint)) {
      url = `${API_URL}${endpoint[0]}`;
    } else if (typeof endpoint === "object") {
      url = `${API_URL}${endpoint.path}`;
    }

    axios
      .get(url, {
        headers: {
          Authorization:
            `Bearer ${API_P}`
        },
      })
      .then((response) => {
        setdata(response.data.data);
      })
      .catch((err) => {
        console.log("ALGO FALLÓ... ", err);
      });
  }, []);

    return data
}

export default usePeticion