CREATE TABLE public.ping_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status text NOT NULL DEFAULT 'success',
  source text DEFAULT 'cron',
  response_time_ms integer,
  error_message text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.ping_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view ping logs"
ON public.ping_logs
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'
  )
);

CREATE POLICY "Service role can insert ping logs"
ON public.ping_logs
FOR INSERT
TO public
WITH CHECK (true);