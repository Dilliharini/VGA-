import { motion } from "framer-motion";

const BRANDS = [
  { name: "ARS TMT", category: "TMT Steel" },
  { name: "UltraTech", category: "Cement" },
  { name: "Chettinad", category: "Cement" },
  { name: "Maha", category: "Cement" },
  { name: "Asian Paints", category: "Paints" },
  { name: "JSW", category: "Steel & Roofing" },
  { name: "TATA", category: "Roof Sheets" },
];

const DOUBLED = [...BRANDS, ...BRANDS];

export function BrandsStrip() {
  return (
    <section className="py-10 border-y border-border/60 bg-accent/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-6">
        <p className="text-center text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Brands We Carry
        </p>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-5 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 22,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {DOUBLED.map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-center justify-center px-7 py-4 bg-background rounded-2xl border border-border/80 shadow-sm min-w-[140px] group hover:border-primary/30 hover:shadow-md transition-all duration-200"
            >
              <span className="text-base font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-200">
                {brand.name}
              </span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mt-1">
                {brand.category}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-accent/30 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-accent/30 to-transparent z-10" />
      </div>
    </section>
  );
}
