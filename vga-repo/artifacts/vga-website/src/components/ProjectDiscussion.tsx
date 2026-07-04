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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  projectType: z.string().min(1, "Please select a project type"),
  requirement: z.string().min(10, "Please briefly describe your requirement"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ProjectDiscussion() {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      projectType: "",
      requirement: "",
      message: "",
    },
  });

  function onSubmit(data: FormValues) {
    console.log(data);
    toast({
      title: "Project Details Received",
      description: "A VGA representative will call you shortly to discuss your project.",
    });
    form.reset();
  }

  return (
    <section id="discuss" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6 text-foreground">Discuss Your Project</h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Every major construction starts with a conversation. Whether you are planning a residential build or a large-scale industrial warehouse, our experts are ready to help you source the right materials at the right time.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center text-primary font-serif italic text-xl">1</div>
                <div>
                  <h4 className="font-medium text-foreground">Initial Consultation</h4>
                  <p className="text-sm text-muted-foreground">We understand your scale and timeline.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center text-primary font-serif italic text-xl">2</div>
                <div>
                  <h4 className="font-medium text-foreground">Material Sourcing</h4>
                  <p className="text-sm text-muted-foreground">We provide a comprehensive quote for your needs.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center text-primary font-serif italic text-xl">3</div>
                <div>
                  <h4 className="font-medium text-foreground">Scheduled Delivery</h4>
                  <p className="text-sm text-muted-foreground">Reliable logistics directly to your site.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full bg-card border border-border rounded-3xl p-8 shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="bg-background" {...field} />
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
                        <Input type="tel" placeholder="+91 xxxxx xxxxx" className="bg-background" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Residential">Residential</SelectItem>
                          <SelectItem value="Industrial">Industrial</SelectItem>
                          <SelectItem value="Commercial">Commercial</SelectItem>
                          <SelectItem value="Warehouse">Warehouse</SelectItem>
                          <SelectItem value="Steel Structure">Steel Structure</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requirement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material Requirement</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="e.g. Need TMT bars and cement for a 3-story building..." 
                          className="resize-none bg-background" 
                          {...field} 
                        />
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
                      <FormLabel>Additional Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any other details..." 
                          className="resize-none bg-background" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-12 mt-4 rounded-xl">
                  Discuss My Project
                </Button>
              </form>
            </Form>
          </div>

        </div>
      </div>
    </section>
  );
}