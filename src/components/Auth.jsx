import { useEffect } from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';

import { supabase } from '../supabaseClient';

export default function Auth({ children, skip = false }) {
  const { session } = useLoaderData();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      window.location.reload();
    });
  }, []);

  if (skip) {
    return children;
  }

  if (!session) {
    return <Navigate to="/signin" />;
  }

  return children;
}
