import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Preload the two font weights visible above the fold: 500 (hero h1) and 600 (section titles).
// Latin + Latin-ext cover French accented characters (é, è, à, ù, ç…).
const CRITICAL_FONT_PATTERN = /cormorant-garamond-latin(-ext)?-(500|600)-normal.*\.woff2$/;

const fontPreloadPlugin = {
  name: 'font-preload',
  transformIndexHtml: {
    enforce: 'post',
    transform(html, ctx) {
      if (!ctx.bundle) return html;
      const preloads = Object.keys(ctx.bundle)
        .filter(key => CRITICAL_FONT_PATTERN.test(key))
        .map(key => `    <link rel="preload" as="font" type="font/woff2" href="/${key}" crossorigin>`)
        .join('\n');
      if (!preloads) return html;
      return html.replace('</head>', `${preloads}\n  </head>`);
    },
  },
};

export default defineConfig({
  plugins: [
    react(),
    fontPreloadPlugin,
    VitePWA({
      registerType: 'autoUpdate',
      // Use the existing manifest rather than generating a new one
      manifest: false,
      workbox: {
        // Precache all Vite-hashed assets — they are immutable (URL changes on content change)
        globPatterns: ['assets/**/*.{js,css,woff,woff2,jpg,webp,png}'],
        // index.html: always fetch from network so users see the latest hashed asset URLs
        navigateFallback: null,
        runtimeCaching: [
          {
            // Sitemap: updated on every concert addition — network first
            urlPattern: /\/sitemap\.xml$/,
            handler: 'NetworkFirst',
            options: { cacheName: 'sitemap' },
          },
          {
            // Audio: large files, serve stale immediately and refresh in background — 7 days
            urlPattern: /\/audio\/.+\.mp3$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'audio',
              expiration: { maxAgeSeconds: 7 * 24 * 60 * 60 },
            },
          },
          {
            // Unhashed public images (logo, og-image, favicons, manifest icons) — 7 days
            urlPattern: /\/(logo\.webp|og-image\.jpg|favicon.*|apple-touch-icon\.png|web-app-manifest.*\.png)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'public-images',
              expiration: { maxAgeSeconds: 7 * 24 * 60 * 60 },
            },
          },
          {
            // robots.txt, site.webmanifest — 24 hours
            urlPattern: /\/(robots\.txt|site\.webmanifest)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'meta-files',
              expiration: { maxAgeSeconds: 24 * 60 * 60 },
            },
          },
        ],
      },
    }),
  ],
  base: '/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.js',
  },
})
