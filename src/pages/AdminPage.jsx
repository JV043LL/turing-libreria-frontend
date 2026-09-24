import { useCallback, useEffect, useState } from 'react';
import { booksApi } from '../api/books.api';
import { authorsApi, genresApi } from '../api/catalogs.api';
import BookForm from '../components/admin/BookForm';
import BooksTable from '../components/admin/BooksTable';
import ErrorMessage from '../components/common/ErrorMessage';
import Loader from '../components/common/Loader';

const POR_PAGINA = 10;

// Panel de administracion: lista paginada de libros + formulario de alta/edicion
export default function AdminPage() {
  const [books, setBooks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [catalogos, setCatalogos] = useState({ genres: [], authors: [] });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [aviso, setAviso] = useState(null);
  // null = formulario cerrado, 'nuevo' = crear, objeto libro = editar
  const [editando, setEditando] = useState(null);

  const cargarLibros = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const { data, pagination: info } = await booksApi.list({ page, limit: POR_PAGINA });
      setBooks(data);
      setPagination(info);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, [page]);

  useEffect(() => {
    cargarLibros();
  }, [cargarLibros]);

  // Generos y autores para los select del formulario
  useEffect(() => {
    Promise.all([genresApi.list(), authorsApi.list()])
      .then(([genres, authors]) => setCatalogos({ genres, authors }))
      .catch((err) => setError(err.message));
  }, []);

  const guardar = async (payload) => {
    if (editando === 'nuevo') {
      const creado = await booksApi.create(payload);
      setAviso(`Libro creado: ${creado.titulo}`);
    } else {
      const actualizado = await booksApi.update(editando.id, payload);
      setAviso(`Cambios guardados: ${actualizado.titulo}`);
    }
    setEditando(null);
    cargarLibros();
  };

  const eliminar = async (book) => {
    if (!window.confirm(`¿Eliminar "${book.titulo}"? Esta acción no se puede deshacer.`)) return;
    try {
      await booksApi.remove(book.id);
      setAviso(`Libro eliminado: ${book.titulo}`);
      // Si era el ultimo libro de la pagina, regresa a la anterior
      if (books.length === 1 && page > 1) setPage(page - 1);
      else cargarLibros();
    } catch (err) {
      setAviso(null);
      setError(err.message);
    }
  };

  return (
    <section className="section container">
      <div className="admin__header">
        <h1 className="section__title">Administrar libros</h1>
        {!editando && (
          <button type="button" className="button button--primary" onClick={() => { setAviso(null); setEditando('nuevo'); }}>
            Agregar libro
          </button>
        )}
      </div>

      {aviso && <p className="status status--success" role="status">{aviso}</p>}

      {editando && (
        <BookForm
          key={editando === 'nuevo' ? 'nuevo' : editando.id}
          book={editando === 'nuevo' ? null : editando}
          genres={catalogos.genres}
          authors={catalogos.authors}
          onSubmit={guardar}
          onCancel={() => setEditando(null)}
        />
      )}

      {error && <ErrorMessage mensaje={error} onRetry={cargarLibros} />}
      {cargando && <Loader texto="Cargando libros…" />}

      {!cargando && !error && (
        <>
          <BooksTable books={books} onEdit={(book) => { setAviso(null); setEditando(book); }} onDelete={eliminar} />

          {pagination && pagination.totalPages > 1 && (
            <nav className="pagination" aria-label="Páginas">
              <button type="button" className="button button--ghost" disabled={page === 1} onClick={() => setPage(page - 1)}>
                Anterior
              </button>
              <span>Página {page} de {pagination.totalPages}</span>
              <button type="button" className="button button--ghost" disabled={page === pagination.totalPages} onClick={() => setPage(page + 1)}>
                Siguiente
              </button>
            </nav>
          )}
        </>
      )}
    </section>
  );
}
