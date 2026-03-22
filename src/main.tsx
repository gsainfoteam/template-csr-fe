import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import './styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {import.meta.env.DEV && <TanStackRouterDevtools router={router} position='bottom-left' />}
    </QueryClientProvider>
  </StrictMode>,
)
