import { booksApi } from '../api/books.api';
import { useFetch } from './useFetch';

// Trae varios libros por id en paralelo (recomendaciones de los libreros).
// Si un libro ya no existe (404), se devuelve null en su lugar sin romper los demas.
export function useBooksByIds(ids) {
  const clave = ids.join(',');
  const { data, ...estado } = useFetch(
    () =>
      Promise.allSettled(ids.map((id) => booksApi.get(id))).then((resultados) => {
        if (resultados.every((r) => r.status === 'rejected')) throw resultados[0].reason;
        return Object.fromEntries(ids.map((id, i) => [id, resultados[i].value ?? null]));
      }),
    [clave]
  );
  return { booksById: data ?? {}, ...estado };
}
