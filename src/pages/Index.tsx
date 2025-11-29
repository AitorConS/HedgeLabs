import { Suspense } from 'react';
import StickyNav from '@/components/StickyNav';
import ProductHero3D from '@/components/ProductHero3D';
import ProductInfo from '@/components/ProductInfo';
import PreorderSection from '@/components/PreorderSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StickyNav />
      
      {/* Hero Section with 3D */}
      <section id="hero" className="relative">
        <Suspense fallback={
          <div className="h-screen flex items-center justify-center">
            <div className="font-tech text-sm tracking-widest text-muted-foreground animate-pulse">
              LOADING NEXUS...
            </div>
          </div>
        }>
          <ProductHero3D />
        </Suspense>
      </section>

      {/* Product Information */}
      <section id="info">
        <ProductInfo />
      </section>

      {/* Pre-order Section */}
      <section id="preorder">
        <PreorderSection />
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="font-tech text-xl font-bold tracking-wider text-foreground mb-4 md:mb-0">
              NEXUS
            </div>
            <div className="flex items-center space-x-8">
              <span className="font-tech text-xs tracking-widest text-muted-foreground">
                © 2024 NEXUS. ALL RIGHTS RESERVED.
              </span>
              <div className="flex space-x-4">
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
