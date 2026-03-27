export interface Usuario {
    email: string
    password: string
}

export interface UsuarioResponse {
    id: number
    email: string
    activo: boolean
}