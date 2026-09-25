# turing-libreria-frontend

Frontend de la librería en línea del periodo de prueba de Turing-IA. Consume la API de [turing-libreria-backend](https://github.com/JV043LL/turing-libreria-backend).

> 🚧 La estructura y la conexión con la API están completas. Los estilos visuales y el diseño responsive están en desarrollo.

## Funcionalidades

- Catálogo cargado desde la API, con filtro por género y botón **"Cargar más"**.
- Estados de carga, error (con opción de reintentar) y lista vacía.
- Inicio de sesión y registro, con los errores de validación de la API mostrados bajo cada campo.
- Sesión persistente: el token se guarda en el navegador y, si expira, la sesión se cierra sola.
- Favoritos para usuarios con sesión.
- Panel de administración (solo rol `admin`) para crear, editar y eliminar libros.
- Rutas protegidas por sesión y por rol.

## Stack

React 19, Vite y React Router. Sin librerías de UI: CSS propio con metodología BEM.

## Puesta en marcha

Requisitos: Node.js 18+ y el [backend](https://github.com/JV043LL/turing-libreria-backend) corriendo.

```bash
npm install
cp .env.example .env
npm run dev
```

La app queda en `http://localhost:5173`. Ese puerto es el que el backend permite por defecto en `CORS_ORIGIN`.

| Variable | Descripción | Por defecto |
|---|---|---|
| `VITE_API_URL` | URL base de la API. | `http://localhost:9000/api` |

Otros comandos: `npm run build` genera la versión de producción en `dist/` y `npm run preview` la sirve localmente.

### Usuarios de prueba

| Rol | Email | Contraseña |
|---|---|---|
| admin | `admin@libreria.com` | `Admin123!` |
| user | `user@libreria.com` | `User123!` |

## Estructura

```text
src/
├── api/                  # comunicación con el backend
│   ├── client.js         # fetch central: URL base, token, manejo de errores
│   ├── auth.api.js
│   ├── books.api.js
│   ├── catalogs.api.js   # géneros y autores
│   └── favorites.api.js
├── context/
│   └── AuthContext.jsx   # usuario en sesión, login, registro y logout
├── hooks/
│   ├── useBooks.js       # catálogo: filtro, paginación y "Cargar más"
│   ├── useFavorites.js
│   └── useGenres.js
├── components/
│   ├── layout/           # Header, Footer
│   ├── common/           # Loader, ErrorMessage, ProtectedRoute
│   ├── home/             # Hero, FeaturedCards, Gallery, Team
│   ├── books/            # Catalog, GenreFilter, BookGrid, BookCard
│   ├── auth/             # AuthForm
│   └── admin/            # BookForm, BooksTable
├── pages/                # HomePage, LoginPage, FavoritesPage, AdminPage
├── styles/               # variables (paleta y espacios) y estilos base
├── utils/format.js       # precio en MXN y portadas
├── App.jsx               # rutas
└── main.jsx              # punto de entrada
```

Cada componente tiene su propio archivo `.css` con clases BEM (`bloque__elemento--modificador`).

## Cómo se conecta con la API

Todas las peticiones pasan por `src/api/client.js`, que:

1. Arma la URL con `VITE_API_URL`.
2. Agrega el header `Authorization: Bearer <token>` si hay sesión.
3. Convierte las respuestas de error en un `ApiError` con el mensaje del backend y, en errores de validación, los detalles por campo.
4. Si la API responde `401` con un token guardado (sesión expirada), cierra la sesión.

Los componentes no llaman a `fetch` directamente: usan los módulos de `api/` o los hooks, así la lógica de datos queda separada de la vista.

## Rutas

| Ruta | Acceso | Contenido |
|---|---|---|
| `/` | Público | Inicio: hero, destacados, catálogo, galería y libreros. |
| `/login` | Público | Inicio de sesión y registro. |
| `/favoritos` | Con sesión | Libros guardados por el usuario. |
| `/admin` | Admin | Gestión de libros. |

## Wireframe

Se usó el wireframe izquierdo del documento de la prueba:

| Sección del wireframe | Componente |
|---|---|
| Header con logo y navegación | `Header` |
| Bloque principal con título y botón | `Hero` |
| 3 tarjetas sobre el borde del hero | `FeaturedCards` |
| Grid de 6 tarjetas (desde la API) | `Catalog` → `BookGrid` → `BookCard` |
| Galería de 4 imágenes | `Gallery` |
| 3 círculos de equipo (el central más grande) | `Team` |
| Footer con logo y 3 columnas | `Footer` |

