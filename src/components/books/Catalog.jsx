import { useBooks } from '../../hooks/useBooks';
import { useFavorites } from '../../hooks/useFavorites';
import { useGenres } from '../../hooks/useGenres';
import ErrorMessage from '../common/ErrorMessage';
import Loader from '../common/Loader';
import BookGrid from './BookGrid';
import GenreFilter from './GenreFilter';

// Seccion del catalogo: filtro por genero + grid de libros + "Cargar mas"
export default function Catalog() {
  const { books, genre, setGenre, total, cargando, error, hayMas, cargarMas, reintentar } = useBooks({ limit: 6 });
  const genres = useGenres();
  const favorites = useFavorites();

  return (
    <section id="catalogo" className="section container">
      <h2 className="section__title">Catálogo</h2>
      <p className="section__intro">Elige un género para ver solo esos libros. Inicia sesión para guardar tus favoritos.</p>

      <GenreFilter genres={genres} selected={genre} onChange={setGenre} />

      {error && <ErrorMessage mensaje={error} onRetry={reintentar} />}

      {!error && books.length > 0 && (
        <>
          <p className="section__meta" aria-live="polite">Mostrando {books.length} de {total} libros</p>
          <BookGrid books={books} favorites={favorites} />
        </>
      )}

      {!error && !cargando && books.length === 0 && (
        <p className="status">No hay libros en este género todavía. Prueba con otro.</p>
      )}

      {cargando && <Loader texto="Cargando libros…" />}

      {!cargando && !error && hayMas && (
        <div className="section__actions">
          <button type="button" className="button button--primary" onClick={cargarMas}>
            Cargar más
          </button>
        </div>
      )}
    </section>
  );
}
