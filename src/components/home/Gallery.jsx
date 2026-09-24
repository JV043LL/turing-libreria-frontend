import './Gallery.css';

// Reemplaza "imagen" por la ruta de tus fotos (por ejemplo, en /public/galeria/)
const FOTOS = [
  { titulo: 'Sala de lectura', imagen: null },
  { titulo: 'Club de lectura de los jueves', imagen: null },
  { titulo: 'Presentaciones de autor', imagen: null },
  { titulo: 'Rincón infantil', imagen: null },
];

export default function Gallery() {
  return (
    <section id="espacio" className="section container">
      <h2 className="section__title">Nuestro espacio</h2>
      <div className="gallery">
        {FOTOS.map(({ titulo, imagen }) => (
          <figure key={titulo} className="gallery__item">
            {imagen ? (
              <img src={imagen} alt={titulo} className="gallery__image" />
            ) : (
              <div className="gallery__placeholder" aria-hidden="true" />
            )}
            <figcaption className="gallery__caption">{titulo}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
