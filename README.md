# Questly

Questly es una aplicación **fullstack** MERN que te ofrece historias interactivas ambientadas en mundos de fantasía. También cuenta con una API orientada a la gestión de **mundos de fantasía**, incluyendo clases, razas y zonas asociadas a cada mundo.

---

## Clonar el repositorio

```bash
git clone https://github.com/juliogtrenard/questly.git
cd questly
```

---

## Requisitos previos

Antes de comenzar, asegúrate de tener:

-   Node.js
-   npm (para el backend)
-   yarn (para el frontend)
-   MongoDB Atlas
-   Firebase

---

## Backend (API REST)

### Tecnologías y dependencias

El backend está desarrollado con Node.js + Express y usa MongoDB como base de datos.

#### Dependencias principales:

-   express
-   mongoose
-   cors
-   dotenv
-   express-validator
-   swagger-jsdoc
-   swagger-ui-express

Gestor de dependencias: npm

### Variables de entorno

Crea un archivo .env dentro de la carpeta server:

```env
PORT=Puerto en el que se levanta la API

MONGODB_URI=URI de conexión a MongoDB Atlas
```

### Levantar el backend en local

```bash
cd server
npm install
npm run dev
```

La API estará disponible en:

```bash
http://localhost:{PORT}/api/v1
```

La documentación Swagger estará disponible en:

```bash
http://localhost:{PORT}/api/v1/docs
```

---

## Frontend

### Tecnologías y dependencias

El frontend está construido con React + Vite.

#### Dependencias principales:

-   firebase
-   react-router
-   framer-motion
-   lucide-react
-   react-toastify

Gestor de dependencias: yarn

### Variables de entorno

Crea un archivo .env dentro de la carpeta client:

```env
VITE_FIREBASE_API_KEY=xxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxxxxxx
VITE_FIREBASE_PROJECT_ID=xxxxxxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxxxxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxxxxxx
VITE_FIREBASE_APP_ID=xxxxxxxx
VITE_FIREBASE_MEASUREMENT_ID=xxxxxxxx
VITE_USER=user
```

VITE_FIREBASE_xxx: Configuración del proyecto Firebase

VITE_USER: Rol por defecto al registrar un usuario

-   user
-   admin

### Levantar el frontend en local

```bash
cd client
yarn install
yarn dev
```

La aplicación estará disponible en:

```bash
http://localhost:5173/
```
