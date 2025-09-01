-- Enable pg_cron extension for scheduled functions
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create a daily cron job to ping the database (runs at 2 AM daily)
SELECT cron.schedule(
  'daily-database-ping',
  '0 2 * * *', -- Every day at 2 AM UTC
  $$
  SELECT
    net.http_post(
        url:='https://okzpfjamnpusxcocjxeb.supabase.co/functions/v1/daily-ping',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9renBmamFtbnB1c3hjb2NqeGViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NzQ2ODIsImV4cCI6MjA3MDA1MDY4Mn0.p_H0syMqnTDzOeqx_fOGVXbgAGK2K0wzZm_m9q5LgBc"}'::jsonb,
        body:='{"source": "cron"}'::jsonb
    ) AS request_id;
  $$
);