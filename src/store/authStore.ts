import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import type { UserProfile } from '../lib/supabase';

interface AuthState {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, phone: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        set({ user: profile });
      },
      signUp: async (email, password, fullName, phone) => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;

        if (data.user) {
          const profile = {
            id: data.user.id,
            email,
            full_name: fullName,
            phone,
            created_at: new Date().toISOString(),
          };

          await supabase.from('profiles').insert([profile]);
          set({ user: profile });
        }
      },
      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);