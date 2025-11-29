import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Optional: You could verify the payment with Stripe here
    console.log('Payment successful for session:', sessionId);
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="font-tech text-2xl font-bold text-foreground mb-4">
          PAYMENT SUCCESSFUL
        </h1>
        
        <p className="font-display text-muted-foreground mb-6">
          Thank you for your purchase! Your NEXUS pre-order has been confirmed.
        </p>
        
        <div className="space-y-2 mb-8 text-sm text-muted-foreground">
          <p>You will receive a confirmation email shortly.</p>
          <p>Expected delivery: Q2 2024</p>
          {sessionId && (
            <p className="font-mono text-xs">Order ID: {sessionId.slice(-8)}</p>
          )}
        </div>
        
        <Button 
          onClick={() => window.location.href = '/'}
          className="w-full font-tech tracking-wider"
        >
          RETURN TO HOME
        </Button>
      </Card>
    </div>
  );
};

export default PaymentSuccess;