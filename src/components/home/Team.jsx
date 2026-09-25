import { Link } from 'react-router-dom';
import { useBooksByIds } from '../../hooks/useBooksByIds';
import { coverUrl, iniciales, usarPortadaRespaldo } from '../../utils/format';
import ErrorMessage from '../common/ErrorMessage';
import './Team.css';

// Cada librero recomienda un libro del catalogo (por id). La portada y el titulo
// se piden a la API, asi la recomendacion siempre coincide con el catalogo.
// El librero del centro se muestra mas grande, como en el wireframe.
const LIBREROS = [
  { nombre: 'Laura Méndez', rol: 'Librera', bookId: 2, motivo: 'Un libro corto que se relee toda la vida.' },
  { nombre: 'Andrés Ruiz', rol: 'Fundador', bookId: 1, motivo: 'El libro que me hizo abrir una librería.', destacado: true },
  { nombre: 'Sofía Herrera', rol: 'Librera', bookId: 4, motivo: 'La mejor puerta de entrada a la ciencia ficción.' },
];

function Recomendacion({ book, cargando }) {
  if (cargando) return <div className="team__book team__book--loading" aria-hidden="true" />;
  if (!book) return <p className="team__book team__book--missing">Recomendación no disponible</p>;

  return (
    <Link to={`/libros/${book.id}`} className="team__book">
      <img
        src={coverUrl(book.portada_url, 'S')}
        alt=""
        className="team__cover"
        loading="lazy"
        onError={usarPortadaRespaldo}
      />
      <span className="team__book-text">
        <span className="team__book-title">{book.titulo}</span>
        <span className="team__book-author">{book.autor}</span>
      </span>
    </Link>
  );
}

export default function Team() {
  const { booksById, cargando, error, reintentar } = useBooksByIds(LIBREROS.map((l) => l.bookId));

  return (
    <section id="equipo" className="section team-section" aria-labelledby="equipo-titulo">
      <div className="container">
        <h2 id="equipo-titulo" className="section__title">Nuestros libreros recomiendan</h2>
        <p className="section__intro">Pregúntales en tienda: les encanta hablar de estos libros.</p>

        {error && <ErrorMessage mensaje={error.message} onRetry={reintentar} />}

        <ul className="team">
          {LIBREROS.map(({ nombre, rol, bookId, motivo, destacado }) => (
            <li key={nombre} className={`team__member${destacado ? ' team__member--featured' : ''}`}>
              <div className="team__photo" aria-hidden="true">{iniciales(nombre)}</div>
              <h3 className="team__name">{nombre}</h3>
              <p className="team__role">{rol}</p>
              <blockquote className="team__quote">{motivo}</blockquote>
              {!error && <Recomendacion book={booksById[bookId]} cargando={cargando} />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
