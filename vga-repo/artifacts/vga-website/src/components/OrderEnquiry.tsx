import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Info, Trash2, Plus, Minus, ShoppingBasket } from "lucide-react";
import { useOrder } from "@/context/OrderContext";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Enter a valid phone number"),
  location: z.string().min(5, "Delivery location is required"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

function getApiBaseUrl() {
  const configured = import.meta.env.VITE_API_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }

  return "/api";
}

export function OrderEnquiry() {
  const { toast } = useToast();
  const { items, removeItem, updateQty, clearOrder, totalCount } = useOrder();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", location: "", notes: "" },
  });

  async function onSubmit(data: FormValues) {
    try {
      const payload = {
        name: data.name,
        phone: data.phone,
        location: data.location,
        notes: data.notes || "",
        items: items.map((item) => ({
          name: item.name,
          category: item.category,
          quantity: item.quantity,
          unit: item.unit,
        })),
      };

      const apiBaseUrl = getApiBaseUrl();
      const res = await fetch(`${apiBaseUrl}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        const message =
          errorBody?.error || errorBody?.message || "Server error while submitting enquiry.";
        throw new Error(message);
      }

      toast({
        title: "Enquiry Sent Successfully",
        description: "Our team will contact you with pricing and delivery details.",
      });
      form.reset();
      clearOrder();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Please call us directly at +91 93811 42729.";
      toast({
        title: "Something went wrong",
        description: message,
        variant: "destructive",
      });
    }
  }

  return (
    <section id="enquiry" className="py-24 bg-accent/20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4 text-foreground">
              Place an Enquiry
            </h2>
            <p className="text-muted-foreground text-lg font-light">
              Add materials from our catalogue, then fill in your details below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* Left — Order Basket */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-2xl p-6 h-full">
                <div className="flex items-center gap-2 mb-5">
                  <ShoppingBasket size={18} className="text-primary" />
                  <h3 className="font-semibold text-foreground">Your Order</h3>
                  {totalCount > 0 && (
                    <span className="ml-auto text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {totalCount}
                    </span>
                  )}
                </div>

                <AnimatePresence>
                  {totalCount === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-10"
                    >
                      <ShoppingBasket size={32} className="text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground font-light">
                        No items added yet.
                      </p>
                      <a
                        href="#products"
                        className="text-sm text-primary font-medium hover:underline mt-1 inline-block"
                      >
                        Browse Products →
                      </a>
                    </motion.div>
                  ) : (
                    <div className="space-y-3">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 12 }}
                          className="flex items-start gap-3 p-3 bg-accent/30 rounded-xl"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-primary font-medium">{item.brand}</p>
                            <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">per {item.unit}</p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => updateQty(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center hover:bg-accent transition-colors"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQty(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center hover:bg-accent transition-colors"
                            >
                              <Plus size={10} />
                            </button>
                            <div className="relative group ml-1">
                              <button
                                onClick={() => removeItem(item.id)}
                                className="w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground transition-all duration-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                              >
                                <Trash2 size={10} />
                              </button>
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-foreground text-background text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                                Remove item
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right — Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Ramesh Kumar" className="h-11 bg-background" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 9876543210" className="h-11 bg-background" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Site address or area in Chennai" className="h-11 bg-background" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Brand preferences, grades, delivery timing, or anything else..."
                              className="resize-none h-24 bg-background"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex items-start gap-3">
                      <Info className="text-primary mt-0.5 shrink-0" size={18} />
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Our team will contact you with pricing and delivery details.{" "}
                        <strong className="font-medium text-foreground">No payment required at this stage.</strong>
                      </p>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      data-testid="button-submit-enquiry"
                      className="w-full h-12 text-base rounded-full"
                    >
                      Send Enquiry
                      {totalCount > 0 && (
                        <span className="ml-2 bg-white/20 text-white text-xs rounded-full px-2 py-0.5">
                          {totalCount} item{totalCount > 1 ? "s" : ""}
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
