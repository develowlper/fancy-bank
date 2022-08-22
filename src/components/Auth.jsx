import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { supabase } from '../supabaseClient';

import { useAuthStore } from '../stores/auth.store';

export default function Auth({ children }) {
  const session = useAuthStore((state) => state.session);
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    const fetchData = async () => {
      const data = supabase.auth.session();
      return data;
    };

    if (!session) {
      fetchData()
        .then((session) => {
          setSession(session);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [session, setSession]);

  if (!session) {
    return <Navigate to="/signin" />;
  }

  return children;
}
