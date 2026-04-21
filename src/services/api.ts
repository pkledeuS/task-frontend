const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function registrarUsuario (email: string, password: string) {
    const response = await fetch(`${API_URL}/registro/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, contraseña: password})
    })
        
    if (!response.ok) {
        throw new Error("Error al registrar usuario")
    }

    return response.json()
}

export async function loginUsuario(email: string, password: string) {
    const formData = new URLSearchParams()
    formData.append('username', email)
    formData.append('password', password)

    const response = await fetch(`${API_URL}/usuario/`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
    })

    if (!response.ok) {
        throw new Error("Credenciales incorrectas")
    }

    return response.json()
}

export async function obtenerTareas() {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/tarea/`, {
        headers:{
            'Authorization' : `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error ("Error al obtener tarea")
    }

    return response.json()
}

export async function crearTarea (nombre: string, descripcion: string, fecha: string, hora: string, termino: boolean) {
    const token = localStorage.getItem('token')
    
    const response = await fetch(`${API_URL}/tarea/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre_tarea: nombre, description: descripcion, fecha, hora, termino})
    })
        
    if (!response.ok) {
        throw new Error("Error al registrar la tarea")
    }

    return response.json()
}

export async function editarTarea (id: number, tareaActualizada: any){
    const token = localStorage.getItem('token');

    const response = await fetch (`${API_URL}/tarea/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tareaActualizada)
    })

    if (!response.ok) {
        throw new Error("Error al modificar la tarea")
    }

    return response.json();
};

export async function eliminarTarea (id: number) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/tarea/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (!response.ok) {
        throw new Error("Error al eliminar la tarea")
    }

    return response.json()
}