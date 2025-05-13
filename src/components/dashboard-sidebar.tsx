
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
  ChevronRight, 
  Menu, 
  X
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  collapsed?: boolean;
}

export const SidebarItem = ({ 
  icon: Icon, 
  label, 
  href,
  collapsed = false 
}: SidebarItemProps) => {
  return (
    <NavLink 
      to={href} 
      className={({ isActive }) => cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent/50",
        isActive ? "text-primary font-medium bg-accent/50" : "text-muted-foreground",
        collapsed && "justify-center"
      )}
    >
      <Icon size={20} />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

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

  const sidebarItems = [
    { icon: Home, label: "Home", href: "/dashboard" },
    { icon: FileSearch, label: "Job Parser", href: "/job-parser" },
    { icon: Briefcase, label: "Applications", href: "/applications" },
    { icon: FileText, label: "Documents", href: "/documents" },
    { icon: BookOpen, label: "Knowledge Base", href: "/knowledge-base" },
    { icon: LayoutDashboard, label: "Job Feed", href: "/job-feed" },
    { icon: CalendarClock, label: "Interview Prep", href: "/interview-prep" },
    { icon: Users, label: "Referrals", href: "/referrals" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: HelpCircle, label: "Help", href: "/help" },
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
          <Menu />
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
            <nav className="flex-1 space-y-1">
              {sidebarItems.map((item) => (
                <SidebarItem 
                  key={item.href} 
                  icon={item.icon} 
                  label={item.label} 
                  href={item.href}
                  collapsed={false}
                />
              ))}
            </nav>
            <div className="pt-4 border-t">
              {/* Version or user info could go here */}
              <div className="text-xs text-muted-foreground">Version 1.0</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={cn(
      "flex-shrink-0 h-screen sticky top-0 border-r overflow-y-auto",
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
        
        <div className="flex-1 py-4">
          <nav className="grid gap-1">
            {sidebarItems.map((item) => (
              <SidebarItem 
                key={item.href} 
                icon={item.icon} 
                label={item.label} 
                href={item.href}
                collapsed={collapsed}
              />
            ))}
          </nav>
        </div>
        
        {!collapsed && (
          <div className="mt-auto border-t pt-4">
            {/* Version or user info could go here */}
            <div className="text-xs text-muted-foreground px-4">Version 1.0</div>
          </div>
        )}
      </div>
    </div>
  );
}
