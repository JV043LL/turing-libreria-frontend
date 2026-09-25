const formatoPrecio = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

export const formatPrice = (precio) => formatoPrecio.format(precio);

// Imagen de respaldo si la portada no carga (Open Library no tiene todas)
export const PORTADA_RESPALDO = 'https://placehold.co/300x450?text=Sin+portada';

// Open Library devuelve una imagen transparente de 1px cuando no tiene la portada.
// Con ?default=false responde 404 y asi se activa la imagen de respaldo (onError).
// tamano: 'S' | 'M' | 'L' (Open Library ofrece los tres con la misma URL)
export function coverUrl(url, tamano) {
  if (!url) return PORTADA_RESPALDO;
  if (!url.includes('covers.openlibrary.org')) return url;

  let final = tamano ? url.replace(/-[SML]\.jpg/, `-${tamano}.jpg`) : url;
  if (!final.includes('default=')) final += '?default=false';
  return final;
}

// Handler para <img onError>: cambia a la portada de respaldo una sola vez
export function usarPortadaRespaldo(evento) {
  evento.currentTarget.onerror = null; // evita un ciclo si el respaldo tambien falla
  evento.currentTarget.src = PORTADA_RESPALDO;
}

// "Laura Méndez" -> "LM" (para los avatares de los libreros)
export const iniciales = (nombre) =>
  nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join('');
