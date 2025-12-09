# 🟦 API REST Node.js - TechLab

Proyecto backend desarrollado en Node.js con autenticación JWT y manejo de permisos de administrador.

---

## 📁 Variables de Entorno

Antes de iniciar el proyecto, debés crear un archivo **.env** en la raíz del repositorio con el siguiente formato:

```env
FIREBASE_API_KEY=TU_CLAVE_FIREBASE
FIREBASE_AUTH_DOMAIN=TU_DOMINIO_FIREBASE
FIREBASE_STORAGE_BUCKET=TU_BUCKET_FIREBASE
FIREBASE_APP_ID=TU_APP_ID_FIREBASE
FIREBASE_PROJECT_ID=TU_PROJECT_ID
FIREBASE_MESSAGING_SENDER_ID=TU_SENDER_ID

JWT_KEY=TU_CLAVE_SECRETA_JWT

PRODUCT_COLLECTION_NAME=PROD_NAME
USER_COLLECTION_NAME=USER_NAME

PORT=3000
```
## 📌 Rutas configuradas

### 🔐 Autenticación

| Método | Ruta | Acceso |
|--------|------|--------|
| POST | `/auth/login` | Público |

### 🛒 Productos (/api/products)

*Todas las rutas requieren autenticación*

| Método | Ruta | Acceso |
|--------|------|--------|
| GET | `/api/products` | Cualquier rol |
| GET | `/api/products/:id` | Cualquier rol |
| POST | `/api/products/create` | Solo admin |
| DELETE | `/api/products/:id` | Solo admin |

### 👤 Usuarios (/user)

*Todas las rutas requieren autenticación*

| Método | Ruta | Acceso |
|--------|------|--------|
| GET | `/user` | Cualquier rol |
| GET | `/user/:id` | Cualquier rol |
| POST | `/user/create` | Solo admin |
| DELETE | `/user/:id` | Solo admin |

