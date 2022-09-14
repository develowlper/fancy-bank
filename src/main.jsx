import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

import './index.css';
import Signin from './pages/Signin';
import Home from './pages/Home';
// import Routes from './Routes';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
    children: [
      {
        element: <Home />,
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
