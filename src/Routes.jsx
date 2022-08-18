import { Routes as BrowserRoutes, Route } from 'react-router-dom';
import App from './App';
import Signin from './pages/SignIn';

export default function Routes() {
  return (
    <BrowserRoutes>
      <Route path="/*" element={<App />} />
      <Route path="/signin" element={<Signin />} />
    </BrowserRoutes>
  );
}
