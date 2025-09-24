import { createClient, fetchExchange, subscriptionExchange } from 'urql';
import { createClient as createWS } from 'graphql-ws';
import { cacheExchange } from '@urql/exchange-graphcache';
import { keys } from './setup';

const urlToWs = (url: string) => {
  // detect if https or http
  const protocol = url.startsWith('https') ? 'wss' : 'ws';

  // replace http/https with ws/wss
  return url.replace(/^(https?:)/, protocol + ':');
};

console.log('urlToWs', urlToWs(keys.indexerUrl));

const ws = createWS({
  url: urlToWs(keys.indexerUrl),
});
