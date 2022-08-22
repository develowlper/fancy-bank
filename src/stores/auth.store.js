import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const store = immer(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
    }),
    { name: 'fancy-bank-auth' }
  )
);

export const useAuthStore = create(devtools(store));
