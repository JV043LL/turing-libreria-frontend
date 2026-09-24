import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { useAuth } from '../context/AuthContext';

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

  const enviar = ({ nombre, email, password }) =>
    modo === 'login' ? login(email, password) : register(nombre, email, password);

  return (
    <section className="section container page--narrow">
      <h1 className="section__title">{modo === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h1>

      {/* key fuerza a reiniciar el formulario al cambiar de modo */}
      <AuthForm key={modo} modo={modo} onSubmit={enviar} />

      <p className="section__meta">
        {modo === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
        <button type="button" className="button--link" onClick={() => setModo(modo === 'login' ? 'register' : 'login')}>
          {modo === 'login' ? 'Crear una cuenta' : 'Iniciar sesión'}
        </button>
      </p>
    </section>
  );
}
