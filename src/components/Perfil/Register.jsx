import "./Perfil.css"
import axios from "axios";
import Imagen from "../../assets/usuario.png"
import { useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "../Alert/Alert"
import { useNavigate } from "react-router-dom";
import letter from "../Shared/letter"
import Mostrar from "../../assets/mostrar.jpg"
import Ocultar from "../../assets/ocultar.jpg"
const Register = ()=>{

    const navigate = useNavigate()
    const { register, watch, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange",        // valida mientras se escribe
        reValidateMode: "onBlur" // vuelve a validar al salir del campo
    });
    const [alertType, setAlertType] = useState('none')
    const [alertMessage, setAlertMessage] = useState('')
    const [seePass, setSeePass] = useState(false)
    const [seeConfirmPass, setSeeConfirmPass] = useState(false)
    const [cargando,setCargando] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)

    function submit(data) {
    setCargando(true);
    
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("nombre", letter(data.nombre));
    formData.append("apellido", letter(data.apellido));
    formData.append("edad", data.edad);
    if (selectedFile) {
    formData.append("foto", selectedFile);
    }

    axios
      .post(`https://servidor-email-production.up.railway.app/api/1.0/auth/register`, formData)
      .then((response) => {
        console.log(formData)
        if (response.status === 200) {
          setAlertMessage("Usuario registrado. Revisa tu correo para verificar tu cuenta.");
          setAlertType("success");
        }
        if (response.status === 204) {
          setAlertMessage("Usuario registrado. Cuenta Verificada.");
          setAlertType("success");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
        })
      .catch((error) => {
        console.error("Error al registrar:", error);
        setAlertMessage("Ocurrió un error al registrar. Intenta nuevamente.");
        setAlertType("error");
        setCargando(false);
        });
    }

    return (
    <>
      <div className="login-container Tcenter">
        <form onSubmit={handleSubmit(submit)}>
          <span className="glow-line right"></span>
          <h2>Registrarse</h2>
          <img src={Imagen} alt="" />

          {/* EMAIL */}
          <div className="field">
            <label htmlFor="email">Correo</label>
            <div className="container-input">
              <input
                {...register("email", {
                  required: "El correo es requerido",
                  minLength: {
                    value: 4,
                    message: "El correo debe tener al menos 4 caracteres"
                  }
                })}
                autoComplete="email"
                type="email"
                name="email"
              />
            </div>
            {errors?.email && <div className="error">{errors.email.message}</div>}
          </div>

          {/* PASSWORD */}
          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <div className="container-input">
                <input
                  {...register("password", {
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 4,
                      message: "La contraseña debe tener al menos 4 caracteres"
                    }
                  })}
                  autoComplete="new-password"
                  type={seePass ? "text" : "password"}
                  name="password"
                />
              </div>
              <button type="button" style={{ borderRadius: "100%" }} onClick={() => setSeePass((prev) => !prev)}>
                <img style={{ width: "20px", borderRadius: "100%" }} src={seePass ? Ocultar : Mostrar} alt="" />
              </button>
            </div>
            {errors?.password && <div className="error">{errors.password.message}</div>}
          </div>

          {/* CONFIRMAR PASSWORD */}
          <div className="field">
            <label>Confirmar contraseña</label>
            <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <div className="container-input">
                <input
                  type={seeConfirmPass ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("passwordDouble", {
                    required: "Debes confirmar la contraseña",
                    validate: (value) => value === watch("password") || "Las contraseñas no coinciden"
                  })}
                />
              </div>
              <button type="button" style={{ borderRadius: "100%" }} onClick={() => setSeeConfirmPass((prev) => !prev)}>
                <img style={{ width: "20px", borderRadius: "100%" }} src={seeConfirmPass ? Ocultar : Mostrar} alt="" />
              </button>
            </div>
            {errors?.passwordDouble && <div className="error">{errors.passwordDouble.message}</div>}
          </div>

          {/* NOMBRE */}
          <div className="field">
            <label htmlFor="nombre">Nombre</label>
            <div className="container-input">
              <input
                {...register("nombre", {
                  required: "El nombre es requerido",
                  minLength: {
                    value: 4,
                    message: "El nombre debe tener al menos 4 caracteres"
                  }
                })}
                autoComplete="username"
                type="text"
                name="nombre"
              />
            </div>
            {errors?.nombre && <div className="error">{errors.nombre.message}</div>}
          </div>

          {/* APELLIDO */}
          <div className="field">
            <label htmlFor="apellido">Apellido</label>
            <div className="container-input">
              <input
                {...register("apellido", {
                  required: "El apellido es requerido",
                  minLength: {
                    value: 4,
                    message: "El apellido debe tener al menos 4 caracteres"
                  }
                })}
                autoComplete="userlastname"
                type="text"
                name="apellido"
              />
            </div>
            {errors?.apellido && <div className="error">{errors.apellido.message}</div>}
          </div>

          {/* EDAD */}
          <div className="field">
            <label htmlFor="edad">Edad</label>
            <div className="container-input">
              <input
                {...register("edad", {
                  required: "La edad es requerida",
                  min: {
                    value: 18,
                    message: "Debes tener la mayoría de edad"
                  },
                  max: {
                    value: 99,
                    message: "Edad inválida"
                  }
                })}
                autoComplete="edad"
                type="number"
                name="edad"
              />
            </div>
            {errors?.edad && <div className="error">{errors.edad.message}</div>}
          </div>

        {/* FOTO DE PERFIL */}
        <div className="field">
            <label htmlFor="foto">Foto de perfil</label>
            <div className="container-input">
                <input
                type="file"
                name="foto"
                accept="image/*"
                {...register("foto")}
                onChange={(e) => setSelectedFile(e.target.files[0])}
                />
            </div>
        </div>

          {/* BOTÓN */}
        <div className="submit">
            <input
              type="submit"
              value={cargando ? "Enviando Correo para verificación" : "Registrarse"}
            />
        </div>
        </form>
      </div>
      <Alert message={alertMessage} type={alertType} />
    </>
  );
};

export default Register