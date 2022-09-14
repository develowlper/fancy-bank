import { Outlet } from 'react-router-dom';

import Navigation from './components/Navigation';
import Auth from './components/Auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Navigation />
      <Auth>
        <Outlet />
      </Auth>
    </QueryClientProvider>
  );
}
