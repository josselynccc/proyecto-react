import { useEffect, useState } from "react"
import  axios  from "axios"

const usePeticion=(endpoint)=>{

    const [data,setdata]=useState([])
    const API_URL=import.meta.env.VITE_API_URL

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
            "Bearer 3ffe6bc2db168942c86803d2a75d07d66554b8afb7ec7837cdd0498d38255f85",
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