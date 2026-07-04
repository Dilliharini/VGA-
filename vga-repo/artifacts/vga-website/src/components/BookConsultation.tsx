import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays, Clock, MapPin, Phone, Mail, Building2 } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  companyName: z.string().optional(),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  meetingType: z.string().min(1, "Please select a meeting type"),
  projectLocation: z.string().min(3, "Project location is required"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const TIME_SLOTS = [
  "9:00 AM – 10:00 AM",
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "12:00 PM – 1:00 PM",
  "2:00 PM – 3:00 PM",
  "3:00 PM – 4:00 PM",
  "4:00 PM – 5:00 PM",
  "5:00 PM – 6:00 PM",
];

const MEETING_TYPES = [
  { value: "Site Visit", label: "Site Visit", desc: "We come to your project location" },
  { value: "Office Meeting", label: "Office Meeting", desc: "Meet at our Athipet, Chennai office" },
  { value: "Google Meet", label: "Google Meet", desc: "Video call — link sent on confirmation" },
  { value: "Phone Call", label: "Phone Call", desc: "Quick call at your preferred time" },
];

const WHY_ITEMS = [
  { icon: CalendarDays, text: "Flexible scheduling — weekdays & Saturdays" },
  { icon: MapPin, text: "We visit your project site across Chennai" },
  { icon: Phone, text: "Confirmed within 2 hours via WhatsApp" },
  { icon: Mail, text: "Detailed quote sent after the meeting" },
];

export function BookConsultation() {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      phone: "",
      email: "",
      preferredDate: "",
      preferredTime: "",
      meetingType: "",
      projectLocation: "",
      message: "",
    },
  });

  function onSubmit(_data: FormValues) {
    toast({
      title: "Meeting Request Sent!",
      description: "Our team will confirm your consultation within 2 hours via WhatsApp.",
    });
    form.reset();
  }

  return (
    <section id="consultation" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">
            Free Consultation
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">
            Book a Free Consultation
          </h2>
          <p className="text-muted-foreground font-light leading-relaxed">
            Speak with our materials expert — whether it's a site visit, office meeting, or a quick call.
            No obligation. We'll help you plan your project right.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left — Why meet us */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
              <h3 className="text-xl font-serif font-medium mb-2">Why consult with us?</h3>
              <p className="text-primary-foreground/70 text-sm font-light leading-relaxed mb-8">
                Get expert advice on materials, quantities, and budgeting — tailored to your specific project.
              </p>
              <div className="space-y-5">
                {WHY_ITEMS.map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={15} className="text-primary-foreground/80" />
                    </div>
                    <p className="text-sm text-primary-foreground/80 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border rounded-2xl p-6 bg-card">
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">Meeting Types</p>
              <div className="space-y-3">
                {MEETING_TYPES.map((mt) => (
                  <div key={mt.value} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{mt.label}</p>
                      <p className="text-xs text-muted-foreground font-light">{mt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-card border border-border rounded-2xl p-7 md:p-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Ramesh Kumar" className="h-11 bg-background" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1">
                            <Building2 size={13} className="text-muted-foreground" />
                            Company Name
                            <span className="text-muted-foreground font-normal text-xs">(optional)</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Kumar Constructions" className="h-11 bg-background" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 9876543210" className="h-11 bg-background" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" type="email" className="h-11 bg-background" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="preferredDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1">
                            <CalendarDays size={13} className="text-muted-foreground" />
                            Preferred Date *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              min={new Date().toISOString().split("T")[0]}
                              className="h-11 bg-background"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="preferredTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1">
                            <Clock size={13} className="text-muted-foreground" />
                            Preferred Time *
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 bg-background">
                                <SelectValue placeholder="Select time slot" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {TIME_SLOTS.map((slot) => (
                                <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="meetingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meeting Type *</FormLabel>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {MEETING_TYPES.map((mt) => (
                            <button
                              key={mt.value}
                              type="button"
                              data-testid={`button-meeting-${mt.value.toLowerCase().replace(" ", "-")}`}
                              onClick={() => field.onChange(mt.value)}
                              className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 text-left ${
                                field.value === mt.value
                                  ? "border-primary bg-primary/8 text-primary"
                                  : "border-border bg-background text-muted-foreground hover:border-primary/30"
                              }`}
                            >
                              {mt.label}
                            </button>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          <MapPin size={13} className="text-muted-foreground" />
                          Project Location *
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Area or full address of your project" className="h-11 bg-background" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message <span className="text-muted-foreground font-normal text-xs">(optional)</span></FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project, materials needed, or any specific questions..."
                            className="resize-none h-24 bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    data-testid="button-book-meeting"
                    className="w-full h-12 text-base rounded-full"
                  >
                    Book Meeting
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Free consultation — no commitment required. Confirmation via WhatsApp within 2 hours.
                  </p>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
