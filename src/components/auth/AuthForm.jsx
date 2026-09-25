import { useState } from 'react';
import './AuthForm.css';

// Formulario compartido para iniciar sesion y crear cuenta.
// modo: 'login' | 'register'
export default function AuthForm({ modo, onSubmit }) {
  const esRegistro = modo === 'register';
  const [campos, setCampos] = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [detalles, setDetalles] = useState({}); // errores por campo que devuelve la API
  const [enviando, setEnviando] = useState(false);

  const cambiar = (e) => setCampos({ ...campos, [e.target.name]: e.target.value });

  const enviar = async (e) => {
    e.preventDefault();
    setError(null);
    setDetalles({});
    setEnviando(true);
    try {
      await onSubmit(campos);
    } catch (err) {
      setError(err.message);
      // Convierte [{ campo, mensaje }] en { campo: mensaje } para mostrarlo bajo cada input
      setDetalles(Object.fromEntries((err.details || []).map((d) => [d.campo, d.mensaje])));
    } finally {
      setEnviando(false);
    }
  };

  const campo = (name, label, type = 'text', autoComplete) => (
    <div className="auth-form__field">
      <label htmlFor={name} className="auth-form__label">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        className="auth-form__input"
        value={campos[name]}
        onChange={cambiar}
        autoComplete={autoComplete}
        aria-invalid={Boolean(detalles[name])}
        aria-describedby={detalles[name] ? `${name}-error` : undefined}
        required
      />
      {detalles[name] && <p id={`${name}-error`} className="auth-form__hint">{detalles[name]}</p>}
    </div>
  );

  return (
    <form className="auth-form" onSubmit={enviar} noValidate>
      {esRegistro && campo('nombre', 'Nombre', 'text', 'name')}
      {campo('email', 'Email', 'email', 'email')}
      {campo('password', 'Contraseña', 'password', esRegistro ? 'new-password' : 'current-password')}
      {esRegistro && <p className="auth-form__note">Mínimo 8 caracteres, con al menos una letra y un número.</p>}

      {error && <p className="status status--error" role="alert">{error}</p>}

      <button type="submit" className="button button--primary" disabled={enviando}>
        {enviando ? 'Enviando…' : esRegistro ? 'Crear cuenta' : 'Iniciar sesión'}
      </button>
    </form>
  );
}
