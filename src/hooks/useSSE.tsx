import { useState } from 'react';

export function useSSE<T>({
  url,
  val,
}: {
  url: string;
  val: (data: any) => T;
}) {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [data, setData] = useState<T | null>(null);

  return {
    data,
    isConnected,
    connectionStatus,
    setData,
    setIsConnected,
    setConnectionStatus,
  };
}
