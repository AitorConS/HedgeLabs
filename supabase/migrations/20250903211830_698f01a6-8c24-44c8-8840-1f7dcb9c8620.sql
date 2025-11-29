-- Create customer_orders table to store shipping and customer information
CREATE TABLE public.customer_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'ES',
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  stripe_session_id TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.customer_orders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can insert customer orders" ON public.customer_orders
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update customer orders" ON public.customer_orders
  FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can select customer orders" ON public.customer_orders
  FOR SELECT
  USING (true);

-- Create trigger for automatic updated_at
CREATE TRIGGER update_customer_orders_updated_at
  BEFORE UPDATE ON public.customer_orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();