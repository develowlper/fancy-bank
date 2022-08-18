import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { supabase } from '../supabaseClient';

export default function Auth({ children }) {
  const [session, setSession] = useState(supabase.auth.session());

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
  }, [session]);

  if (!session) {
    return <Navigate to="/signin" />;
  }

  return children;
}
