import { GetTxByIdDocument } from '../generated/graphql';
import { gqlClient } from './envio';
import { isDev } from './setup';

export const fetchTx = async (id: string) => {
  try {
    const res = await gqlClient.request(GetTxByIdDocument, { id });

    if (!res.TX_by_pk) {
      throw new Error('Transaction not found');
    }

    return res.TX_by_pk?.id;
  } catch (error) {
    console.log('error', error);
  }
};

export const startTxPoll = async ({
  id,
  onSuccess,
  onError,
  onTimeout,
}: {
  id: string;
  onSuccess: () => void;
  onError: () => void;
  onTimeout: () => void;
}) => {
  if (isDev) {
    console.log('Dev mode: skipping tx poll');
    onSuccess();
    return;
  }
  let tries = 0;
  const interval = setInterval(async () => {
    try {
      const tx = await fetchTx(id);
      if (tx) {
        clearInterval(interval);
        onSuccess();
      } else if (tries >= 20) {
        clearInterval(interval);
        onTimeout();
      } else {
        tries++;
        console.log('tries', tries);
      }
    } catch (error) {
      console.error('Error fetching tx:', error);
      tries++;
      if (tries >= 20) {
        clearInterval(interval);
        onError();
      }
    }
  }, 500);
};

fetchTx('example-tx-id');
