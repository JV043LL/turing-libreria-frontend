import { formatPrice } from '../../utils/format';
import './BooksTable.css';

// En movil cada fila se muestra como tarjeta; data-label pone el nombre de la columna.
export default function BooksTable({ books, onEdit, onDelete }) {
  return (
    <table className="books-table">
      <caption className="visually-hidden">Libros del catálogo</caption>
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Título</th>
          <th scope="col">Autor</th>
          <th scope="col">Género</th>
          <th scope="col" className="books-table__number">Precio</th>
          <th scope="col" className="books-table__number">Stock</th>
          <th scope="col"><span className="visually-hidden">Acciones</span></th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td data-label="Id" className="books-table__id">{book.id}</td>
            <td data-label="Título" className="books-table__title">{book.titulo}</td>
            <td data-label="Autor">{book.autor}</td>
            <td data-label="Género">{book.genero}</td>
            <td data-label="Precio" className="books-table__number">{formatPrice(book.precio)}</td>
            <td data-label="Stock" className={`books-table__number${book.stock === 0 ? ' books-table__out' : ''}`}>
              {book.stock}
            </td>
            <td className="books-table__actions">
              <button type="button" className="button button--ghost button--small" onClick={() => onEdit(book)}>
                Editar<span className="visually-hidden"> {book.titulo}</span>
              </button>
              <button type="button" className="button button--danger button--small" onClick={() => onDelete(book)}>
                Eliminar<span className="visually-hidden"> {book.titulo}</span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
