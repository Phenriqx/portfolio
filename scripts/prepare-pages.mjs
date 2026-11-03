import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const output = 'dist';
const assets = 'assets';

await rm(assets, { recursive: true, force: true });
await mkdir(assets, { recursive: true });

for (const file of await readdir(join(output, assets))) {
  await cp(join(output, assets, file), join(assets, file), { recursive: true });
}

await writeFile('index.html', await readFile(join(output, 'index.html')));
