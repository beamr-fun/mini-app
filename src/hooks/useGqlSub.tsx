import { useState, useEffect, useRef } from 'react';
import { print } from 'graphql';
import { wsClient } from '../utils/envio';

// 1. Unified Options Interface
// We default TResult to TData. If transform is used, TResult can be inferred or specified.
interface UseGqlSubOptions<TData, TResult = TData> {
  variables?: Record<string, any>;
  enabled?: boolean;
  transform?: (data: TData) => Promise<TResult> | TResult;
}

// 2. Single Function Signature
export function useGqlSub<TData = any, TResult = TData>(
  query: any,
  options: UseGqlSubOptions<TData, TResult> = {}
) {
  const { variables, enabled = true, transform } = options;

  // State is typed as TResult (which defaults to TData if no transform is involved)
  const [data, setData] = useState<TResult | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const transformRef = useRef(transform);
  const requestKeyRef = useRef(0);

  useEffect(() => {
    transformRef.current = transform;
  }, [transform]);

  useEffect(() => {
    if (!enabled) return;

    let dispose: (() => void) | undefined;
    let mounted = true;

    const subscribe = async () => {
      setIsLoading(true);

      try {
        dispose = wsClient.subscribe<TData>(
          { query: print(query), variables },
          {
            next: async (res) => {
              if (!mounted) return;

              const currentRequestKey = ++requestKeyRef.current;

              const rawData = res.data;

              if (transformRef.current && rawData) {
                try {
                  const result = await transformRef.current(rawData);
                  if (!mounted || currentRequestKey !== requestKeyRef.current)
                    return;
                  setData(result);
                  setIsLoading(false);
                } catch (err) {
                  if (!mounted || currentRequestKey !== requestKeyRef.current)
                    return;
                  setError(err as Error);
                  setIsLoading(false);
                }
              } else {
                // Cast rawData to TResult.
                // If TResult is different from TData but no transform was provided,
                // this is logically impossible in TS usage unless forced, so this cast is safe.
                setData(rawData as unknown as TResult);
                setIsLoading(false);
              }
            },
            error: (err: any) => {
              console.log('Error fired');

              console.log('err', err);
              if (!mounted) return;

              if (Array.isArray(err) && err?.length > 0) {
                const cleanError = new Error(err?.[0]?.message);
                // @ts-ignore - attaching extra info for your UI
                cleanError.code = err[0].extensions?.code;
                setError(cleanError);
                setIsLoading(false);
                return;
              } else {
                setError(Error(err.message || 'Subscription error'));
                setIsLoading(false);
              }
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
