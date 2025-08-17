import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://gfwbwubjxhammheefvsx.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdmd2J3dWJqeGhhbW1oZWVmdnN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2ODYzMzUsImV4cCI6MjA2OTI2MjMzNX0.ozegZPzllCgMbrPwrQ7yTN3w3zu_-o1TBilyuaBGK2o";
const supabase = createClient(supabaseUrl, SUPABASE_KEY);

export default supabase;
