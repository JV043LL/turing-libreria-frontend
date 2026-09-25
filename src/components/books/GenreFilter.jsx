import './GenreFilter.css';

export default function GenreFilter({ genres, selected, onChange }) {
  return (
    <div className="genre-filter" role="group" aria-label="Filtrar por género">
      <button
        type="button"
        className="genre-filter__option"
        aria-pressed={selected === null}
        onClick={() => onChange(null)}
      >
        Todos
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          type="button"
          className="genre-filter__option"
          aria-pressed={selected === genre.id}
          onClick={() => onChange(genre.id)}
        >
          {genre.nombre}
          <span className="genre-filter__count">{genre.total_libros}</span>
        </button>
      ))}
    </div>
  );
}
