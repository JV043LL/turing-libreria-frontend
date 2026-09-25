import { Link, useParams } from 'react-router-dom';
import { spacesApi } from '../api/spaces.api';
import ErrorMessage from '../components/common/ErrorMessage';
import Loader from '../components/common/Loader';
import SpaceImage from '../components/common/SpaceImage';
import { useFetch } from '../hooks/useFetch';
import { useSpaces } from '../hooks/useSpaces';
import './DetailPage.css';

// Detalle de un espacio de la libreria (GET /api/spaces/:id)
export default function SpacePage() {
  const { id } = useParams();
  const { data: space, cargando, error, reintentar } = useFetch(() => spacesApi.get(id), [id]);
  const { spaces } = useSpaces();
  const otros = spaces.filter((s) => String(s.id) !== id);

  return (
    <section className="section container">
      <Link to="/#espacio" className="back-link">← Volver a Nuestro espacio</Link>

      {cargando && <Loader texto="Cargando espacio…" />}
      {error && (
        <ErrorMessage
          mensaje={error.status === 404 ? 'Este espacio no existe o ya no está disponible.' : error.message}
          onRetry={error.status === 404 ? undefined : reintentar}
        />
      )}

      {space && !cargando && (
        <article className="detail">
          <SpaceImage src={space.imagen_url} className="detail__image" />

          <div className="detail__body">
            <h1 className="detail__title">{space.nombre}</h1>
            <p className="detail__lead">{space.resumen}</p>

            {space.horario && (
              <dl className="detail__facts">
                <div>
                  <dt>Cuándo</dt>
                  <dd>{space.horario}</dd>
                </div>
                <div>
                  <dt>Dónde</dt>
                  <dd>Av. de los Libros 123, Col. Centro, CDMX</dd>
                </div>
              </dl>
            )}

            <p className="detail__text">{space.descripcion}</p>

            <Link to="/#catalogo" className="button button--primary">Explorar el catálogo</Link>
          </div>
        </article>
      )}

      {otros.length > 0 && (
        <nav className="detail__more" aria-labelledby="otros-espacios">
          <h2 id="otros-espacios" className="detail__more-title">Otros espacios</h2>
          <ul className="detail__more-list">
            {otros.map((s) => (
              <li key={s.id}>
                <Link to={`/espacios/${s.id}`} className="detail__more-link">{s.nombre}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </section>
  );
}
