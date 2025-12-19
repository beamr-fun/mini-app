import { createClient } from 'graphql-ws';
import { GraphQLClient } from 'graphql-request';
import { keys } from './setup';

export const wsClient = createClient({
  url: `${keys.indexerUrl.includes('localhost') ? 'ws' : 'wss'}://${keys.indexerUrl}`,
});

export const gqlClient = new GraphQLClient(
  `${keys.indexerUrl.includes('localhost') ? 'http' : 'https'}://${keys.indexerUrl}`,
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
);
