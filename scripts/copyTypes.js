import fs from 'fs';
import path from 'path';

const typesDir = '../beamz-server/src/types/sharedTypes.ts';
const targetDir = './src/types/sharedTypes.ts';

fs.cpSync(typesDir, targetDir, { recursive: true });
