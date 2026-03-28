export interface Usuario {
    email: string
    password: string
}

export interface UsuarioResponse {
    id: number
    email: string
    activo: boolean
}

export interface Tarea {
    id: number
    nombre_tarea: string
    description: string
    fecha: string
    hora: string
    temino: boolean
}