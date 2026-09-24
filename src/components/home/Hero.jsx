import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__content container">
        <h1 className="hero__title">Encuentra tu próxima gran lectura</h1>
        <p className="hero__text">
          Clásicos, novedades y recomendaciones de nuestros libreros. Filtra por género y guarda tus favoritos.
        </p>
        <a href="#catalogo" className="button button--primary">Explorar el catálogo</a>
      </div>
    </section>
  );
}
