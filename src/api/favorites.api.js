import { request } from './client';

export const favoritesApi = {
  list: () => request('/favorites'),
  add: (bookId) => request(`/favorites/${bookId}`, { method: 'POST' }),
  remove: (bookId) => request(`/favorites/${bookId}`, { method: 'DELETE' }),
};
