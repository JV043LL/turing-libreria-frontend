import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router no maneja los enlaces con #ancla ni regresa arriba al cambiar de pagina.
// - Con hash (/#catalogo): espera a que la seccion exista y se desplaza hasta ella.
// - Sin hash: vuelve al inicio de la pagina.
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    let intentos = 0;
    let frame;
    const buscar = () => {
      const destino = document.getElementById(hash.slice(1));
      if (destino) destino.scrollIntoView();
      else if (intentos++ < 30) frame = requestAnimationFrame(buscar);
    };
    buscar();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}
