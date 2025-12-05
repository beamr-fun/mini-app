import { createClient } from 'graphql-ws';
import { keys } from './setup';

export const wsClient = createClient({
  url: `${keys.indexerUrl.includes('localhost' || '127.0.0') ? 'ws' : 'wss'}://${keys.indexerUrl}`,
});
