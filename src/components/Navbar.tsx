import { Link, useLocation, useNavigate } from "react-router-dom";

export function Navbar() {
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login'); 
    };

    return (
        <nav className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center z-50 relative">
            <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    ✓
                </div>
                <span className="text-xl font-bold text-gray-800 tracking-tight">TaskFlow</span>
            </Link>

            <div className="space-x-4 flex items-center">
                {isAuthenticated ? (
                    <>
                        {location.pathname !== '/dashboard' && (
                            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                                Dashboard
                            </Link>
                        )}
                        <button 
                            onClick={handleLogout}
                            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
                        >
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <>
                        <Link 
                            to="/login" 
                            className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                        >
                            Iniciar Sesión
                        </Link>
                        <Link 
                            to="/register" 
                            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            Registrarse
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}