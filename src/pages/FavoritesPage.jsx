import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { favoritesApi } from '../api/favorites.api';
import BookCard from '../components/books/BookCard';
import ErrorMessage from '../components/common/ErrorMessage';
import Loader from '../components/common/Loader';
import '../components/books/BookGrid.css';

export default function FavoritesPage() {
  const [books, setBooks] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      setBooks(await favoritesApi.list());
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const quitar = async (bookId) => {
    await favoritesApi.remove(bookId);
    setBooks((anteriores) => anteriores.filter((b) => b.id !== bookId));
  };

  return (
    <section className="section container">
      <h1 className="section__title">Mis favoritos</h1>

      {cargando && <Loader />}
      {error && <ErrorMessage mensaje={error} onRetry={cargar} />}

      {!cargando && !error && books.length === 0 && (
        <p className="status">
          Aún no guardas libros. <Link to="/#catalogo">Explora el catálogo</Link> y usa “Guardar”.
        </p>
      )}

      {books.length > 0 && (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} isFavorite onToggleFavorite={quitar} />
          ))}
        </div>
      )}
    </section>
  );
}
