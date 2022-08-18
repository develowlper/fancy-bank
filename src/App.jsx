// import { Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import Banking from './pages/Banking';
// import Navigation from './components/Navigation';

// export default function App() {
//   return (
//     <div>
//       <Navigation />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="banking" element={<Banking />} />
//       </Routes>
//     </div>
//   );
// }

import './index.css';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

import Auth from './components/Auth';
import Account from './pages/Account';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.auth.getSession();
      return data;
    };

    if (!session) {
      fetchData()
        .then(({ session }) => {
          setSession(session);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [session]);

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}
