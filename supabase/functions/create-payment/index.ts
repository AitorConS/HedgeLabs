import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount = 29900, customerData } = await req.json();
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase configuration');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    console.log("Creating order with customer data for amount:", amount);

    // First, save customer order data to database
    const { data: customerOrder, error: customerError } = await supabase
      .from('customer_orders')
      .insert({
        email: customerData.email,
        first_name: customerData.firstName,
        last_name: customerData.lastName,
        phone: customerData.phone || null,
        address_line1: customerData.addressLine1,
        address_line2: customerData.addressLine2 || null,
        city: customerData.city,
        state: customerData.state || null,
        postal_code: customerData.postalCode,
        country: customerData.country,
        amount: amount,
        currency: 'usd',
        status: 'pending'
      })
      .select()
      .single();

    if (customerError) {
      console.error('Error saving customer data:', customerError);
      throw new Error('Failed to save customer data');
    }

    console.log("Customer order saved with ID:", customerOrder.id);

    const origin = req.headers.get("origin") || "http://localhost:3000";

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: customerData.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'NEXUS Pre-order',
              description: `Envío a: ${customerData.addressLine1}, ${customerData.city}, ${customerData.country}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment', 
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      metadata: {
        customer_order_id: customerOrder.id,
      },
    });

    console.log("Stripe session created successfully:", session.id);

    // Update customer order with Stripe session ID
    await supabase
      .from('customer_orders')
      .update({ stripe_session_id: session.id })
      .eq('id', customerOrder.id);

    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating payment session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});