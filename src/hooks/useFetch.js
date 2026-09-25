import { useCallback, useEffect, useState } from 'react';

// Hook generico para peticiones de solo lectura: maneja carga, error y reintento.
// fetcher debe ser estable (useCallback) o depender solo de `deps`.
// Uso: const { data, cargando, error, reintentar } = useFetch(() => spacesApi.list(), []);
export function useFetch(fetcher, deps) {
  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cargar = useCallback(fetcher, deps);

  const ejecutar = useCallback(() => {
    let vigente = true; // evita actualizar el estado si el componente cambio de datos
    setCargando(true);
    setError(null);
    cargar()
      .then((resultado) => vigente && setData(resultado))
      .catch((err) => vigente && setError(err))
      .finally(() => vigente && setCargando(false));
    return () => {
      vigente = false;
    };
  }, [cargar]);

  useEffect(() => ejecutar(), [ejecutar]);

  return { data, cargando, error, reintentar: ejecutar };
}
