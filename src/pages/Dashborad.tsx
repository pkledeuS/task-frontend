import React, { useEffect, useState } from "react"
import { obtenerTareas, crearTarea, editarTarea, eliminarTarea } from "../services/api"
import { Navbar } from "../components/Navbar";

interface Tarea {
    id: number;
    nombre_tarea: string;
    description: string;
    fecha: string;
    hora: string;
    termino: boolean;
}

const obtenerEmailDelToken = () =>{
    const token = localStorage.getItem('token');

    if (!token) return null;

    try {
        const payloadBase64 = token.split('.')[1];
        const payloadDecoded = JSON.parse(atob(payloadBase64));

        return payloadDecoded.sub;
    } catch (error) {
        console.log("Error al decodificar el token", error)

        return null;
    }
};

function Dashboard() {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [termino, setTermino] = useState(false);
    const [usuarioEmail, setUsuarioEmail] = useState<string | null>(null);

    const handleCargarTareas = async () => {
        try {
            const data = await obtenerTareas();
            setTareas(data);
        } catch (error) {
            console.log("No se pudieron cargar las tareas", error)
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const data = await crearTarea(nombre, descripcion, fecha, hora, termino);
            console.log("Tarea regitrada", data);

            await handleCargarTareas();
            limpiarFormulario();
        } catch {
            console.log("No se pudo crear la tarea");
            alert("Error al crear tarea");
        }
    };

    const handleModificarTarea = async (tareaSeleccionada: Tarea, nuevoEstadoTermino: boolean) => {
        try {
            const tareaActualizada = {
                nombre_tarea: tareaSeleccionada.nombre_tarea,
                description: tareaSeleccionada.description,
                fecha: tareaSeleccionada.fecha,
                hora: tareaSeleccionada.hora,
                termino: nuevoEstadoTermino,
            };
            
            const data = await editarTarea(tareaSeleccionada.id, tareaActualizada);
            console.log("Tarea modificada", data);

            await handleCargarTareas();
        } catch {
            console.log("No se pudo modificar la tarea");
            alert("Error al modificar tarea");
        }
    };

    const handleEliminarTarea = async (id: number) => {
        try {
            const data = await eliminarTarea(id);
            setTareas(prev => prev.filter(t => t.id !== id));
            console.log("Tarea eliminada", data);
            alert("Tarea eliminada con exito")
        } catch {
            console.log("No se pudo eliminar la tarea")
            alert("Error al eliminar tarea")
        }
    };

    const limpiarFormulario = () => {
        setNombre('');
        setDescripcion('');
        setFecha('');
        setHora('');
        setTermino(false);
    }

    useEffect(() => {
        handleCargarTareas();
        const email = obtenerEmailDelToken();
        setUsuarioEmail(email);
    }, []);

    const inputClasses = "w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all";
    const labelClasses = "block text-sm font-medium text-gray-700";

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8 px-6 shadow-inner">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        ¡Hola, {usuarioEmail ? usuarioEmail : 'Usuario'}! 👋
                    </h2>
                    <p className="mt-2 text-blue-100 text-lg">
                        Aquí tienes el resumen de tus tareas.
                        {tareas.length > 0 && ` Tienes ${tareas.length} tareas registradas.`}
                    </p>
                </div>
            </div>
            <div className="flex-1 bg-gray-50 p-6 md:p-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <section>
                        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mis Tareas</h1>
                        <div className="space-y-4">
                            {tareas.length === 0 ? (
                                <p className="text-gray-500 italic">No hay tareas creadas aún.</p>
                            ) : (
                                tareas.map((tarea) => (
                                    <div 
                                        key={tarea.id} 
                                        className={`bg-white p-5 rounded-xl shadow-sm border flex justify-between items-center hover:shadow-md transition-all duration-300 ${tarea.termino ? "border-green-200 bg-gray-50 opacity-80" : "border-gray-100"}`}>
                                        <div className="flex-1 pr-4">
                                            <p className={`text-lg font-semibold transition-all ${tarea.termino ? "text-gray-400 line-through" : "text-gray-800"}`}>{tarea.nombre_tarea}</p>
                                            {tarea.description && (
                                            <p className={`text-sm mt-1 truncate ${tarea.termino ? "text-gray-400" : "text-gray-500"}`}>{tarea.description}</p>)}
                                            {tarea.fecha && (
                                            <p className={`text-sm mt-1 truncate ${tarea.termino ? "text-gray-400" : "text-gray-500"}`}>{tarea.fecha}</p>)}
                                            {tarea.hora && (
                                            <p className={`text-sm mt-1 truncate ${tarea.termino ? "text-gray-400" : "text-gray-500"}`}>{tarea.hora}</p>)}
                                        </div>
                                        <div className="flex space-x-2 shrink-0">
                                            <button
                                                type="button"
                                                onClick={() => handleModificarTarea(tarea, !tarea.termino)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tarea.termino ? "bg-orange-50 text-orange-600 hover:bg-orange-100" : "bg-green-50 text-green-600 hover:bg-green-100"}`}
                                            >
                                                {tarea.termino ? "Desmarcar" : "Completar"}
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={() => handleEliminarTarea(tarea.id)}
                                                className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                    <section>
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Crear nueva Tarea</h3>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className={labelClasses}>Nombre de la tarea:</label>
                                    <input 
                                        type="text" 
                                        name="nombre_tarea" 
                                        value={nombre} 
                                        onChange={(e) => setNombre(e.target.value)} 
                                        className={inputClasses}
                                        placeholder="Ej: Ordenar"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Descripción:</label>
                                    <textarea 
                                        name="descripcion_tarea" 
                                        value={descripcion} 
                                        onChange={(e) => setDescripcion(e.target.value)}
                                        className={`${inputClasses} resize-none`}
                                        rows={3}
                                        placeholder="Detalles adicionales..."
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClasses}>Fecha:</label>
                                        <input 
                                            type="date" 
                                            name="fecha_tarea" 
                                            value={fecha} 
                                            onChange={(e) => setFecha(e.target.value)}
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Hora:</label>
                                        <input 
                                            type="time" 
                                            name="hora_tarea" 
                                            value={hora} 
                                            onChange={(e) => setHora(e.target.value)}
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center pt-2">
                                    <input 
                                        type="checkbox" 
                                        id="termino_tarea"
                                        name="termino_tarea" 
                                        checked={termino} 
                                        onChange={(e) => setTermino(e.target.checked)}
                                        className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-3 cursor-pointer"
                                    />
                                    <label htmlFor="termino_tarea" className="text-sm font-medium text-gray-700 cursor-pointer">
                                        Marcar como terminada
                                    </label>
                                </div>
                                <button 
                                    type="submit" 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors mt-6 shadow-md"
                                >
                                    Guardar Tarea
                                </button>
                            </form>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    )
}

export default Dashboard