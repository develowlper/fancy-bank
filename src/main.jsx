import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

import './index.css';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Banking from './pages/Banking';
import { supabase } from './supabaseClient';
// import Routes from './Routes';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const apploader = () => {
  return { session: supabase.auth.session() };
};

const bankingLoader = () => {
  const res = supabase
    .from('balances')
    .select('*')
    .order('created_at', { ascending: false });
  const { error } = res;
  if (error) {
    throw error;
  }
  return res;
};

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
    loader: apploader,
    children: [
      {
        element: <Home />,
      },
      {
        path: 'banking',
        loader: bankingLoader,
        element: <Banking />,
      },
    ],
  },
  {
    path: '/signin',
    element: <Signin />,
  },
]);

// <Route path="/*" element={<App />} />
//     <Route path="/signin" element={<Signin />} />

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
