# API REST de Usuarios

Esta API permite gestionar una lista de usuarios utilizando Node.js y Express, con persistencia en disco usando un archivo JSON.

## Instalación

1. Clona el repositorio o descarga el código.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor:
   ```bash
   npm start
   ```
   O en modo desarrollo (con recarga automática):
   ```bash
   npm run dev
   ```

## Rutas disponibles

- **GET /usuarios**
  - Devuelve el listado completo de usuarios.

- **GET /usuarios/:id**
  - Devuelve un usuario por su ID.
  - Si no se encuentra, devuelve error 404.

- **POST /usuarios**
  - Crea un nuevo usuario.
  - Requiere en el body: `name`, `email`, `age`, `gender`.
  - El email no puede estar vacío ni repetido.

- **PUT /usuarios/:id**
  - Actualiza los datos de un usuario existente.
  - Valida que el usuario exista y que el email no esté repetido.

- **DELETE /usuarios/:id**
  - Elimina un usuario por ID.
  - Devuelve mensaje de confirmación.

## Notas
- Los usuarios se almacenan en el archivo `db/users.json`.
- Asegúrate de que la carpeta `db` y el archivo `users.json` existan y tengan permisos de escritura.
