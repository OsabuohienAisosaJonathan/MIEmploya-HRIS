import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Verified from "@/pages/Verified";
import Templates from "@/pages/Templates";
import Videos from "@/pages/Videos";
import Jobs from "@/pages/Jobs";
import JobDetail from "@/pages/JobDetail";
import NewsDetail from "@/pages/NewsDetail";
import TrainingRegistration from "@/pages/TrainingRegistration";
import Admin from "@/pages/Admin";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { FloatingTrainingButton } from "@/components/FloatingTrainingButton";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/videos" component={Videos} />
        <Route path="/contact" component={Contact} />
        <Route path="/verified" component={Verified} />
        <Route path="/templates" component={Templates} />
        <Route path="/jobs" component={Jobs} />
        <Route path="/jobs/:id" component={JobDetail} />
        <Route path="/news/:id" component={NewsDetail} />
        <Route path="/training" component={TrainingRegistration} />
        <Route path="/admin/*?" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
          <WhatsAppButton />
          <FloatingTrainingButton />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
