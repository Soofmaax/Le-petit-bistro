/**
 * Optimize images in public/images by generating WebP and AVIF versions
 * for all .jpg/.jpeg/.png files found, preserving base names.
 *
 * Usage:
 *   npm run optimize:images
 *
 * Requires: sharp (devDependency)
 */
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';
import sharp from 'sharp';

const IMAGES_DIR = join(process.cwd(), 'public', 'images');

function listImages(dir) {
  const files = readdirSync(dir);
  return files
    .filter((f) => {
      const p = join(dir, f);
      const st = statSync(p);
      if (st.isDirectory()) return false;
      const ext = extname(f).toLowerCase();
      return ['.jpg', '.jpeg', '.png'].includes(ext);
    })
    .map((f) => join(dir, f));
}

async function convert(file) {
  const ext = extname(file);
  const name = basename(file, ext);
  const webpOut = join(IMAGES_DIR, `${name}.webp`);
  const avifOut = join(IMAGES_DIR, `${name}.avif`);

  const img = sharp(file).rotate(); // auto-orient

  await Promise.all([
    img.clone().webp({ quality: 80 }).toFile(webpOut),
    img.clone().avif({ quality: 55 }).toFile(avifOut),
  ]);

  console.log(`✔ Created: ${basename(webpOut)} , ${basename(avifOut)}`);
}

async function run() {
  const files = listImages(IMAGES_DIR);
  if (!files.length) {
    console.log('No images found in public/images');
    return;
  }
  for (const f of files) {
    try {
      await convert(f);
    } catch (e) {
      console.error(`Failed to optimize ${f}:`, e.message ?? e);
    }
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});