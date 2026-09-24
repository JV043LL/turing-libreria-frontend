import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/auth.api';
import { setUnauthorizedHandler, tokenStorage } from '../api/client';

// Contexto de autenticacion: guarda el usuario en sesion y lo comparte con toda la app
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(true); // true mientras se revisa si habia sesion guardada

  const logout = useCallback(() => {
    tokenStorage.clear();
    setUser(null);
  }, []);

  // Si hay un token guardado, se recupera el usuario al abrir la pagina
  useEffect(() => {
    setUnauthorizedHandler(logout); // si la API responde 401, se cierra la sesion

    if (!tokenStorage.get()) {
      setCargando(false);
      return;
    }

    authApi
      .me()
      .then(setUser)
      .catch(logout)
      .finally(() => setCargando(false));
  }, [logout]);

  const guardarSesion = useCallback(({ token, user: usuario }) => {
    tokenStorage.set(token);
    setUser(usuario);
    return usuario;
  }, []);

  const login = useCallback(
    async (email, password) => guardarSesion(await authApi.login(email, password)),
    [guardarSesion]
  );

  const register = useCallback(
    async (nombre, email, password) => guardarSesion(await authApi.register(nombre, email, password)),
    [guardarSesion]
  );

  const value = useMemo(
    () => ({ user, cargando, isAdmin: user?.rol === 'admin', login, register, logout }),
    [user, cargando, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return context;
}
