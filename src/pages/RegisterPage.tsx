import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registrarUsuario } from "../services/api"

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        
        try {
            const data = await registrarUsuario(email, password);
            console.log("Usuario registrado:", data);
            navigate('/login');
        } catch (error) {
            console.log("No se pudo registrar el usuario:", error);
            alert("Error al registrar al usuario");
        }
    };

    return (
        <>
            <section>
                <div>
                    <h2>Registro de cuenta</h2>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Email:
                            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </label>
                        <label>
                            Contraseña:
                            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </label>
                        <input type="submit" value={"Registrarse"} />
                    </form>
                    <p>
                        ¿Ya tienes cuenta?
                        <br />
                        <Link to="/login"> Inicia sesión aqui</Link>
                    </p>
                </div>
            </section>
        </>
    )
}

export default Register