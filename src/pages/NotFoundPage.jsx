import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="section container not-found">
      <h1 className="section__title">Esta página no está en nuestros estantes</h1>
      <p className="section__intro">Revisa la dirección o vuelve al inicio para seguir explorando.</p>
      <Link to="/" className="button button--primary">Ir al inicio</Link>
    </section>
  );
}
