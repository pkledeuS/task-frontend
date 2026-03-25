export interface Usuario {
    email: string
    password: string
}

export interface UsuarioResponse {
    is: number
    email: string
    activo: boolean
}