import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://mofrvwztbqezxgauffoe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZnJ2d3p0YnFlenhnYXVmZm9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4MDQ1MDQsImV4cCI6MjAyMjM4MDUwNH0.aeVljlhG9oudhWsiRpjFYyFhEl1hpCQ0Nj5YRT_TLHM";
// const options = {
//   db: {
//     schema: "public",
//   },
//   auth: {
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: true,
//   },
//   global: {
//     headers: {
//       Authorization: `Bearer ${supabaseKey}`,
//     },
//   },
// };
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
