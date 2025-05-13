
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NestedSidebarItem } from "./nested-sidebar-item";
import { SidebarItem } from "@/lib/sidebar-navigation";

interface MobileSidebarProps {
  items: SidebarItem[];
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function MobileSidebar({ items, mobileOpen, setMobileOpen }: MobileSidebarProps) {
  return (
    <div className={`fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-all duration-200 ${
      mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}>
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-background border-r p-4 shadow-lg transition-transform duration-200 flex flex-col ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
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
          {items.map((item) => (
            <NestedSidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
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
  );
}
