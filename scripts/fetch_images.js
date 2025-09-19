/**
 * Download curated images into public/images for local, stable assets.
 * No external deps, uses https and fs.
 */
import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { get } from 'https';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outDir = `${__dirname}/../public/images`;

const files = [
  {
    url: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    name: 'hero.jpg',
    credit: 'Pexels: Restaurant table — Photo #262978'
  },
  {
    url: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop',
    name: 'about_interior.jpg',
    credit: 'Pexels: Restaurant interior — Photo #3184183'
  },
  {
    url: 'https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    name: 'team_antoine.jpg',
    credit: 'Pexels: Chef portrait — Photo #4253302'
  },
  {
    url: 'https://images.pexels.com/photos/3992204/pexels-photo-3992204.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    name: 'team_sophie.jpg',
    credit: 'Pexels: Manager portrait — Photo #3992204'
  },
  {
    url: 'https://images.pexels.com/photos/4253313/pexels-photo-4253313.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    name: 'team_paul.jpg',
    credit: 'Pexels: Sous-chef portrait — Photo #4253313'
  },
  {
    url: 'https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    name: 'reservation_ambience.jpg',
    credit: 'Pexels: Bistro ambience — Photo #5490778'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Handle redirects
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        return reject(new Error(`Failed to download ${url} (${res.statusCode})`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }
  for (const f of files) {
    const target = `${outDir}/${f.name}`;
    if (existsSync(target)) {
      // skip if already exists
      // eslint-disable-next-line no-console
      console.log(`✔ Skipped (exists): ${f.name}`);
      continue;
    }
    // eslint-disable-next-line no-console
    console.log(`↓ Downloading ${f.name} ...`);
    await download(f.url, target);
    // eslint-disable-next-line no-console
    console.log(`✔ Saved: ${target}`);
  }
}

run().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});