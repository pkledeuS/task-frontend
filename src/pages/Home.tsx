import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";

function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans overflow-x-hidden">
            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-20 md:py-24 flex flex-col items-center text-center">
                <div className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-100">
                    Potencia tu productividad diaria
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 max-w-4xl">
                    Organiza tu vida y trabajo en un <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">solo lugar</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed">
                    TaskFlow es la herramienta definitiva para gestionar tus tareas. 
                    Planifica tu día, marca objetivos completados y nunca más olvides los pendientes importantes.
                </p>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
                    <Link 
                        to="/register" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center transform hover:-translate-y-1"
                    >
                        Comenzar Gratis
                    </Link>
                    <Link 
                        to="/login" 
                        className="bg-white hover:bg-gray-50 text-gray-800 font-semibold px-8 py-4 rounded-xl text-lg transition-all border border-gray-200 shadow-sm flex items-center justify-center"
                    >
                        Ya tengo cuenta
                    </Link>
                </div>
                <div className="mt-24 w-full max-w-4xl relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-transparent to-transparent z-10 h-full w-full"></div>
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-start space-x-4">
                            <div className="w-5 h-5 rounded border-2 border-blue-500 mt-1"></div>
                            <div>
                                <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
                                <div className="h-3 w-32 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4 border border-green-100 flex items-start space-x-4 opacity-80">
                            <div className="w-5 h-5 rounded bg-green-500 text-white flex items-center justify-center text-xs">✓</div>
                            <div>
                                <div className="h-4 w-20 bg-green-300 rounded mb-2 line-through"></div>
                                <div className="h-3 w-28 bg-green-200 rounded"></div>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-start space-x-4">
                            <div className="w-5 h-5 rounded border-2 border-gray-300 mt-1"></div>
                            <div>
                                <div className="h-4 w-28 bg-gray-300 rounded mb-2"></div>
                                <div className="h-3 w-16 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default Home;