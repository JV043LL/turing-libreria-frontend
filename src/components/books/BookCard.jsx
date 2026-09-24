import { useState } from 'react';
import { coverUrl, formatPrice, PORTADA_RESPALDO } from '../../utils/format';
import './BookCard.css';

// Tarjeta de un libro. Si se pasa onToggleFavorite, muestra el boton de favorito.
export default function BookCard({ book, isFavorite = false, onToggleFavorite }) {
  const [procesando, setProcesando] = useState(false);

  const alternarFavorito = async () => {
    setProcesando(true);
    try {
      await onToggleFavorite(book.id);
    } finally {
      setProcesando(false);
    }
  };

  return (
    <article className="book-card">
      <img
        src={coverUrl(book.portada_url)}
        alt={`Portada de ${book.titulo}`}
        className="book-card__cover"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null; // evita un ciclo si el respaldo tambien falla
          e.currentTarget.src = PORTADA_RESPALDO;
        }}
      />

      <div className="book-card__body">
        <p className="book-card__genre">{book.genero}</p>
        <h3 className="book-card__title">{book.titulo}</h3>
        <p className="book-card__author">{book.autor}</p>
      </div>

      <div className="book-card__footer">
        <span className="book-card__price">{formatPrice(book.precio)}</span>
        {!book.disponible && <span className="book-card__badge">Agotado</span>}
        {onToggleFavorite && (
          <button
            type="button"
            className="button button--ghost"
            onClick={alternarFavorito}
            disabled={procesando}
            aria-pressed={isFavorite}
          >
            {isFavorite ? 'Quitar de favoritos' : 'Guardar'}
          </button>
        )}
      </div>
    </article>
  );
}
