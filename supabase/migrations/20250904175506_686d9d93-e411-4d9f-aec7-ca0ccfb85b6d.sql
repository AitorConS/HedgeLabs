-- Fix critical security vulnerability: Restrict access to customer_orders table
-- Remove overly permissive policies that allow public access to sensitive customer data
DROP POLICY IF EXISTS "Anyone can select customer orders" ON public.customer_orders;
DROP POLICY IF EXISTS "Anyone can update customer orders" ON public.customer_orders;

-- Create secure policies that only allow edge functions to access customer data
-- Edge functions use service role key, bypassing RLS for legitimate operations
CREATE POLICY "Edge functions can select customer orders" ON public.customer_orders
FOR SELECT
USING (false); -- No direct user access, only service role

CREATE POLICY "Edge functions can update customer orders" ON public.customer_orders  
FOR UPDATE
USING (false); -- No direct user access, only service role

-- Keep insert policy as it's needed for the checkout process
-- But ensure it's only accessible through proper channels