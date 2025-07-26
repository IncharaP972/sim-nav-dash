import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Simulation from "./pages/Simulation";
import MapRoute from "./pages/MapRoute";
import Alerts from "./pages/Alerts";
import Summary from "./pages/Summary";
import BottleneckPrediction from "./pages/BottleneckPrediction";
import AIHelp from "./pages/AIHelp";
import LostAndFound from "./pages/LostAndFound";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-14 flex items-center border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <SidebarTrigger className="ml-4" />
                <div className="flex-1" />
              </header>
              <main className="flex-1 overflow-auto">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/simulation" element={<Simulation />} />
                  <Route path="/maproute" element={<MapRoute />} />
                  <Route path="/alerts" element={<Alerts />} />
                  <Route path="/summary" element={<Summary />} />
                  <Route path="/bottleneck-prediction" element={<BottleneckPrediction />} />
                  <Route path="/ai-help" element={<AIHelp />} />
                  <Route path="/lost-and-found" element={<LostAndFound />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
