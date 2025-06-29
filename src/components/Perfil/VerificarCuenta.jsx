import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "../Alert/Alert";

const VerificarCuenta =()=>{
    const navigate = useNavigate();
    const [alertType, setAlertType] = useState('none')
    const [alertMessage, setAlertMessage] = useState('')

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
        axios
            //.get(`https://servidor-email-production.up.railway.app/api/1.0/auth/verify-email?token=${token}`)
            .get(`http://localhost:3000/api/1.0/auth/verify?token=${token}`)
            .then(() => {
                setAlertMessage("Cuenta verificada correctamente.")
                setAlertType("success")
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            
            })
            .catch(() => {
                setAlertMessage("Token inválido o expirado.")
                setAlertType("error")
                setTimeout(() => {
                    navigate("/register");
                }, 1000);
            });
        }
  }, []);
  return <Alert message={alertMessage} type={alertType}></Alert>;
}

export default VerificarCuenta