import { Link as RouterLink, Route, Routes } from 'react-router-dom';
import { Link, Box } from '@mui/material';

export default function Navigation() {
  return (
    <nav>
      <Box component="ul" sx={{ listStyle: 'none' }}>
        <Routes>
          <Route
            path="/"
            element={
              <li>
                <Link component={RouterLink} to="banking">
                  Banking
                </Link>
              </li>
            }
          />
          <Route
            path="banking"
            element={
              <li>
                <Link component={RouterLink} to="/">
                  Home
                </Link>
              </li>
            }
          />
        </Routes>
      </Box>
    </nav>
  );
}
