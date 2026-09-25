import { request } from './client';

// Espacios de la libreria (seccion "Nuestro espacio")
export const spacesApi = {
  list: () => request('/spaces'),
  get: (id) => request(`/spaces/${id}`),
};
