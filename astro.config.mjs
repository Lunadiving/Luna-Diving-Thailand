// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://luna-diving-thailand.com',
  // Tutti gli URL finiscono con lo slash (es. /thailand-liveaboards/pawara/)
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      // Qualità pari a quella delle foto originali: le versioni ridotte pesano molto meno
      config: {
        webp: { quality: 70 },
        jpeg: { quality: 80, mozjpeg: true },
      },
    },
  },
  integrations: [
    sitemap({
      // Impostiamo il nome base direttamente a 'sitemap' così genererà sitemap.xml
      filenameBase: 'sitemap',
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});