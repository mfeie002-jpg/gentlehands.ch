-- Drop the insecure public INSERT policy
DROP POLICY IF EXISTS "System can insert activity logs" ON public.activity_logs;

-- Create a SECURITY DEFINER function for secure activity logging
CREATE OR REPLACE FUNCTION public.log_activity(
  p_action text,
  p_entity_type text,
  p_entity_id uuid DEFAULT NULL,
  p_details jsonb DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.activity_logs (action, entity_type, entity_id, details, user_id)
  VALUES (p_action, p_entity_type, p_entity_id, p_details, auth.uid());
END;
$$;

-- Grant execute permission to authenticated users only
REVOKE ALL ON FUNCTION public.log_activity FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.log_activity TO authenticated;