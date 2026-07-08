import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoPath from "@assets/logo_1782735519460.jpeg";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Products", id: "products" },
    { name: "Gallery", id: "gallery" },
    { name: "About", id: "about" },
    { name: "Book a Meeting", id: "consultation" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-3 border-b border-border/50"
          : "bg-background/50 backdrop-blur-sm py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => scrollTo("home")}
        >
          <img 
            src={logoPath} 
            alt="Vallaba Ganapathy Associates" 
            className="h-10 w-auto object-contain rounded-sm"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-serif font-semibold text-base sm:text-lg tracking-tight text-foreground">
              VGA
            </span>
            <span className="text-[8px] sm:text-[10px] font-medium tracking-wide text-muted-foreground uppercase whitespace-nowrap">
              Vallaba Ganapathy Associates
            </span>
          </div>
          </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </button>
          ))}
          <Button onClick={() => scrollTo("enquiry")} className="ml-4 rounded-full px-6">
            Request Quote
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg py-4 px-4 flex flex-col gap-4 md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.id)}
              className="text-left text-lg font-medium py-2 text-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </button>
          ))}
          <Button onClick={() => scrollTo("enquiry")} className="w-full mt-2" size="lg">
            Request Quote
          </Button>
        </div>
      )}
    </header>
  );
}