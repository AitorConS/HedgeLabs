import { Card } from '@/components/ui/card';

const ProductInfo = () => {
  const features = [
    {
      title: "MINIMAL DESIGN",
      description: "Pure aesthetics meets functional perfection. Every element serves a purpose.",
      number: "01"
    },
    {
      title: "ADVANCED TECH",
      description: "Revolutionary engineering hidden beneath the seamless exterior.",
      number: "02"
    },
    {
      title: "PREMIUM MATERIALS",
      description: "Crafted from the finest materials for lasting durability and elegance.",
      number: "03"
    },
    {
      title: "PRECISION ENGINEERED",
      description: "Meticulously designed with attention to every micro-detail.",
      number: "04"
    }
  ];

  return (
    <section className="py-32 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="font-tech text-sm tracking-[0.3em] text-muted-foreground">
            PRODUCT OVERVIEW
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-4 mb-8 text-foreground">
            Engineered for Excellence
          </h2>
          <p className="font-display text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the perfect synthesis of form and function. NEXUS represents 
            the first of a long list of future minimalist robotic products
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 border border-border hover:shadow-tech transition-all duration-500 group">
              <div className="flex items-start space-x-6">
                <span className="font-tech text-3xl font-bold text-tech-accent group-hover:text-foreground transition-colors">
                  {feature.number}
                </span>
                <div>
                  <h3 className="font-tech text-xl font-semibold mb-3 tracking-wider text-foreground">
                    {feature.title}
                  </h3>
                  <p className="font-display text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tech Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-tech text-sm tracking-[0.3em] text-muted-foreground">
              SPECIFICATIONS
            </span>
            <h3 className="font-display text-3xl font-bold mt-4 mb-8 text-foreground">
              Technical Excellence
            </h3>
            
            <div className="space-y-6">
              {[
                { label: "Material", value: "Resine" },
                { label: "Finish", value: "Matte black" },
                { label: "Connectivity", value: "USB-C" },
                { label: "Microcontroller", value: "ATmega32U4" }
              ].map((spec, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-border">
                  <span className="font-tech text-sm tracking-wider text-muted-foreground">
                    {spec.label}
                  </span>
                  <span className="font-display font-medium text-foreground">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
            <img 
              src="/box-1.png" 
              alt="Material included"
              className='max-h-96 mx-auto object-cover' />
          </div>

          <div className="relative">
            <div className="aspect-square  bg-gradient-tech rounded-lg p-6 shadow-glow">
              <div className="w-full h-full  rounded-xl flex items-center justify-center">
                <img
                      src="/main-ezgif.com-optimize.gif"
                      alt="Nexus robot"
                      className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;