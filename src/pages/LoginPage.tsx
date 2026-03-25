import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUsuario } from "../services/api";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        
        try {
            const data = await loginUsuario(email, password);
            console.log("Login correcto", data);
            localStorage.setItem('token', data.access_token);
            navigate('/dashboard')
            
        } catch (error) {
            console.log("No se pudo iniciar sesion", error);
            alert("Error al logarse")
        }
    }

    return (
        <>
            <section>
                <div>   
                    <h2>Inicio de sesión</h2>
                </div>    
            
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            email:
                            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </label>
                        <label>
                            contraseña:
                            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </label>
                        <input type="submit" value="Ingresar" />
                    </form>
                    <p>
                        ¿Aun no tienes cuenta?
                        <br />
                        <Link to="/register"> Registrate aqui</Link>
                    </p>
                </div>
            </section>
        </>
    )
}

export default Login