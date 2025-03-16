import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://yicrcjktxaenjzgmlgty.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpY3Jjamt0eGFlbmp6Z21sZ3R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMTc0MTUsImV4cCI6MjA1NzY5MzQxNX0.-zHU8vn5KeZB6fWon_EbgTdxMSH3dFqttHwScBIL1hU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
