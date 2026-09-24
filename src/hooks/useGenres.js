import { useEffect, useState } from 'react';
import { genresApi } from '../api/catalogs.api';

export function useGenres({ soloConLibros = true } = {}) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    genresApi
      .list()
      .then((lista) => setGenres(soloConLibros ? lista.filter((g) => g.total_libros > 0) : lista))
      .catch(() => setGenres([])); // si falla, el filtro solo muestra "Todos"
  }, [soloConLibros]);

  return genres;
}
