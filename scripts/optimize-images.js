import sharp from 'sharp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const assets = resolve(root, 'src/assets');
const pub = resolve(root, 'public');

const tasks = [
  // Gallery thumbnails: wide items display at ~440px max, 800px covers 2× retina
  {
    input: resolve(assets, 'Jardin.jpg'),
    output: resolve(assets, 'Jardin-thumb.webp'),
    width: 800,
  },
  {
    input: resolve(assets, 'Visuel-eglise-sans-texte.jpg'),
    output: resolve(assets, 'Visuel-eglise-sans-texte-thumb.webp'),
    width: 800,
  },
  // Logo: displays at max 260px (clamp), 520px covers 2× retina
  {
    input: resolve(pub, 'logo.webp'),
    output: resolve(pub, 'logo.webp'),
    width: 520,
  },
];

for (const { input, output, width } of tasks) {
  const info = await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(output + '.tmp');

  // sharp can't overwrite input; rename tmp → target
  const fs = await import('fs/promises');
  await fs.rename(output + '.tmp', output);

  console.log(`${output.replace(root, '.')}  →  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}
