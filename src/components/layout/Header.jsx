import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

export default function Header() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Cierra el menu movil al navegar
  useEffect(() => {
    setMenuAbierto(false);
  }, [location.pathname, location.hash]);

  // Cierra el menu con la tecla Escape
  useEffect(() => {
    if (!menuAbierto) return undefined;
    const alPresionar = (e) => e.key === 'Escape' && setMenuAbierto(false);
    document.addEventListener('keydown', alPresionar);
    return () => document.removeEventListener('keydown', alPresionar);
  }, [menuAbierto]);

  const cerrarSesion = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__inner container">
        <Link to="/" className="header__logo" aria-label="Librería Turing, ir al inicio">
          <span className="header__logo-mark" aria-hidden="true" />
          Librería Turing
        </Link>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={menuAbierto}
          aria-controls="menu-principal"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="header__toggle-bars" aria-hidden="true" />
          <span className="visually-hidden">{menuAbierto ? 'Cerrar menú' : 'Abrir menú'}</span>
        </button>

        <div id="menu-principal" className={`header__menu${menuAbierto ? ' header__menu--open' : ''}`}>
          <nav className="header__nav" aria-label="Principal">
            <Link to="/#catalogo" className="header__link">Catálogo</Link>
            <Link to="/#espacio" className="header__link">Nuestro espacio</Link>
            <Link to="/#equipo" className="header__link">Libreros</Link>
            {user && <NavLink to="/favoritos" className="header__link">Mis favoritos</NavLink>}
            {isAdmin && <NavLink to="/admin" className="header__link">Administrar</NavLink>}
          </nav>

          <div className="header__session">
            {user ? (
              <>
                <span className="header__user">
                  Hola, {user.nombre}
                  {isAdmin && <span className="header__role">admin</span>}
                </span>
                <button type="button" className="button button--on-dark button--small" onClick={cerrarSesion}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link to="/login" className="button button--primary button--small">Iniciar sesión</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
