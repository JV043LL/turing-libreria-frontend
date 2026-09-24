export default function Loader({ texto = 'Cargando…' }) {
  return (
    <p className="status" role="status" aria-live="polite">
      {texto}
    </p>
  );
}
