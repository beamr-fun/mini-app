import { keys } from './setup';

const HASURA_URL = keys.indexerUrl;

export async function fetchTx(id: string) {
  const res = await fetch(`https://${HASURA_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query ($id: String!) {
          TX_by_pk(id: $id) {
            id
          }
        }
      `,
      variables: { id },
    }),
  });

  if (!res.ok) throw new Error(`GraphQL error: ${res.statusText}`);

  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);

  console.log('json', json);

  return json.data.TX_by_pk;
}

export const startTxPoll = async ({
  id,
  onSuccess,
  onError,
}: {
  id: string;
  onSuccess: () => void;
  onError: () => void;
}) => {
  let tries = 0;
  const interval = setInterval(async () => {
    try {
      const tx = await fetchTx(id);
      if (tx) {
        clearInterval(interval);
        onSuccess();
      } else if (tries >= 20) {
        clearInterval(interval);
        onError();
      } else {
        tries++;
        console.log('tries', tries);
      }
    } catch (error) {
      console.error('Error fetching tx:', error);
      if (tries >= 20) {
        clearInterval(interval);
        onError();
      }
    }
  }, 500);
};
