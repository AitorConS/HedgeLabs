import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

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

interface ShippingFormProps {
  amount: number;
  onSubmit: (data: ShippingData) => void;
  isLoading: boolean;
}

const ShippingForm = ({ amount, onSubmit, isLoading }: ShippingFormProps) => {
  const [formData, setFormData] = useState<ShippingData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US'
  });

  const handleInputChange = (field: keyof ShippingData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields: (keyof ShippingData)[] = [
      'email', 'firstName', 'lastName', 'addressLine1', 'city', 'postalCode'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        toast.error(`Please complete the ${field} field`);
        return;
      }
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    onSubmit(formData);
  };

  const countries = [
    // Europe (GLS coverage)
    { code: 'AD', name: 'Andorra' },
    { code: 'AT', name: 'Austria' },
    { code: 'BE', name: 'Belgium' },
    { code: 'BG', name: 'Bulgaria' },
    { code: 'HR', name: 'Croatia' },
    { code: 'CY', name: 'Cyprus' },
    { code: 'CZ', name: 'Czech Republic' },
    { code: 'DK', name: 'Denmark' },
    { code: 'EE', name: 'Estonia' },
    { code: 'FI', name: 'Finland' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'GR', name: 'Greece' },
    { code: 'HU', name: 'Hungary' },
    { code: 'IS', name: 'Iceland' },
    { code: 'IE', name: 'Ireland' },
    { code: 'IT', name: 'Italy' },
    { code: 'LV', name: 'Latvia' },
    { code: 'LI', name: 'Liechtenstein' },
    { code: 'LT', name: 'Lithuania' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'MT', name: 'Malta' },
    { code: 'MC', name: 'Monaco' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'NO', name: 'Norway' },
    { code: 'PL', name: 'Poland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'RO', name: 'Romania' },
    { code: 'SM', name: 'San Marino' },
    { code: 'SK', name: 'Slovakia' },
    { code: 'SI', name: 'Slovenia' },
    { code: 'ES', name: 'Spain' },
    { code: 'SE', name: 'Sweden' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'VA', name: 'Vatican City' },
    
    // Americas (UPS coverage)
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'MX', name: 'Mexico' },
    { code: 'AR', name: 'Argentina' },
    { code: 'BR', name: 'Brazil' },
    { code: 'CL', name: 'Chile' },
    { code: 'CO', name: 'Colombia' },
    { code: 'CR', name: 'Costa Rica' },
    { code: 'DO', name: 'Dominican Republic' },
    { code: 'EC', name: 'Ecuador' },
    { code: 'SV', name: 'El Salvador' },
    { code: 'GT', name: 'Guatemala' },
    { code: 'HN', name: 'Honduras' },
    { code: 'JM', name: 'Jamaica' },
    { code: 'NI', name: 'Nicaragua' },
    { code: 'PA', name: 'Panama' },
    { code: 'PE', name: 'Peru' },
    { code: 'UY', name: 'Uruguay' },
    { code: 'VE', name: 'Venezuela' },
    
    // Asia Pacific (UPS coverage)
    { code: 'AU', name: 'Australia' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'JP', name: 'Japan' },
    { code: 'KR', name: 'South Korea' },
    { code: 'CN', name: 'China' },
    { code: 'HK', name: 'Hong Kong' },
    { code: 'SG', name: 'Singapore' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'TH', name: 'Thailand' },
    { code: 'PH', name: 'Philippines' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'VN', name: 'Vietnam' },
    { code: 'IN', name: 'India' },
    { code: 'TW', name: 'Taiwan' },
    { code: 'MO', name: 'Macau' },
    
    // Middle East & Africa (UPS coverage)
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'QA', name: 'Qatar' },
    { code: 'KW', name: 'Kuwait' },
    { code: 'BH', name: 'Bahrain' },
    { code: 'OM', name: 'Oman' },
    { code: 'IL', name: 'Israel' },
    { code: 'TR', name: 'Turkey' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'EG', name: 'Egypt' },
    { code: 'MA', name: 'Morocco' },
    { code: 'TN', name: 'Tunisia' },
    { code: 'KE', name: 'Kenya' },
    { code: 'GH', name: 'Ghana' },
    { code: 'NG', name: 'Nigeria' }
  ];

  return (
    <Card className="p-8 max-w-2xl mx-auto bg-card">
      <div className="text-center mb-8">
        <h3 className="font-tech text-2xl tracking-wider text-foreground mb-2">
          SHIPPING INFORMATION
        </h3>
        <p className="font-display text-muted-foreground">
          Complete your details to proceed with the order
        </p>
        <div className="mt-4 font-tech text-lg font-bold text-foreground">
          Total: ${(amount / 100).toFixed(2)}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div className="space-y-4">
          <h4 className="font-tech text-sm tracking-wider text-foreground border-b border-border pb-2">
            CONTACT INFORMATION
          </h4>
          
          <div>
            <Label htmlFor="email" className="font-display text-sm text-foreground">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1"
              placeholder="your@email.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="font-display text-sm text-foreground">
                First Name *
              </Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="mt-1"
                placeholder="John"
              />
            </div>
            
            <div>
              <Label htmlFor="lastName" className="font-display text-sm text-foreground">
                Last Name *
              </Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="mt-1"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="font-display text-sm text-foreground">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="mt-1"
              placeholder="+1 234 567 8900"
            />
          </div>
        </div>

        {/* Shipping Address */}
        <div className="space-y-4">
          <h4 className="font-tech text-sm tracking-wider text-foreground border-b border-border pb-2">
            SHIPPING ADDRESS
          </h4>
          
          <div>
            <Label htmlFor="addressLine1" className="font-display text-sm text-foreground">
              Address Line 1 *
            </Label>
            <Input
              id="addressLine1"
              type="text"
              value={formData.addressLine1}
              onChange={(e) => handleInputChange('addressLine1', e.target.value)}
              className="mt-1"
              placeholder="123 Main Street"
            />
          </div>

          <div>
            <Label htmlFor="addressLine2" className="font-display text-sm text-foreground">
              Address Line 2 (optional)
            </Label>
            <Input
              id="addressLine2"
              type="text"
              value={formData.addressLine2}
              onChange={(e) => handleInputChange('addressLine2', e.target.value)}
              className="mt-1"
              placeholder="Apt, suite, etc."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city" className="font-display text-sm text-foreground">
                City *
              </Label>
              <Input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="mt-1"
                placeholder="New York"
              />
            </div>
            
            <div>
              <Label htmlFor="state" className="font-display text-sm text-foreground">
                State/Province
              </Label>
              <Input
                id="state"
                type="text"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="mt-1"
                placeholder="NY"
              />
            </div>

            <div>
              <Label htmlFor="postalCode" className="font-display text-sm text-foreground">
                Postal Code *
              </Label>
              <Input
                id="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                className="mt-1"
                placeholder="10001"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="country" className="font-display text-sm text-foreground">
              Country *
            </Label>
            <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          type="submit"
          className="w-full font-tech tracking-wider bg-foreground text-primary-foreground hover:bg-tech-accent"
          disabled={isLoading}
        >
          {isLoading ? 'PROCESSING...' : 'CONTINUE TO PAYMENT'}
        </Button>
      </form>
    </Card>
  );
};

export default ShippingForm;