import { request } from './client';

export const authApi = {
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  register: (nombre, email, password) => request('/auth/register', { method: 'POST', body: { nombre, email, password } }),
  me: () => request('/auth/me'),
};
