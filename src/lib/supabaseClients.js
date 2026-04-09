import { createClient } from "@supabase/supabase-js";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzcGhmYWdvZXV3c2xhZW9lZWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMTQ5ODgsImV4cCI6MjA4OTU5MDk4OH0.gmsDyeSOccb6PG7YjF1I5gX4hIz5SQrBtPiLsyayfWM";

export const supabaseUrl = "https://bsphfagoeuwslaeoeejs.supabase.co";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
