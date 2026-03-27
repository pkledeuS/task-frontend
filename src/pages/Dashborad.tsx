import React, { useEffect, useState } from "react"
import { obtenerTareas, crearTarea, eliminarTarea } from "../services/api"

interface Tarea {
    id: number;
    nombre_tarea: string;
}

function Dashboard() {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [termino, setTermino] = useState(false);

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
    }, []);

    return (
        <>
            <section>
                <h1>Bienvenido</h1>
                {tareas.map((tarea) => (
                    <div key={tarea.id}>
                        <p>{tarea.nombre_tarea}</p>
                        <input type="button" value={"Eliminar Tarea"} onClick={() => handleEliminarTarea(tarea.id) } />
                    </div>
                ))}
            </section>
            <section>
                <h3>Crear nueva Tarea</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre de la tarea:
                        <input type="text" name="nombre_tarea" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Descripcion:
                        <input type="text" name="descripcion_tarea" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
                    </label>
                    <br />
                    <label>
                        Fecha:
                        <input type="date" name="fecha_tarea" value={fecha} onChange={(e) => setFecha(e.target.value)}/>
                    </label>
                    <br />
                    <label>
                        hora:
                        <input type="time" name="hora_tarea" value={hora} onChange={(e) => setHora(e.target.value)}/>
                    </label>
                    <br />
                    <label>
                        termino:
                        <input type="checkbox" name="termino_tarea" checked={termino} onChange={(e) => setTermino(e.target.checked)}/>
                    </label>
                    <br />
                    <input type="submit" value={"Crear tarea"} />
                </form>
            </section>
        </>
    )
}

export default Dashboard