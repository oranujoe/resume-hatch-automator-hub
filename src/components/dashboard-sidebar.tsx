
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Home, 
  FileSearch, 
  Briefcase, 
  FileText, 
  BookOpen, 
  LayoutDashboard, 
  CalendarClock, 
  Users, 
  Settings, 
  User, 
  HelpCircle, 
  Menu, 
  X,
  ChevronRight,
  CreditCard,
  Bell,
  Shield,
  Wrench,
  MessageCircle,
  FileQuestion,
  Laptop,
  ImageUp,
  Newspaper,
  FileBox,
  GanttChartSquare,
  BarChart,
  Clock
} from "lucide-react";
import { NestedSidebarItem } from "./nested-sidebar-item";

interface SidebarProps {
  className?: string;
}

export function DashboardSidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && window.innerWidth >= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define sidebar navigation with nested structure
  const sidebarItems = [
    { 
      icon: Home, 
      label: "Home", 
      href: "/dashboard"
    },
    { 
      icon: FileSearch, 
      label: "Job Parser", 
      subItems: [
        { icon: FileSearch, label: "Parse & Apply", href: "/job-parser" },
        { icon: Laptop, label: "Drop-zone (Chrome)", href: "/job-parser/dropzone" },
        { icon: Clock, label: "Bulk Queue", href: "/job-parser/bulk-queue" }
      ]
    },
    { 
      icon: Briefcase, 
      label: "Applications", 
      subItems: [
        { icon: Briefcase, label: "My Applications", href: "/applications" },
        { icon: BarChart, label: "Analytics", href: "/applications/analytics" },
        { icon: GanttChartSquare, label: "Funnel View", href: "/applications/funnel" }
      ]
    },
    { 
      icon: FileText, 
      label: "Documents", 
      subItems: [
        { icon: FileText, label: "Résumés", href: "/documents/resumes" },
        { icon: Newspaper, label: "Cover Letters", href: "/documents/cover-letters" },
        { icon: ImageUp, label: "Templates Gallery", href: "/documents/templates" },
        { icon: FileBox, label: "Document Locker", href: "/documents/locker" }
      ]
    },
    { 
      icon: BookOpen, 
      label: "Knowledge Base", 
      subItems: [
        { icon: User, label: "Profile Data", href: "/knowledge-base" },
        { icon: BookOpen, label: "Skills Gap", href: "/knowledge-base/skills-gap" }
      ]
    },
    { 
      icon: LayoutDashboard, 
      label: "Job Feed", 
      href: "/job-feed" 
    },
    { 
      icon: CalendarClock, 
      label: "Interview Prep",
      subItems: [
        { icon: MessageCircle, label: "AI Coach", href: "/interview-prep" },
        { icon: CalendarClock, label: "Scheduler", href: "/interview-prep/scheduler" },
        { icon: Bell, label: "Follow-Ups", href: "/interview-prep/follow-ups" }
      ] 
    },
    { 
      icon: Users, 
      label: "Referrals", 
      href: "/referrals" 
    },
    { 
      icon: Settings, 
      label: "Settings", 
      subItems: [
        { icon: Shield, label: "Account Security", href: "/settings" },
        { icon: CreditCard, label: "Wallet & Billing", href: "/settings/wallet" },
        { icon: Bell, label: "Notifications", href: "/settings/notifications" },
        { icon: Wrench, label: "Integrations", href: "/settings/integrations" }
      ]
    },
    { 
      icon: User, 
      label: "Profile", 
      href: "/profile" 
    },
    { 
      icon: HelpCircle, 
      label: "Help",
      subItems: [
        { icon: FileQuestion, label: "Docs / FAQ", href: "/help" },
        { icon: MessageCircle, label: "Live Chat", href: "/help/chat" }
      ] 
    },
  ];

  if (isMobile) {
    return (
      <>
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed left-4 top-4 z-50 md:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open sidebar</span>
        </Button>
        
        <div className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-all duration-200",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
          <div className={cn(
            "fixed inset-y-0 left-0 z-50 w-72 bg-background border-r p-4 shadow-lg transition-transform duration-200 flex flex-col",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}>
            <div className="flex items-center justify-between mb-4">
              <Logo />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileOpen(false)}
              >
                <X size={20} />
                <span className="sr-only">Close sidebar</span>
              </Button>
            </div>
            <nav className="flex-1 overflow-y-auto">
              {sidebarItems.map((item) => (
                <NestedSidebarItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  href={item.href || "#"}
                  subItems={item.subItems}
                  collapsed={false}
                />
              ))}
            </nav>
            <div className="pt-4 border-t">
              <div className="text-xs text-muted-foreground">Version 1.0</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={cn(
      "flex-shrink-0 h-screen sticky top-0 border-r overflow-y-auto bg-white dark:bg-slate-900",
      collapsed ? "w-[72px]" : "w-[260px]",
      className
    )}>
      <div className="flex h-full flex-col gap-2 p-2">
        <div className={cn(
          "flex h-14 items-center justify-between px-4",
          collapsed && "justify-center px-0"
        )}>
          <Logo showText={!collapsed} />
          {!collapsed && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setCollapsed(true)}
            >
              <ChevronRight size={16} />
              <span className="sr-only">Collapse</span>
            </Button>
          )}
        </div>
        
        <div className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            {sidebarItems.map((item) => (
              <NestedSidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                href={item.href || "#"}
                subItems={item.subItems}
                collapsed={collapsed}
              />
            ))}
          </nav>
        </div>
        
        {!collapsed && (
          <div className="mt-auto border-t pt-4">
            <div className="text-xs text-muted-foreground px-4">Version 1.0</div>
          </div>
        )}
      </div>
    </div>
  );
}
