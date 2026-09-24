export default function ErrorMessage({ mensaje, onRetry }) {
  return (
    <div className="status status--error" role="alert">
      <p>{mensaje}</p>
      {onRetry && (
        <button type="button" className="button button--ghost" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
}
