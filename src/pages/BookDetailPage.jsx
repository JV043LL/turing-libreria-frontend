import { Link, useParams } from 'react-router-dom';
import { booksApi } from '../api/books.api';
import ErrorMessage from '../components/common/ErrorMessage';
import FavoriteButton from '../components/common/FavoriteButton';
import Loader from '../components/common/Loader';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../hooks/useFavorites';
import { useFetch } from '../hooks/useFetch';
import { coverUrl, formatPrice, usarPortadaRespaldo } from '../utils/format';
import './DetailPage.css';

// Detalle de un libro (GET /api/books/:id)
export default function BookDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { data: book, cargando, error, reintentar } = useFetch(() => booksApi.get(id), [id]);
  const favorites = useFavorites();

  return (
    <section className="section container">
      <Link to="/#catalogo" className="back-link">← Volver al catálogo</Link>

      {cargando && <Loader texto="Cargando libro…" />}
      {error && (
        <ErrorMessage
          mensaje={error.status === 404 ? 'Este libro no existe o fue retirado del catálogo.' : error.message}
          onRetry={error.status === 404 ? undefined : reintentar}
        />
      )}

      {book && !cargando && (
        <article className="detail detail--book">
          <div className="detail__cover-wrap">
            <img
              src={coverUrl(book.portada_url, 'L')}
              alt={`Portada de ${book.titulo}`}
              className="detail__cover"
              onError={usarPortadaRespaldo}
            />
          </div>

          <div className="detail__body">
            <p className="detail__kicker">{book.genero}</p>
            <h1 className="detail__title">{book.titulo}</h1>
            <p className="detail__lead">
              {book.autor}
              {book.autor_nacionalidad && <span className="detail__muted"> ({book.autor_nacionalidad})</span>}
            </p>

            <div className="detail__buy">
              <span className="detail__price">{formatPrice(book.precio)}</span>
              <span className={`detail__stock${book.disponible ? '' : ' detail__stock--out'}`}>
                {book.disponible ? `${book.stock} en existencia` : 'Agotado'}
              </span>
            </div>

            {book.sinopsis && <p className="detail__text">{book.sinopsis}</p>}

            <dl className="detail__facts">
              {book.anio_publicacion && (
                <div>
                  <dt>Publicación</dt>
                  <dd>{book.anio_publicacion}</dd>
                </div>
              )}
              <div>
                <dt>ISBN</dt>
                <dd>{book.isbn}</dd>
              </div>
            </dl>

            {user ? (
              <FavoriteButton
                conTexto
                activo={favorites.isFavorite(book.id)}
                titulo={book.titulo}
                onToggle={() => favorites.toggle(book.id)}
              />
            ) : (
              <p className="detail__muted">
                <Link to="/login" state={{ from: `/libros/${book.id}` }} className="button--link">Inicia sesión</Link>{' '}
                para guardar este libro en tus favoritos.
              </p>
            )}
          </div>
        </article>
      )}
    </section>
  );
}
