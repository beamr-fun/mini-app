import { createClient } from 'graphql-ws';
import { keys } from './setup';

export const wsClient = createClient({
  url: `${keys.indexerUrl.includes('localhost') ? 'ws' : 'wss'}://${keys.indexerUrl}`,
});
