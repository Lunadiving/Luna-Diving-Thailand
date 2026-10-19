// src/utils/images.ts
// Collega i percorsi "/images/..." usati nelle pagine alle foto in src/assets/images,
// così Astro può ottimizzarle (formati, dimensioni, srcset).
import type { ImageMetadata } from 'astro';

const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{webp,jpg,jpeg,png,avif,gif}',
  { eager: true },
);

// URL del file originale, copiato così com'è (senza ricompressione)
const originalUrls = import.meta.glob<string>(
  '/src/assets/images/**/*.{webp,jpg,jpeg,png,avif,gif}',
  { eager: true, query: '?url', import: 'default' },
);

const toKey = (path: string) => `/src/assets${decodeURI(path)}`;

/** URL della foto originale, senza ricompressione. */
export function originalImageUrl(path: string): string {
  resolveImage(path);
  return originalUrls[toKey(path)];
}

/** Restituisce la foto, oppure undefined se il file non esiste. */
export function findImage(path: string): ImageMetadata | undefined {
  return images[toKey(path)]?.default;
}

/** Restituisce la foto; se il file non esiste la build si ferma con un errore chiaro. */
export function resolveImage(path: string): ImageMetadata {
  const image = findImage(path);
  if (!image) {
    throw new Error(`Immagine non trovata: ${path} (cercata in src/assets${decodeURI(path)})`);
  }
  return image;
}
