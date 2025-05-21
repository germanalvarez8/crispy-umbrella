# crispy-umbrella

Este repositorio contiene dos proyectos independientes: un **backend** (API REST en Node.js/Express) y un **frontend** (React + Vite).

---

## Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [npm](https://www.npmjs.com/)

---

## Inicialización del Backend

1. Abre una terminal y navega a la carpeta `backend`:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
   El backend quedará disponible en [http://localhost:3000](http://localhost:3000).

---

## Inicialización del Frontend

1. Abre otra terminal y navega a la carpeta `frontend`:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación React en modo desarrollo:
   ```bash
   npm run dev
   ```
   El frontend estará disponible en la URL que indique la terminal (por defecto [http://localhost:5173](http://localhost:5173)).

---

## Notas

- El frontend espera que el backend esté corriendo en `http://localhost:3000`.
- Asegúrate de que las carpetas `backend/db` y los archivos `.json` existan y tengan permisos de escritura.
- Puedes modificar las rutas y puertos según tus necesidades en los archivos de configuración correspondientes.
