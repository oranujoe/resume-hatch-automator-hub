
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "./dashboard-sidebar";
import { Topbar } from "./topbar";
import { ThemeProvider } from "./theme-provider";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider defaultTheme="light">
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex flex-col flex-1">
          <Topbar 
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
