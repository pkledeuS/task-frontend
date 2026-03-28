import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            return <Navigate to={"/login"} />
        }

        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp && decodedToken.exp < currentTime) {
                localStorage.removeItem('token');
                alert ("Token expirado, serás redirigido");

                return <Navigate to ={"/login"} />
            }

        } catch (error) {
            localStorage.removeItem('token');
            console.log("Token inválido", error)
            alert ("Token inválido, serás redirigido");

            return <Navigate to={"/login"} />
        }

        return <Outlet />;
    };

export default ProtectedRoute;