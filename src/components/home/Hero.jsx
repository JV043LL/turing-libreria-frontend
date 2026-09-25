import { Link } from 'react-router-dom';
import './Hero.css';

// Alturas y anchos de los lomos del estante decorativo (en % y px).
// Son fijos para que el estante se vea igual en cada visita.
const LOMOS = [
  [72, 18], [88, 24], [64, 14], [80, 20], [94, 26], [70, 16], [58, 22], [84, 18],
  [76, 28], [90, 16], [66, 20], [82, 24], [96, 18], [60, 14], [78, 26], [86, 20],
  [68, 22], [92, 16], [74, 24], [62, 18], [88, 20], [80, 14], [70, 26], [94, 22],
  [64, 18], [84, 24], [76, 16], [90, 20], [58, 22], [82, 18],
];

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-titulo">
      <div className="hero__content container">
        <h1 id="hero-titulo" className="hero__title">Encuentra tu próxima gran lectura</h1>
        <p className="hero__text">
          Clásicos, novedades y recomendaciones de nuestros libreros. Filtra por género y guarda tus favoritos.
        </p>
        <Link to="/#catalogo" className="button button--primary hero__cta">Explorar el catálogo</Link>
      </div>

      <div className="hero__shelf" aria-hidden="true">
        {LOMOS.map(([alto, ancho], i) => (
          <span key={i} className="hero__spine" style={{ height: `${alto}%`, width: `${ancho}px` }} />
        ))}
      </div>
    </section>
  );
}
