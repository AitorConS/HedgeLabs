import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const StickyNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-tech' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="font-tech text-xl font-bold tracking-wider text-foreground">
            HedgeLabs
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="font-tech text-sm tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection('info')}
              className="font-tech text-sm tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              PRODUCT
            </button>
            <button
              onClick={() => scrollToSection('preorder')}
              className="font-tech text-sm tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              PRE-ORDER
            </button>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={() => scrollToSection('preorder')}
            className="bg-foreground text-primary-foreground hover:bg-tech-accent font-tech text-xs tracking-widest px-6"
          >
            ORDER NOW
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default StickyNav;