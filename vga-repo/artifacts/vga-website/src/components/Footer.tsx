import logoPath from "@assets/logo_1782735519460.jpeg";

export function Footer() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-background py-16 border-t border-foreground/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6 bg-white w-fit p-2 rounded-md">
              <img 
                src={logoPath} 
                alt="Vallaba Ganapathy Associates" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-muted-foreground max-w-sm font-light leading-relaxed">
              Premium construction materials for residential, commercial, and industrial projects across Chennai. Built on trust, driven by quality.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-6 text-background tracking-wide">Quick Links</h4>
            <ul className="space-y-4">
              <li><button onClick={() => scrollTo("home")} className="text-muted-foreground hover:text-white transition-colors text-sm">Home</button></li>
              <li><button onClick={() => scrollTo("products")} className="text-muted-foreground hover:text-white transition-colors text-sm">Materials</button></li>
              <li><button onClick={() => scrollTo("gallery")} className="text-muted-foreground hover:text-white transition-colors text-sm">Gallery</button></li>
              <li><button onClick={() => scrollTo("about")} className="text-muted-foreground hover:text-white transition-colors text-sm">About Us</button></li>
              <li><button onClick={() => scrollTo("contact")} className="text-muted-foreground hover:text-white transition-colors text-sm">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-6 text-background tracking-wide">Contact</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>+91 93811 42729</li>
              <li>+91 98848 28002</li>
              <li className="break-all">ohmvallabaganapathy@gmail.com</li>
              <li className="leading-relaxed">No-129/2 Manthope Road,<br/>Athipet, Maduravoyal,<br/>Chennai – 600095</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Vallaba Ganapathy Associates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}