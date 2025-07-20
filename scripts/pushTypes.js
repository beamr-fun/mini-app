import fs from 'fs';

const targetDir = '../beamz-server/src/types/sharedTypes.ts';
const typesDir = './src/types/sharedTypes.ts';

fs.cpSync(typesDir, targetDir, { recursive: true });
