import { useState } from 'react';
import './FavoriteButton.css';

// Boton de marcador para guardar o quitar un libro de favoritos.
// conTexto: muestra la etiqueta visible (en la pagina de detalle); si no, solo el icono.
export default function FavoriteButton({ activo, onToggle, titulo, conTexto = false }) {
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState(null);

  const alternar = async () => {
    setProcesando(true);
    setError(null);
    try {
      await onToggle();
    } catch (err) {
      setError(err.message);
    } finally {
      setProcesando(false);
    }
  };

  const etiqueta = activo ? 'Quitar de favoritos' : 'Guardar en favoritos';

  return (
    <span className="favorite">
      <button
        type="button"
        className={`favorite__button${conTexto ? ' favorite__button--text' : ''}`}
        onClick={alternar}
        disabled={procesando}
        aria-pressed={activo}
        aria-label={conTexto ? undefined : `${etiqueta}: ${titulo}`}
        title={conTexto ? undefined : etiqueta}
      >
        <svg className="favorite__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4.5L5 21V4a1 1 0 0 1 1-1z" />
        </svg>
        {conTexto && <span>{activo ? 'Guardado en favoritos' : 'Guardar en favoritos'}</span>}
      </button>
      {error && <span className="favorite__error" role="alert">{error}</span>}
    </span>
  );
}
