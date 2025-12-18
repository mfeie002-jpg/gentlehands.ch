-- Create conversion goals table
CREATE TABLE public.conversion_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  goal_type TEXT NOT NULL DEFAULT 'booking', -- booking, signup, gift_card, contact
  target_value INTEGER NOT NULL DEFAULT 10,
  current_value INTEGER NOT NULL DEFAULT 0,
  period TEXT NOT NULL DEFAULT 'daily', -- daily, weekly, monthly
  alert_threshold NUMERIC DEFAULT 0.8, -- Alert when below 80% of target
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create goal tracking history
CREATE TABLE public.goal_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  goal_id UUID NOT NULL REFERENCES public.conversion_goals(id) ON DELETE CASCADE,
  period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  target_value INTEGER NOT NULL,
  achieved_value INTEGER NOT NULL DEFAULT 0,
  percentage_achieved NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create alerts table
CREATE TABLE public.goal_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  goal_id UUID NOT NULL REFERENCES public.conversion_goals(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL DEFAULT 'below_threshold', -- below_threshold, goal_achieved, trend_warning
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.conversion_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goal_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goal_alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for conversion_goals
CREATE POLICY "Admins can manage goals" ON public.conversion_goals
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view active goals" ON public.conversion_goals
  FOR SELECT USING (is_active = true);

-- RLS Policies for goal_history
CREATE POLICY "Admins can manage goal history" ON public.goal_history
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view goal history" ON public.goal_history
  FOR SELECT USING (true);

-- RLS Policies for goal_alerts
CREATE POLICY "Admins can manage alerts" ON public.goal_alerts
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert default goals
INSERT INTO public.conversion_goals (name, description, goal_type, target_value, period) VALUES
  ('Tägliche Buchungen', 'Anzahl der Buchungen pro Tag', 'booking', 5, 'daily'),
  ('Wöchentliche Newsletter', 'Newsletter-Anmeldungen pro Woche', 'signup', 20, 'weekly'),
  ('Monatliche Gutscheine', 'Verkaufte Gutscheine pro Monat', 'gift_card', 15, 'monthly'),
  ('Tägliche Kontaktanfragen', 'Kontaktformular-Eingänge pro Tag', 'contact', 3, 'daily');

-- Create indexes
CREATE INDEX idx_goal_history_goal_id ON public.goal_history(goal_id);
CREATE INDEX idx_goal_alerts_goal_id ON public.goal_alerts(goal_id);
CREATE INDEX idx_goal_alerts_is_read ON public.goal_alerts(is_read);