import { useCallback, useEffect, useRef, useState } from 'react';

enum Status {
  None,
  Connected,
  Disconnected,
  Error,
}

export function useSSE<T>({
  url,
  validator,
  maxReconnectAttempts = 5,
  reconnectDelay = 1000,
}: {
  url: string;
  validator?: (data: any) => T;
  maxReconnectAttempts?: number;
  reconnectDelay?: number;
}) {
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState<Status>(Status.None);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectAttemptsRef = useRef(0);

  useEffect(() => {
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

        // handleMessage(data);
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
        // handleReconnect(userId, token);
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
  }, [url]);

  const handleMessage = useCallback((parsed: any) => {
    switch (parsed.type) {
      case 'connected':
        setIsConnected(true);

        parsed.data = validator ? validator(parsed.data) : parsed.data;
    }
  }, []);

  return {
    data,
    error,
    isConnected,
    status,
  };
}
