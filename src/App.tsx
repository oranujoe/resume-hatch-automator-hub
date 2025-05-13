
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/dashboard-layout";
import { HomePage } from "./pages/home";
import { JobParserPage } from "./pages/job-parser";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/job-parser" element={<JobParserPage />} />
            <Route path="/applications" element={<div>Applications</div>} />
            <Route path="/documents" element={<div>Documents</div>} />
            <Route path="/knowledge-base" element={<div>Knowledge Base</div>} />
            <Route path="/job-feed" element={<div>Job Feed</div>} />
            <Route path="/interview-prep" element={<div>Interview Prep</div>} />
            <Route path="/referrals" element={<div>Referrals</div>} />
            <Route path="/settings" element={<div>Settings</div>} />
            <Route path="/profile" element={<div>Profile</div>} />
            <Route path="/help" element={<div>Help</div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
