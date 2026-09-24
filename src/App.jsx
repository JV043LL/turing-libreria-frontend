import { Link, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import AdminPage from './pages/AdminPage';
import FavoritesPage from './pages/FavoritesPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/favoritos"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute rol="admin">
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <section className="section container">
                <h1 className="section__title">Página no encontrada</h1>
                <Link to="/">Volver al inicio</Link>
              </section>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
