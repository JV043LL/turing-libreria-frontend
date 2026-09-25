export default function Loader({ texto = 'Cargando…' }) {
  return (
    <p className="status status--loading" role="status" aria-live="polite">
      {texto}
    </p>
  );
}
