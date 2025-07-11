// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cqzpytcbiqvjhjhvrkrz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxenB5dGNiaXF2amhqaHZya3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1OTcwODcsImV4cCI6MjA2NjE3MzA4N30.ghyHvWMSMyWBe3nKAQaXPq-PZkcqTAIIUtsusAO0xXQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});