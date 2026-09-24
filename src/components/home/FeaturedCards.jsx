import './FeaturedCards.css';

const DESTACADOS = [
  { titulo: 'Novedades', texto: 'Los títulos que acaban de llegar a los estantes.' },
  { titulo: 'Más vendidos', texto: 'Lo que más se están llevando nuestros lectores.' },
  { titulo: 'Recomendados del mes', texto: 'La selección de nuestros libreros para este mes.' },
];

export default function FeaturedCards() {
  return (
    <section className="featured container" aria-label="Destacados">
      {DESTACADOS.map(({ titulo, texto }) => (
        <a key={titulo} href="#catalogo" className="featured__card">
          <h2 className="featured__title">{titulo}</h2>
          <p className="featured__text">{texto}</p>
        </a>
      ))}
    </section>
  );
}
