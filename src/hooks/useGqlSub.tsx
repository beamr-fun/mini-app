import { useState, useEffect } from 'react';
import { print } from 'graphql';
import { wsClient } from '../utils/envio';

interface useGqlSubOptions {
  variables?: Record<string, any>;
  enabled?: boolean;
}

export function useGqlSub<T>(
  query: any,
  { variables, enabled = true }: useGqlSubOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let dispose: (() => void) | undefined;
    let mounted = true;

    const subscribe = async () => {
      setIsLoading(true);

      try {
        dispose = wsClient.subscribe<T>(
          { query: print(query), variables },
          {
            next: (res) => {
              if (!mounted) return;
              setData(res.data as T);
              setIsLoading(false);
            },
            error: (err: any) => {
              if (!mounted) return;
              setError(err);
              setIsLoading(false);
            },
            complete: () => {},
          }
        );
      } catch (err) {
        if (!mounted) return;
        setError(err as Error);
        setIsLoading(false);
      }
    };

    subscribe();

    return () => {
      mounted = false;
      dispose?.();
    };
  }, [enabled, wsClient, query, JSON.stringify(variables)]);

  return { data, error, isLoading };
}
