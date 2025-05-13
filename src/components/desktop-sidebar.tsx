
import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NestedSidebarItem } from "./nested-sidebar-item";
import { SidebarItem } from "@/lib/sidebar-navigation";

interface DesktopSidebarProps {
  items: SidebarItem[];
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  className?: string;
}

export function DesktopSidebar({ 
  items, 
  collapsed, 
  setCollapsed,
  className 
}: DesktopSidebarProps) {
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
            {items.map((item) => (
              <NestedSidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                href={item.href}
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
