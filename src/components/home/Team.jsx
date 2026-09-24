import './Team.css';

// El librero del centro se muestra mas grande, como en el wireframe
const LIBREROS = [
  { nombre: 'Laura Méndez', rol: 'Librera', recomienda: 'Pedro Páramo' },
  { nombre: 'Andrés Ruiz', rol: 'Fundador', recomienda: 'Cien años de soledad', destacado: true },
  { nombre: 'Sofía Herrera', rol: 'Librera', recomienda: 'Dune' },
];

export default function Team() {
  return (
    <section id="equipo" className="section container">
      <h2 className="section__title">Nuestros libreros recomiendan</h2>
      <div className="team">
        {LIBREROS.map(({ nombre, rol, recomienda, destacado }) => (
          <article key={nombre} className={`team__member${destacado ? ' team__member--featured' : ''}`}>
            <div className="team__photo" aria-hidden="true" />
            <h3 className="team__name">{nombre}</h3>
            <p className="team__role">{rol}</p>
            <p className="team__pick">Recomienda: {recomienda}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
