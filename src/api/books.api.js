import { request } from './client';

export const booksApi = {
  // Devuelve { data: [...libros], pagination: { page, limit, total, totalPages } }
  list: ({ genre, page = 1, limit = 6 } = {}) => request('/books', { params: { genre, page, limit } }),
  get: (id) => request(`/books/${id}`),
  create: (libro) => request('/books', { method: 'POST', body: libro }),
  update: (id, cambios) => request(`/books/${id}`, { method: 'PUT', body: cambios }),
  remove: (id) => request(`/books/${id}`, { method: 'DELETE' }),
};
