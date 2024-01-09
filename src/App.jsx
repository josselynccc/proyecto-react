
import { Navigate, Outlet } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import './index.css';

const App = () => {
    let isRedirected = sessionStorage.getItem('isRedirected');
    if (!isRedirected) {
      sessionStorage.setItem('isRedirected', true);
      window.location.reload(true);
    }

    if (!localStorage.getItem("tokenUsuario")) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <div className="ContainerMenu">
                <Menu />
            </div>
            <div className="ContainerBody">
                <Outlet />
            </div>
        </>
    );
}

export default App;