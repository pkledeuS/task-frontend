import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUsuario } from "../services/api";
import { Navbar } from '../components/Navbar';

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
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 bg-gray-100 flex items-center justify-center p-4">   
                <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
                    <h2 className="text-2x1 font-bold text-gray-800 text-center mb-6">
                        Inicio de sesión
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Correo:
                            </label>
                            <input 
                                type="email"
                                name="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                                placeholder="tu@correo.com"
                            />
                        </div>
                        <div>
                            <label>
                                Contraseña:
                            </label>
                            <input 
                                type="password" 
                                name="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                                placeholder="******"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors- mt-2"
                        >
                            Ingresar
                        </button>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-600">
                        ¿Aun no tienes cuenta?
                        <br />
                        <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"> 
                            Registrate aqui
                        </Link>
                    </p>
                </div>
            </div> 
        </div>
    )
}

export default Login