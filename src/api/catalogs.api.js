import { request } from './client';

export const genresApi = {
  list: () => request('/genres'),
};

export const authorsApi = {
  list: () => request('/authors'),
};
