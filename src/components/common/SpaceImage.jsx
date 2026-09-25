import { useState } from 'react';

// Imagen de un espacio. Si no hay URL o no carga, muestra un bloque de color
// (como los cuadros del wireframe) en lugar de una imagen rota.
export default function SpaceImage({ src, className }) {
  const [fallo, setFallo] = useState(false);

  if (!src || fallo) return <div className={`${className} ${className}--empty`} aria-hidden="true" />;

  return <img src={src} alt="" className={className} loading="lazy" onError={() => setFallo(true)} />;
}
