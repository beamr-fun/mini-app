import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = import.meta.dirname;

const app = express();

const PORT = process.env.PORT || 3000;

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Serve Vite static files (including .well-known/farcaster.json)
// Goes up one level from /server to find /dist
app.use(express.static(path.join(__dirname, '../dist')));

app.listen(PORT, () => {
  console.log(`App server listening on port: ${PORT}`);
});
