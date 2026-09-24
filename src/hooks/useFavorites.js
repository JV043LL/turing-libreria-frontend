import { useCallback, useEffect, useState } from 'react';
import { favoritesApi } from '../api/favorites.api';
import { useAuth } from '../context/AuthContext';

// Ids de los libros favoritos del usuario, para marcar las tarjetas del catalogo
export function useFavorites() {
  const { user } = useAuth();
  const [ids, setIds] = useState(new Set());

  useEffect(() => {
    if (!user) {
      setIds(new Set());
      return;
    }
    favoritesApi
      .list()
      .then((libros) => setIds(new Set(libros.map((l) => l.id))))
      .catch(() => setIds(new Set()));
  }, [user]);

  const toggle = useCallback(
    async (bookId) => {
      const esFavorito = ids.has(bookId);
      await (esFavorito ? favoritesApi.remove(bookId) : favoritesApi.add(bookId));
      setIds((anterior) => {
        const nuevo = new Set(anterior);
        if (esFavorito) nuevo.delete(bookId);
        else nuevo.add(bookId);
        return nuevo;
      });
    },
    [ids]
  );

  return { isFavorite: (bookId) => ids.has(bookId), toggle, enabled: Boolean(user) };
}
