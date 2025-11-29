import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import ShippingForm from './ShippingForm';

interface ShippingData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const PreorderSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(29900);

  const handlePreorder = async (amount: number) => {
    setSelectedAmount(amount);
    setShowShippingForm(true);
  };

  const handleShippingSubmit = async (customerData: ShippingData) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { 
          amount: selectedAmount,
          customerData: customerData
        }
      });

      if (error) throw error;

      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
      
      toast.success('Redirecting to payment...');
      
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWaitlistSignup = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    // For waitlist, we'll show the shipping form with pre-filled email
    setShowShippingForm(true);
  };

  // If showing shipping form, render it instead
  if (showShippingForm) {
    return (
      <section className="py-32 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => setShowShippingForm(false)}
              className="mb-4"
            >
              ← Back
            </Button>
          </div>
          <ShippingForm 
            amount={selectedAmount}
            onSubmit={handleShippingSubmit}
            isLoading={isLoading}
          />
        </div>
      </section>
    );
  }

  const pricingTiers = [
    {
      name: "EARLY BIRD",
      price: "299",
      originalPrice: "399",
      description: "Limited time pre-order offer",
      features: [
        "NEXUS mounting kit",
        "Priority shipping",
        "1-year warranty",
      ],
      popular: true
    }
  ];

  return (
    <section className="py-32 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="font-tech text-sm tracking-[0.3em] text-muted-foreground">
            PRE-ORDER NOW
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-4 mb-8 text-foreground">
            Secure Your NEXUS
          </h2>
          <p className="font-display text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join the exclusive pre-order list and be among the first to experience 
            the future of minimalist technology.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1  gap-8 mb-16  mx-auto">
          {pricingTiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`p-8 relative w-1/2 mx-auto ${
                tier.popular 
                  ? 'border-2 border-foreground shadow-tech bg-card' 
                  : 'border border-border bg-card'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-foreground text-primary-foreground px-4 py-1 text-xs font-tech tracking-widest">
                    RECOMMENDED
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="font-tech text-lg tracking-wider text-foreground mb-2">
                  {tier.name}
                </h3>
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <span className="font-display text-4xl font-bold text-foreground">
                    ${tier.price}
                  </span>
                  {tier.originalPrice && (
                    <span className="font-display text-xl text-muted-foreground line-through">
                      ${tier.originalPrice}
                    </span>
                  )}
                </div>
                <p className="font-display text-sm text-muted-foreground">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-foreground rounded-full mr-3" />
                    <span className="font-display text-sm text-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full font-tech tracking-wider ${
                  tier.popular 
                    ? 'bg-foreground text-primary-foreground hover:bg-tech-accent' 
                    : 'bg-secondary text-secondary-foreground hover:bg-muted'
                }`}
                onClick={() => handlePreorder(parseInt(tier.price) * 100)}
                disabled={isLoading}
              >
                {isLoading ? 'PROCESSING...' : 'PRE-ORDER NOW'}
              </Button>
            </Card>
          ))}
        </div>  

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {[
            { number: "100%", label: "Quality" },
            { number: "1yr", label: "Warranty" },
            { number: "30d", label: "Returns" }
          ].map((stat, index) => (
            <div key={index}>
              <div className="font-tech text-2xl font-bold text-foreground mb-1">
                {stat.number}
              </div>
              <div className="font-display text-sm text-muted-foreground tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreorderSection;