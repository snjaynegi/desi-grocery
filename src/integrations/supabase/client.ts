// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zrfycfuondjllkdcyfdc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyZnljZnVvbmRqbGxrZGN5ZmRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2OTUxNTAsImV4cCI6MjA2MDI3MTE1MH0.isxCrd2ngTBL0mh7Y5kUl39I6pVXswu_dGw6ctO7NVM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);