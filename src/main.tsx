import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from './utils/connect.ts';
import { MiniAppProvider } from './context/MiniAppContext.tsx';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <MiniAppProvider>
          <UserProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </UserProvider>
        </MiniAppProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
