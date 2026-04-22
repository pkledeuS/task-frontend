# TaskFlow - Frontend

Este es el frontend de la aplicación TaskFlow, construido con **React**, **TypeScript** y **Vite**. La aplicación permite a los usuarios registrarse, iniciar sesión y gestionar sus tareas a través de un panel de control (Dashboard).

Este proyecto consume la API backend `task-api` (basada en Python).

## URL de Producción

[https://task-frontend-eosin.vercel.app](https://task-frontend-eosin.vercel.app)

## Características principales

- **Autenticación de usuarios:** Flujo completo de Login y Registro.
- **Rutas Protegidas:** Acceso restringido al Dashboard de tareas solo para usuarios autenticados.
- **Desarrollo rápido:** Configurado con Vite para un Hot Module Replacement (HMR) ultrarrápido.
- **Tipado estricto:** Desarrollado completamente en TypeScript para mayor seguridad y robustez en el código.
- **Despliegue ágil:** Desplegado en Vercel con variables de entorno por ambiente (development/production).

## Tecnologías utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- Vercel (deployment)

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión 16 o superior recomendada).
- El backend `task-api` debe estar en ejecución para que las llamadas a la API (`services/api.ts`) funcionen correctamente.

## Instalación y Configuración local

1. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

2. Configura las variables de entorno. Crea un archivo `.env` en la raíz del proyecto agregando la URL de la API:
   ```env
   VITE_API_URL=http://127.0.0.1:8000
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre tu navegador y navega a `http://localhost:5173` (o el puerto que te indique la consola) para ver la aplicación.

## Scripts disponibles

En el directorio del proyecto, puedes ejecutar:

- `npm run dev`: Inicia el modo de desarrollo.
- `npm run build`: Compila la aplicación para producción en la carpeta `dist`.
- `npm run lint`: Ejecuta ESLint para analizar el código en busca de problemas.
- `npm run preview`: Inicia un servidor web local para visualizar el build de producción generado.

## Estructura principal del proyecto

```text
src/
 ├── assets/      # Imágenes, iconos y otros recursos estáticos.
 ├── components/  # Componentes reutilizables de UI (Navbar, ProtectedRoute).
 ├── pages/       # Vistas principales de la aplicación (Home, Login, Register, Dashboard).
 ├── services/    # Lógica de comunicación con el backend (api.ts).
 ├── types/       # Definiciones de interfaces y tipos de TypeScript.
 └── App.tsx      # Componente raíz y enrutador principal.
```
