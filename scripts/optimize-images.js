import sharp from 'sharp';
import { resolve, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { readdir, rename } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const gallery = resolve(root, 'src/assets/gallery');
const pub = resolve(root, 'public');

// Gallery items display at ~440px max (wide) / ~220px (standard); 800px covers 2× retina
const GALLERY_THUMB_WIDTH = 800;

const galleryPhotos = (await readdir(gallery)).filter(
  (file) => /\.(jpe?g|png)$/i.test(file),
);

const tasks = [
  ...galleryPhotos.map((file) => ({
    input: resolve(gallery, file),
    output: resolve(gallery, `${basename(file, extname(file))}-thumb.webp`),
    width: GALLERY_THUMB_WIDTH,
  })),
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
  await rename(output + '.tmp', output);

  console.log(`${output.replace(root, '.')}  →  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}
