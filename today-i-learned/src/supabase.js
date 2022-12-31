import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ifwcaepodbhskcpwzluy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmd2NhZXBvZGJoc2tjcHd6bHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIwNDcxNTgsImV4cCI6MTk4NzYyMzE1OH0.h4m1QmeKBo8d3cVT8Z577dQQyfSiy4uAWJ1HeDTZmGM';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
