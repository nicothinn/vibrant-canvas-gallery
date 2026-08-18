import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qavumxdxhfczrzrtojtq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhdnVteGR4aGZjenJ6cnRvanRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5ODEwNDUsImV4cCI6MjEwMjU1NzA0NX0.ShWzCCdkfElWTiEn4UZNrwuqGFad7f86_55fWV2EBOo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
