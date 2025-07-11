import { use, useCallback, useEffect, useRef, useState } from 'react';

enum Status {
  None,
  Connected,
  Disconnected,
  Reconnecting,
  Error,
}

export function useSSE<T>({
  url,
  validator,
  maxReconnectAttempts = 5,
  reconnectDelay = 1000,
  auto = true,
}: {
  url: string;
  validator?: (data: any) => T;
  maxReconnectAttempts?: number;
  reconnectDelay?: number;
  auto: boolean;
}) {
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState<Status>(Status.None);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectAttemptsRef = useRef(0);

  const connect = useCallback(
    (url: string) => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      const eventSource = new EventSource(url);

      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        setIsConnected(true);
        setStatus(Status.Connected);
        reconnectAttemptsRef.current = 0;
      };

      eventSource.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);

          handleMessage(parsed);
        } catch (err: any) {
          console.error('Error parsing SSE message:', err);
          setError(err.message);
        }
      };

      eventSource.onerror = (err) => {
        setError('An error occurred while connecting to the SSE stream.');
        setIsConnected(false);
        setStatus(Status.Error);

        if (eventSource.readyState === EventSource.CLOSED) {
          handleReconnect(url);
        }
      };

      return () => {
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          setIsConnected(false);
          setStatus(Status.Disconnected);
          eventSourceRef.current = null;
        }
      };
    },
    [url]
  );

  const handleMessage = useCallback((parsed: any) => {
    switch (parsed.type) {
      case 'connected':
        setIsConnected(true);
        parsed.data = validator ? validator(parsed.data) : parsed.data;
        break;
      case 'state_update':
        if (validator) {
          parsed.data = validator(parsed.data);
        }
        setData(parsed.data);
        break;
      default:
        console.warn('Unhandled SSE message type:', parsed.type);
        break;
    }
  }, []);

  const handleReconnect = useCallback(
    (url: string) => {
      if (reconnectAttemptsRef.current < maxReconnectAttempts) {
        reconnectAttemptsRef.current++;
        const delay =
          reconnectDelay * Math.pow(2, reconnectAttemptsRef.current - 1);

        setStatus(Status.Reconnecting);

        setTimeout(() => {
          connect(url);
        }, delay);
      } else {
        setStatus(Status.Error);
        setError('Max reconnection attempts reached');
      }
    },
    [connect, url, maxReconnectAttempts, reconnectDelay]
  );

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setIsConnected(false);
    setStatus(Status.Disconnected);
  }, []);

  useEffect(() => {
    if (auto) {
      connect(url);
    }

    return () => {
      disconnect();
    };
  }, [auto, connect, url]);

  return {
    data,
    error,
    isConnected,
    status,
    connect,
    reconnect: handleReconnect,
  };
}
