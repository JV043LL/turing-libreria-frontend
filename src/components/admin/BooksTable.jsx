import { formatPrice } from '../../utils/format';
import './BooksTable.css';

export default function BooksTable({ books, onEdit, onDelete }) {
  return (
    <table className="books-table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Título</th>
          <th scope="col">Autor</th>
          <th scope="col">Género</th>
          <th scope="col">Precio</th>
          <th scope="col">Stock</th>
          <th scope="col"><span className="visually-hidden">Acciones</span></th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.titulo}</td>
            <td>{book.autor}</td>
            <td>{book.genero}</td>
            <td>{formatPrice(book.precio)}</td>
            <td>{book.stock}</td>
            <td className="books-table__actions">
              <button type="button" className="button button--ghost" onClick={() => onEdit(book)}>Editar</button>
              <button type="button" className="button button--danger" onClick={() => onDelete(book)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
