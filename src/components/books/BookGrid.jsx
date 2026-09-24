import BookCard from './BookCard';
import './BookGrid.css';

export default function BookGrid({ books, favorites }) {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isFavorite={favorites?.isFavorite(book.id)}
          onToggleFavorite={favorites?.enabled ? favorites.toggle : undefined}
        />
      ))}
    </div>
  );
}
