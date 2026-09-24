import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

export default function Header() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__inner container">
        <Link to="/" className="header__logo">
          Librería Turing
        </Link>

        <nav className="header__nav" aria-label="Principal">
          <a href="/#catalogo" className="header__link">Catálogo</a>
          <a href="/#espacio" className="header__link">Nuestro espacio</a>
          <a href="/#equipo" className="header__link">Libreros</a>
          {user && <NavLink to="/favoritos" className="header__link">Mis favoritos</NavLink>}
          {isAdmin && <NavLink to="/admin" className="header__link">Administrar</NavLink>}
        </nav>

        <div className="header__session">
          {user ? (
            <>
              <span className="header__user">Hola, {user.nombre}</span>
              <button type="button" className="button button--ghost" onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="button button--primary">Iniciar sesión</Link>
          )}
        </div>
      </div>
    </header>
  );
}
