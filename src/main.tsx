import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from './utils/connect.ts';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext.tsx';
import { MantineProvider } from '@mantine/core';
import { cssVariablesResolver, theme } from './theme.ts';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <BrowserRouter>
            <MantineProvider
              withCssVariables
              theme={theme}
              defaultColorScheme="dark"
              cssVariablesResolver={cssVariablesResolver}
            >
              <App />
            </MantineProvider>
          </BrowserRouter>
        </UserProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
