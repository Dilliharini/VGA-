import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImg from "@assets/image_1782918154992.png";

export function Hero() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-accent/20"
    >
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16">
        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* 25+ Years badge */}
          <div className="inline-flex items-center gap-3 mb-5 px-4 py-3 rounded-2xl bg-primary shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-primary/80">
            <div className="text-right">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white leading-none">25+</span>
                <span className="text-sm font-medium text-white/90 leading-none">Years of Excellence</span>
              </div>
              <p className="text-[11px] text-white/55 font-light tracking-widest uppercase mt-1">
                Est. 2000
              </p>
            </div>
            <div className="w-px h-9 bg-white/20 mx-1" />
            <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#E6B96A" }}>
              Chennai
            </span>
          </div>

          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-sm font-medium tracking-wide">
            Building Materials Delivered To Your Site.
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-foreground leading-[1.1] mb-6">
            Your Trusted Iron &amp; Steel Partner{" "}
            <span className="text-foreground">for Every Construction Project</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed font-light">
            Premium steel, cement, paints, sand and construction materials
            delivered across Chennai. Your blueprint deserves the best
            foundation. Delivered to your site.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Button
              size="lg"
              data-testid="button-browse-products"
              className="rounded-full px-8 h-13 text-base"
              onClick={() => scrollTo("products")}
            >
              Browse Products
            </Button>
            <Button
              variant="outline"
              size="lg"
              data-testid="button-request-quote"
              className="rounded-full px-8 h-13 text-base border-border hover:bg-accent"
              onClick={() => scrollTo("enquiry")}
            >
              Request Quote
            </Button>
            <Button
              variant="ghost"
              size="lg"
              data-testid="button-contact-us"
              className="rounded-full px-8 h-13 text-base text-muted-foreground hover:text-foreground"
              onClick={() => scrollTo("contact")}
            >
              Contact Us
            </Button>
          </div>
        </motion.div>

        {/* Right — image */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          className="relative hidden lg:block"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
            <img
              src={heroImg}
              alt="Steel construction site at sunset — Vallaba Ganapathy Associates project"
              className="w-full h-[520px] object-cover"
              style={{ filter: "brightness(1.07) contrast(0.97)" }}
              width={700}
              height={520}
            />
            {/* Left-side soft white blend */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent pointer-events-none" />
            {/* Subtle caption badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <p className="text-sm text-foreground font-medium">
                Direct site delivery in Chennai
              </p>
              <span className="text-xs text-muted-foreground ml-auto">
                Confirmed pricing &amp; transport before dispatch
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
