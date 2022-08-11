import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Banking from './pages/Banking';
import Navigation from './components/Navigation';

export default function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="banking" element={<Banking />} />
      </Routes>
    </div>
  );
}
