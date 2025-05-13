
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
            
            {/* Job Parser routes */}
            <Route path="/job-parser" element={<JobParserPage />} />
            <Route path="/job-parser/dropzone" element={<div>Drop-zone (Chrome Extension)</div>} />
            <Route path="/job-parser/bulk-queue" element={<div>Bulk Queue</div>} />
            
            {/* Applications routes */}
            <Route path="/applications" element={<div>My Applications</div>} />
            <Route path="/applications/analytics" element={<div>Applications Analytics</div>} />
            <Route path="/applications/funnel" element={<div>Applications Funnel View</div>} />
            
            {/* Documents routes */}
            <Route path="/documents/resumes" element={<div>Resumes</div>} />
            <Route path="/documents/cover-letters" element={<div>Cover Letters</div>} />
            <Route path="/documents/templates" element={<div>Templates Gallery</div>} />
            <Route path="/documents/locker" element={<div>Document Locker</div>} />
            
            {/* Knowledge Base routes */}
            <Route path="/knowledge-base" element={<div>Profile Data</div>} />
            <Route path="/knowledge-base/skills-gap" element={<div>Skills Gap</div>} />
            
            {/* Job Feed route */}
            <Route path="/job-feed" element={<div>Job Feed</div>} />
            
            {/* Interview Prep routes */}
            <Route path="/interview-prep" element={<div>AI Coach</div>} />
            <Route path="/interview-prep/scheduler" element={<div>Scheduler</div>} />
            <Route path="/interview-prep/follow-ups" element={<div>Follow-Ups</div>} />
            
            {/* Referrals route */}
            <Route path="/referrals" element={<div>Referrals</div>} />
            
            {/* Settings routes */}
            <Route path="/settings" element={<div>Account Security</div>} />
            <Route path="/settings/wallet" element={<div>Wallet & Billing</div>} />
            <Route path="/settings/notifications" element={<div>Notifications</div>} />
            <Route path="/settings/integrations" element={<div>Integrations</div>} />
            
            {/* Profile route */}
            <Route path="/profile" element={<div>Profile</div>} />
            
            {/* Help routes */}
            <Route path="/help" element={<div>Docs / FAQ</div>} />
            <Route path="/help/chat" element={<div>Live Chat</div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
