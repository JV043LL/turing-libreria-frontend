import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
  const { user, login, register } = useAuth();
  const [modo, setModo] = useState('login');
  const location = useLocation();

  // Con sesion iniciada se redirige: a la pagina protegida que se intento abrir,
  // al panel si es admin, o al inicio. Es la unica redireccion de esta pagina:
  // al hacer login cambia "user", React vuelve a dibujar y entra por aqui.
  if (user) {
    const destino = location.state?.from || (user.rol === 'admin' ? '/admin' : '/');
    return <Navigate to={destino} replace />;
  }

  const esLogin = modo === 'login';
  const enviar = ({ nombre, email, password }) =>
    esLogin ? login(email, password) : register(nombre, email, password);

  return (
    <section className="section container page--narrow">
      <div className="login">
        <h1 className="login__title">{esLogin ? 'Iniciar sesión' : 'Crear cuenta'}</h1>
        <p className="login__intro">
          {esLogin
            ? 'Entra para guardar tus libros favoritos.'
            : 'Crea tu cuenta para guardar los libros que quieres leer.'}
        </p>

        {/* key fuerza a reiniciar el formulario al cambiar de modo */}
        <AuthForm key={modo} modo={modo} onSubmit={enviar} />

        <p className="login__switch">
          {esLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <button type="button" className="button--link" onClick={() => setModo(esLogin ? 'register' : 'login')}>
            {esLogin ? 'Crear una cuenta' : 'Iniciar sesión'}
          </button>
        </p>
      </div>

      {/* Solo en desarrollo: facilita probar ambos roles */}
      {import.meta.env.DEV && esLogin && (
        <aside className="login__demo" aria-label="Cuentas de prueba">
          <p className="login__demo-title">Cuentas de prueba</p>
          <p>Admin: admin@libreria.com / Admin123!</p>
          <p>User: user@libreria.com / User123!</p>
        </aside>
      )}
    </section>
  );
}
