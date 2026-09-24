// Cliente HTTP central: todas las llamadas a la API pasan por aqui.
// - Arma la URL con VITE_API_URL
// - Agrega el token JWT si hay sesion
// - Convierte las respuestas de error del backend en un ApiError con mensaje claro

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000/api';
const TOKEN_KEY = 'libreria_token';

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details; // [{ campo, mensaje }] en errores de validacion
  }
}

// Funcion que el AuthContext registra para cerrar sesion si el token expira
let onUnauthorized = null;
export function setUnauthorizedHandler(handler) {
  onUnauthorized = handler;
}

export async function request(path, { method = 'GET', body, params } = {}) {
  const url = new URL(BASE_URL + path);
  if (params) {
    Object.entries(params).forEach(([clave, valor]) => {
      if (valor !== undefined && valor !== null && valor !== '') url.searchParams.set(clave, valor);
    });
  }

  const headers = {};
  const token = tokenStorage.get();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers['Content-Type'] = 'application/json';

  let response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, 'No se pudo conectar con el servidor. Revisa que la API esté encendida.');
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401 && token && onUnauthorized) onUnauthorized();
    throw new ApiError(response.status, data?.error || 'Ocurrió un error inesperado', data?.detalles);
  }

  return data;
}
