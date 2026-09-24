const formatoPrecio = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

export const formatPrice = (precio) => formatoPrecio.format(precio);

// Imagen de respaldo si la portada no carga (Open Library no tiene todas)
export const PORTADA_RESPALDO = 'https://placehold.co/300x450?text=Sin+portada';

// Open Library devuelve una imagen transparente de 1px cuando no tiene la portada.
// Con ?default=false responde 404 y asi se activa la imagen de respaldo (onError).
export function coverUrl(url) {
  if (!url) return PORTADA_RESPALDO;
  if (url.includes('covers.openlibrary.org') && !url.includes('default=')) return `${url}?default=false`;
  return url;
}
