import Catalog from '../components/books/Catalog';
import FeaturedCards from '../components/home/FeaturedCards';
import Gallery from '../components/home/Gallery';
import Hero from '../components/home/Hero';
import Team from '../components/home/Team';

// Orden de secciones segun el wireframe izquierdo
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCards />
      <Catalog />
      <Gallery />
      <Team />
    </>
  );
}
