import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Banking from './pages/Banking';
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="banking" element={<Banking />} />
        </Routes>
      </Auth>
    </QueryClientProvider>
  );
}
