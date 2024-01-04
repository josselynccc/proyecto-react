// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Pagina404 from './components/404/4.4.jsx'
import Inicio from './components/Inicio/Inicio.jsx'
import Home from './components/Home/Home.jsx'
import CriptoPage from './components/Cripto/CriptoPage.jsx'
import Perfil from './components/Perfil/Perfil.jsx'
import UserContextProvider from './context/UserContext.jsx'
import Login from './components/Perfil/Login.jsx'
import Register from './components/Perfil/Register.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
<>
 <UserContextProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} >
        <Route index element={<Home />}/>
        <Route path='/perfil' element={<Perfil />}/>
      </Route>
      <Route path='/criptomonedas' element={<App />} >
        <Route index element={<Inicio />}/>
        <Route path=':id' element={<CriptoPage />} />
      </Route>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='*' element={<Pagina404 />} />
    </Routes>
    </BrowserRouter>
 </UserContextProvider>
</>
 
    
  // </React.StrictMode>,
)
