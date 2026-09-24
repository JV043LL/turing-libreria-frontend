import { useCallback, useEffect, useState } from 'react';
import { booksApi } from '../api/books.api';

// Logica del catalogo: filtro por genero, paginacion y "Cargar mas".
// Los componentes solo leen el estado y llaman a las funciones.
export function useBooks({ limit = 6 } = {}) {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState(null); // null = todos los generos
  const [pagination, setPagination] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(
    async (pagina, reemplazar) => {
      setCargando(true);
      setError(null);
      try {
        const { data, pagination: info } = await booksApi.list({ genre, page: pagina, limit });
        // Al cambiar de genero se reemplaza la lista; con "Cargar mas" se agrega al final
        setBooks((anteriores) => (reemplazar ? data : [...anteriores, ...data]));
        setPagination(info);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    },
    [genre, limit]
  );

  // Cada vez que cambia el genero se vuelve a la pagina 1
  useEffect(() => {
    cargar(1, true);
  }, [cargar]);

  const cargarMas = () => cargar(pagination.page + 1, false);
  const hayMas = pagination ? pagination.page < pagination.totalPages : false;

  return {
    books,
    genre,
    setGenre,
    total: pagination?.total ?? 0,
    cargando,
    error,
    hayMas,
    cargarMas,
    reintentar: () => cargar(1, true),
  };
}
