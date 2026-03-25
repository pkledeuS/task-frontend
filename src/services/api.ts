const API_URL = 'http://localhost:8000'

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