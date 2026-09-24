import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <p className="footer__logo">Librería Turing</p>
          <p>Libros nuevos y clásicos, recomendados por lectores.</p>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">Horario</h3>
          <p>Lunes a viernes: 10:00 a 20:00</p>
          <p>Sábado y domingo: 11:00 a 18:00</p>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">Ubicación</h3>
          <p>Av. de los Libros 123, Col. Centro</p>
          <p>Ciudad de México</p>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">Redes</h3>
          <ul className="footer__list">
            <li><a href="#" className="footer__link">Instagram</a></li>
            <li><a href="#" className="footer__link">Facebook</a></li>
            <li><a href="#" className="footer__link">TikTok</a></li>
          </ul>
        </div>
      </div>
      <p className="footer__copy container">© {new Date().getFullYear()} Librería Turing</p>
    </footer>
  );
}
