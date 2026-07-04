import { MapPin, Phone, Mail, ShieldCheck } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-3 text-foreground">Get In Touch</h2>
          <p className="text-sm font-medium text-primary mb-3 tracking-wide">
            Dealers in Iron &amp; Steel for Housing and Industrial needs
          </p>
          <p className="text-muted-foreground text-lg">
            Ready to start your project? Reach out to our team for detailed pricing, material specifications, and delivery coordination.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
          <div className="lg:w-1/3 space-y-8">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-accent text-primary flex items-center justify-center shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Call Us</h4>
                <p className="text-muted-foreground">+91 93811 42729</p>
                <p className="text-muted-foreground">+91 98848 28002</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-accent text-primary flex items-center justify-center shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Email Us</h4>
                <p className="text-muted-foreground break-all">ohmvallabaganapathy@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-accent text-primary flex items-center justify-center shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Office Address</h4>
                <p className="text-muted-foreground leading-relaxed">
                  No-129/2 Manthope Road, Athipet,<br />
                  Maduravoyal (PO), Ambattur TK,<br />
                  Chennai – 600095
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-accent text-primary flex items-center justify-center shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">GSTIN</h4>
                <p className="text-muted-foreground font-mono tracking-wide text-sm">33AAPFV2831F1Z6</p>
              </div>
            </div>

            <div className="pt-6 flex flex-col gap-3">
              <Button 
                className="w-full h-12 bg-[#25D366] hover:bg-[#1DA851] text-white flex items-center gap-2"
                onClick={() => window.open('https://wa.me/919381142729', '_blank')}
              >
                <FaWhatsapp size={20} />
                Message on WhatsApp
              </Button>
              <Button 
                variant="outline" 
                className="w-full h-12 flex items-center gap-2"
                onClick={() => window.location.href = 'tel:+919381142729'}
              >
                <Phone size={18} />
                Call Now
              </Button>
            </div>
          </div>

          <div className="lg:w-2/3 h-[400px] lg:h-auto rounded-2xl overflow-hidden border border-border shadow-sm">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.43851509172!2d80.15814041482312!3d13.06737529079361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52614b8a4f6d4b%3A0x6b4f7e2c9a9b8b0!2sManthope%20Rd%2C%20Athipet%2C%20Ambattur%20Industrial%20Estate%2C%20Chennai%2C%20Tamil%20Nadu%20600058!5e0!3m2!1sen!2sin!4v1689252044812!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="VGA Office Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}