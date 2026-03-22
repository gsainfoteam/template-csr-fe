import { StrictMode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';

import './styles.css';
import '@/common/lib/dayjs';

import { i18n } from '@/common/lib/i18n';

import { routeTree } from './routeTree.gen';

export const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    queryClient,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {import.meta.env.DEV && <TanStackRouterDevtools router={router} position="bottom-left" />}
      </QueryClientProvider>
    </I18nextProvider>
  </StrictMode>,
);
