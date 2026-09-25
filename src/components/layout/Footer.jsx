import { Link } from 'react-router-dom';
import './Footer.css';

const REDES = [
  { nombre: 'Instagram', url: 'https://www.instagram.com/' },
  { nombre: 'Facebook', url: 'https://www.facebook.com/' },
  { nombre: 'TikTok', url: 'https://www.tiktok.com/' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <p className="footer__logo">Librería Turing</p>
          <p className="footer__text">Libros nuevos y clásicos, recomendados por lectores.</p>
          <nav className="footer__nav" aria-label="Secciones">
            <Link to="/#catalogo" className="footer__link">Catálogo</Link>
            <Link to="/#espacio" className="footer__link">Nuestro espacio</Link>
            <Link to="/#equipo" className="footer__link">Libreros</Link>
          </nav>
        </div>

        <div className="footer__column">
          <h2 className="footer__title">Horario</h2>
          <p>Lunes a viernes: 10:00 a 20:00</p>
          <p>Sábado y domingo: 11:00 a 18:00</p>
        </div>

        <div className="footer__column">
          <h2 className="footer__title">Ubicación</h2>
          <address className="footer__address">
            Av. de los Libros 123, Col. Centro
            <br />
            Ciudad de México
          </address>
        </div>

        <div className="footer__column">
          <h2 className="footer__title">Redes</h2>
          <ul className="footer__list">
            {REDES.map(({ nombre, url }) => (
              <li key={nombre}>
                <a href={url} className="footer__link" target="_blank" rel="noreferrer">{nombre}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="footer__copy container">© {new Date().getFullYear()} Librería Turing</p>
    </footer>
  );
}
