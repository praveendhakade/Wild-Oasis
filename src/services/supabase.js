import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ogatgoqtxldrolidcedn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nYXRnb3F0eGxkcm9saWRjZWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI0Mjg5MjIsImV4cCI6MjAwODAwNDkyMn0.uoRX7NqFj3cSeqEtEZaiOrhMGuv6utR0K_WdEqN_ACs";
  
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
