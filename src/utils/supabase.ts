import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mrwmlolbchfvqrbfuxwd.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yd21sb2xiY2hmdnFyYmZ1eHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwOTMzMTUsImV4cCI6MjA1MDY2OTMxNX0.b74rMj9rfvnZHPYJXFxI4WCUHKOvHYxYZMr3Zlnh2FU';

const supabase = createClient(supabaseUrl, supabaseKey);
export { supabase };
