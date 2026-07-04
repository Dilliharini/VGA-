import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { FaWhatsapp } from "react-icons/fa";
import { OrderProvider } from "@/context/OrderContext";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919381142729"
      target="_blank"
      rel="noopener noreferrer"
      data-testid="button-whatsapp-float"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white rounded-full shadow-lg px-4 py-3 hover:bg-[#20ba57] transition-all duration-200 hover:shadow-xl group"
    >
      <FaWhatsapp size={24} />
      <span className="text-sm font-medium max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
        Chat with us
      </span>
    </a>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <OrderProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
            <WhatsAppButton />
          </TooltipProvider>
        </OrderProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;