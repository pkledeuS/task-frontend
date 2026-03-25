import { useEffect, useState } from "react"
import { obtenerTareas } from "../services/api"

interface Tarea {
    id: number;
    nombre_tarea: string;
}

function Dashboard() {
    const [tareas, setTareas] = useState<Tarea[]>([]);

    useEffect(() => {
        const cargarTareas = async () => {
            try {
                const data = await obtenerTareas();
                setTareas(data);
            } catch (error) {
                console.log("No se pudieron cargar las tareas", error)
            }
        };
        cargarTareas();
    }, [])

    return (
        <>
            <section>
                <h1>Bienvenido</h1>
                {tareas.map((tarea) => (
                    <div key={tarea.id}>
                        <p>{tarea.nombre_tarea}</p>
                    </div>
                ))}
            </section>
        </>
    )
}

export default Dashboard