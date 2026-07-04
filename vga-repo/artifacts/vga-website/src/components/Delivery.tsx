import { Truck, MapPin, ShieldCheck, Clock } from "lucide-react";

export function Delivery() {
  const points = [
    {
      icon: Clock,
      title: "On-time Delivery",
      desc: "Coordinated schedules to keep your project moving."
    },
    {
      icon: MapPin,
      title: "Direct Site Delivery",
      desc: "Materials dropped exactly where your team needs them."
    },
    {
      icon: ShieldCheck,
      title: "Transparent Pricing",
      desc: "Clear transportation charges communicated upfront."
    },
    {
      icon: Truck,
      title: "Pan-Chennai Coverage",
      desc: "Serving construction sites across the greater Chennai region."
    }
  ];

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6 text-foreground">Delivered To Your Site.</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Logistics should never delay a build. We handle the heavy lifting, ensuring your materials arrive safely and precisely when scheduled.
              <br /><br />
              Transportation charges vary based on location and quantity. Charges will be communicated transparently before any order confirmation. Materials are delivered directly to project locations across Chennai and surrounding areas.
            </p>
          </div>
          
          <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
            {points.map((point, i) => (
              <div key={i} className="p-6 rounded-2xl bg-accent/50 border border-border/50">
                <point.icon className="text-primary mb-4" size={28} strokeWidth={1.5} />
                <h4 className="text-lg font-medium text-foreground mb-2">{point.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}