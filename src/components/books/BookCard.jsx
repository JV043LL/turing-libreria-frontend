import { Link } from 'react-router-dom';
import { coverUrl, formatPrice, usarPortadaRespaldo } from '../../utils/format';
import FavoriteButton from '../common/FavoriteButton';
import './BookCard.css';

// Tarjeta de un libro. Si se pasa onToggleFavorite, muestra el boton de favorito.
export default function BookCard({ book, isFavorite = false, onToggleFavorite }) {
  const detalle = `/libros/${book.id}`;

  return (
    <article className={`book-card${book.disponible ? '' : ' book-card--sold-out'}`}>
      <Link to={detalle} className="book-card__cover-link" tabIndex={-1} aria-hidden="true">
        <img
          src={coverUrl(book.portada_url)}
          alt=""
          className="book-card__cover"
          loading="lazy"
          onError={usarPortadaRespaldo}
        />
        {!book.disponible && <span className="book-card__badge">Agotado</span>}
      </Link>

      <div className="book-card__body">
        <div className="book-card__meta">
          <span className="book-card__genre">{book.genero}</span>
          {book.anio_publicacion && <span>{book.anio_publicacion}</span>}
        </div>
        <h3 className="book-card__title">
          <Link to={detalle} className="book-card__link">{book.titulo}</Link>
        </h3>
        <p className="book-card__author">{book.autor}</p>
      </div>

      <div className="book-card__footer">
        <span className="book-card__price">{formatPrice(book.precio)}</span>
        {onToggleFavorite && (
          <FavoriteButton activo={isFavorite} titulo={book.titulo} onToggle={() => onToggleFavorite(book.id)} />
        )}
      </div>
    </article>
  );
}
