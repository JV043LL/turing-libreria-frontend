import { Link } from 'react-router-dom';
import { useSpaces } from '../../hooks/useSpaces';
import ErrorMessage from '../common/ErrorMessage';
import Loader from '../common/Loader';
import SpaceImage from '../common/SpaceImage';
import './Gallery.css';

// Seccion "Nuestro espacio": los espacios vienen de GET /api/spaces
// y cada uno enlaza a su pagina de detalle.
export default function Gallery() {
  const { spaces, cargando, error, reintentar } = useSpaces();

  return (
    <section id="espacio" className="section container" aria-labelledby="espacio-titulo">
      <h2 id="espacio-titulo" className="section__title">Nuestro espacio</h2>
      <p className="section__intro">Ven a leer, platicar de libros o conocer a quien los escribe.</p>

      {cargando && <Loader texto="Cargando espacios…" />}
      {error && <ErrorMessage mensaje={error.message} onRetry={reintentar} />}

      {!cargando && !error && spaces.length === 0 && (
        <p className="status">Pronto compartiremos fotos de nuestros espacios.</p>
      )}

      {spaces.length > 0 && (
        <ul className="gallery">
          {spaces.map((space) => (
            <li key={space.id}>
              <Link to={`/espacios/${space.id}`} className="gallery__item">
                <SpaceImage src={space.imagen_url} className="gallery__image" />
                <span className="gallery__caption">
                  <span className="gallery__name">{space.nombre}</span>
                  <span className="gallery__summary">{space.resumen}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
