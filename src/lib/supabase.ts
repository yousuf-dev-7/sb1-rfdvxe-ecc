import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xyzcompany.supabase.co';
const supabaseKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
};