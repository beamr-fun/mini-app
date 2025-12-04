import { createClient } from 'graphql-ws';
import { keys } from './setup';

export const wsClient = createClient({
  url: `ws://${keys.indexerUrl}`,
});
