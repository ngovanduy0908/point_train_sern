import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wxutuelmzidfloowaugx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4dXR1ZWxtemlkZmxvb3dhdWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyNTM0OTAsImV4cCI6MjAxNjgyOTQ5MH0.P0vMf5Ul5SzfkWPGUkWCJStJDGs8RYWQsHXKKv4mjwI";
export const supabase = createClient(supabaseUrl, supabaseKey);
