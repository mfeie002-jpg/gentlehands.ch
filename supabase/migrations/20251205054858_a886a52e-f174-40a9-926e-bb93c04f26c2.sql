-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_number TEXT NOT NULL UNIQUE,
  masseur TEXT NOT NULL,
  theme TEXT NOT NULL,
  massage TEXT NOT NULL,
  duration TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  preferred_contact TEXT DEFAULT 'email',
  music_preference TEXT DEFAULT 'normal',
  conversation_preference TEXT DEFAULT 'spontan',
  intensity_preference TEXT DEFAULT 'mittel',
  avoid_areas TEXT,
  intuitive BOOLEAN DEFAULT false,
  additional_notes TEXT,
  newsletter_consent BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting bookings (public - no auth required for booking)
CREATE POLICY "Anyone can create a booking" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true);

-- Create policy for reading own bookings by booking number (for confirmation page)
CREATE POLICY "Anyone can read bookings by booking number" 
ON public.bookings 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_bookings_booking_number ON public.bookings(booking_number);
CREATE INDEX idx_bookings_email ON public.bookings(customer_email);