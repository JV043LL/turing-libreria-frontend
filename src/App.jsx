import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import ScrollManager from './components/common/ScrollManager';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import AdminPage from './pages/AdminPage';
import BookDetailPage from './pages/BookDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import SpacePage from './pages/SpacePage';

export default function App() {
  return (
    <div className="app">
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <ScrollManager />
      <Header />
      <main id="contenido" className="app__main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/libros/:id" element={<BookDetailPage />} />
          <Route path="/espacios/:id" element={<SpacePage />} />
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
