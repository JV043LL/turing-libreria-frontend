import BookCard from './BookCard';
import './BookGrid.css';

export default function BookGrid({ books, favorites }) {
  return (
    <ul className="book-grid">
      {books.map((book) => (
        <li key={book.id} className="book-grid__item">
          <BookCard
            book={book}
            isFavorite={favorites?.isFavorite(book.id)}
            onToggleFavorite={favorites?.enabled ? favorites.toggle : undefined}
          />
        </li>
      ))}
    </ul>
  );
}
