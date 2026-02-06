import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { ogRoute } from './routes/ogRoutes';
import { readFileSync } from 'fs';
import morgan from 'morgan';
import { createServer } from 'http';

dotenv.config();

const __dirname = import.meta.dirname;

const app = express();
const server = createServer(app);

server.timeout = 30000; // 30 seconds

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

let lastTick = Date.now();
setInterval(() => {
  lastTick = Date.now();
}, 1000);

app.get('/health', (_req, res) => {
  const lag = Date.now() - lastTick;
  if (lag > 5000) {
    console.error(`Health check failed: event loop lag ${lag}ms`);
    return res.status(503).json({ status: 'unhealthy', lag });
  }
  res.status(200).json({ status: 'OK', lag });
});

const manifest = JSON.parse(
  readFileSync(
    path.join(__dirname, '../public/.well-known/farcaster.json'),
    'utf-8'
  )
);

app.get('/.well-known/farcaster.json', (_req, res) => {
  res.json(manifest);
});

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/og', ogRoute);

app.use('/api/webhook', (req, res) => {
  console.log('req.headers', req.headers);
  console.log('req.body', req.body);
  res.status(200).send('Webhook received');
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
