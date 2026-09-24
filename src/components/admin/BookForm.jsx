import { useState } from 'react';
import './BookForm.css';

const VACIO = {
  titulo: '', sinopsis: '', precio: '', stock: '0', isbn: '',
  portada_url: '', anio_publicacion: '', genre_id: '', author_id: '',
};

// Convierte un libro de la API en valores de formulario (los inputs trabajan con texto)
function aFormulario(book) {
  if (!book) return VACIO;
  return Object.fromEntries(Object.keys(VACIO).map((k) => [k, book[k] == null ? '' : String(book[k])]));
}

// Convierte el formulario en el body que espera la API
function aPayload(f) {
  const payload = {
    titulo: f.titulo.trim(),
    sinopsis: f.sinopsis.trim() || null,
    precio: Number(f.precio),
    stock: Number(f.stock || 0),
    isbn: f.isbn.trim(),
    anio_publicacion: f.anio_publicacion ? Number(f.anio_publicacion) : null,
    genre_id: Number(f.genre_id),
    author_id: Number(f.author_id),
  };
  // Sin portada, el backend la genera con el ISBN (Open Library)
  if (f.portada_url.trim()) payload.portada_url = f.portada_url.trim();
  return payload;
}

// Formulario para crear (book = null) o editar un libro
export default function BookForm({ book, genres, authors, onSubmit, onCancel }) {
  const [campos, setCampos] = useState(() => aFormulario(book));
  const [error, setError] = useState(null);
  const [detalles, setDetalles] = useState({});
  const [enviando, setEnviando] = useState(false);

  const cambiar = (e) => setCampos({ ...campos, [e.target.name]: e.target.value });

  const enviar = async (e) => {
    e.preventDefault();
    setError(null);
    setDetalles({});
    setEnviando(true);
    try {
      await onSubmit(aPayload(campos));
    } catch (err) {
      setError(err.message);
      setDetalles(Object.fromEntries((err.details || []).map((d) => [d.campo, d.mensaje])));
    } finally {
      setEnviando(false);
    }
  };

  const hint = (name) => detalles[name] && <p className="book-form__hint">{detalles[name]}</p>;

  const input = (name, label, props = {}) => (
    <div className={`book-form__field${props.wide ? ' book-form__field--wide' : ''}`}>
      <label htmlFor={`bf-${name}`}>{label}</label>
      <input
        id={`bf-${name}`}
        name={name}
        value={campos[name]}
        onChange={cambiar}
        aria-invalid={Boolean(detalles[name])}
        type={props.type || 'text'}
        step={props.step}
        min={props.min}
        required={props.required}
      />
      {hint(name)}
    </div>
  );

  const select = (name, label, opciones) => (
    <div className="book-form__field">
      <label htmlFor={`bf-${name}`}>{label}</label>
      <select id={`bf-${name}`} name={name} value={campos[name]} onChange={cambiar} required aria-invalid={Boolean(detalles[name])}>
        <option value="">Selecciona…</option>
        {opciones.map((o) => (
          <option key={o.id} value={o.id}>{o.nombre}</option>
        ))}
      </select>
      {hint(name)}
    </div>
  );

  return (
    <form className="book-form" onSubmit={enviar}>
      <h2 className="book-form__title">{book ? `Editar: ${book.titulo}` : 'Nuevo libro'}</h2>

      <div className="book-form__grid">
        {input('titulo', 'Título', { required: true, wide: true })}
        {select('author_id', 'Autor', authors)}
        {select('genre_id', 'Género', genres)}
        {input('isbn', 'ISBN (10 o 13 dígitos)', { required: true })}
        {input('anio_publicacion', 'Año de publicación', { type: 'number', min: 1000 })}
        {input('precio', 'Precio (MXN)', { type: 'number', step: '0.01', min: 0, required: true })}
        {input('stock', 'Stock', { type: 'number', min: 0 })}
        {input('portada_url', 'URL de portada (opcional)', { type: 'url', wide: true })}

        <div className="book-form__field book-form__field--wide">
          <label htmlFor="bf-sinopsis">Sinopsis</label>
          <textarea id="bf-sinopsis" name="sinopsis" rows="4" value={campos.sinopsis} onChange={cambiar} />
          {hint('sinopsis')}
        </div>
      </div>

      {error && <p className="status status--error" role="alert">{error}</p>}

      <div className="book-form__actions">
        <button type="submit" className="button button--primary" disabled={enviando}>
          {enviando ? 'Guardando…' : book ? 'Guardar cambios' : 'Crear libro'}
        </button>
        <button type="button" className="button button--ghost" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}
