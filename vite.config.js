import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
  plugins: [react(), fontPreloadPlugin],
  base: '/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.js',
  },
})
