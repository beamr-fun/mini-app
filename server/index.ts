import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { ogRoute } from './routes/og';
import { readFileSync } from 'fs';

dotenv.config();

const __dirname = import.meta.dirname;

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.get('/.well-known/farcaster.json', (_req, res) => {
  const filePath = path.join(__dirname, '../public/.well-known/farcaster.json');
  const manifest = JSON.parse(readFileSync(filePath, 'utf-8'));
  res.json(manifest);
});

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/og', ogRoute);

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.listen(PORT, () => {
  console.log(`App server listening on port: ${PORT}`);
});
