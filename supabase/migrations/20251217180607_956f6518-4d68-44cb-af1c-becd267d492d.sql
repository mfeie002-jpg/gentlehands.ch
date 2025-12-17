-- Create table for massage training content
CREATE TABLE public.massage_trainings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  massage_type_id UUID REFERENCES public.massage_types(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  video_url TEXT,
  step_by_step_guide JSONB DEFAULT '[]'::jsonb,
  duration_minutes INTEGER DEFAULT 30,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create table for training quizzes
CREATE TABLE public.training_quizzes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  training_id UUID REFERENCES public.massage_trainings(id) ON DELETE CASCADE NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer INTEGER NOT NULL,
  explanation TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create table for therapist certifications
CREATE TABLE public.therapist_certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  therapist_id UUID REFERENCES public.therapists(id) ON DELETE CASCADE NOT NULL,
  massage_type_id UUID REFERENCES public.massage_types(id) ON DELETE CASCADE NOT NULL,
  training_id UUID REFERENCES public.massage_trainings(id) ON DELETE SET NULL,
  quiz_score INTEGER,
  passed BOOLEAN DEFAULT false,
  attempts INTEGER DEFAULT 0,
  certified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(therapist_id, massage_type_id)
);

-- Enable RLS
ALTER TABLE public.massage_trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapist_certifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for massage_trainings
CREATE POLICY "Anyone can view active trainings"
ON public.massage_trainings FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage trainings"
ON public.massage_trainings FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for training_quizzes
CREATE POLICY "Authenticated users can view quizzes"
ON public.training_quizzes FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage quizzes"
ON public.training_quizzes FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for therapist_certifications
CREATE POLICY "Therapists can view own certifications"
ON public.therapist_certifications FOR SELECT
USING (
  therapist_id IN (
    SELECT id FROM public.therapists WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Therapists can manage own certifications"
ON public.therapist_certifications FOR ALL
USING (
  therapist_id IN (
    SELECT id FROM public.therapists WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage all certifications"
ON public.therapist_certifications FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add realtime for certifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.therapist_certifications;