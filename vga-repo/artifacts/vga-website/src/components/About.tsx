import { motion } from "framer-motion";
import { ShieldCheck, Truck, BadgeDollarSign, Headset, ClipboardList, Handshake } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Quality Materials",
    description:
      "Sourced from leading brands and verified suppliers — Tata, JSW, UltraTech, Ramco, Asian Paints and more.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description:
      "Direct-to-site delivery across Chennai and nearby areas with confirmed schedules.",
  },
  {
    icon: BadgeDollarSign,
    title: "Competitive Pricing",
    description:
      "Transparent quotations with no hidden charges. Confirmed before dispatch.",
  },
  {
    icon: Headset,
    title: "Customer Support",
    description:
      "Personalised assistance over phone and WhatsApp throughout your order.",
  },
  {
    icon: ClipboardList,
    title: "Project Assistance",
    description:
      "Bulk order discounts, BOQ matching and material recommendations for large projects.",
  },
  {
    icon: Handshake,
    title: "Trusted Partner",
    description:
      "Long-term relationships with builders, contractors and industrial buyers in Chennai.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">
            About Vallaba Ganapathy Associates
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            We are more than a supplier — we are your project partner. VGA has built
            its reputation on uncompromising quality and absolute reliability,
            serving residential and industrial projects across Chennai.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-accent/30 border border-border rounded-2xl p-7 hover:shadow-md transition-shadow duration-300"
              >
                <div className="mb-4 w-10 h-10 flex items-center justify-center rounded-xl bg-primary/8 border border-primary/12">
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.6} />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
