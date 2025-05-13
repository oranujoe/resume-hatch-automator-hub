
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface NestedSidebarItemProps {
  icon: LucideIcon;
  label: string;
  href?: string;
  subItems?: {
    icon: LucideIcon;
    label: string;
    href: string;
  }[];
  collapsed?: boolean;
}

export function NestedSidebarItem({
  icon: Icon,
  label,
  href,
  subItems,
  collapsed = false,
}: NestedSidebarItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // If there are no sub-items, render a regular sidebar item
  if (!subItems || subItems.length === 0) {
    return (
      <NavLink
        to={href || "#"}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:bg-accent/50",
            isActive ? "text-primary font-medium bg-accent/50" : "text-muted-foreground",
            collapsed && "justify-center"
          )
        }
      >
        <div className="flex items-center justify-center w-5 h-5">
          <Icon size={20} />
        </div>
        {!collapsed && <span>{label}</span>}
      </NavLink>
    );
  }

  // If there are sub-items, render a collapsible section
  return (
    <div>
      <Collapsible
        open={isOpen && !collapsed}
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <CollapsibleTrigger
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:bg-accent/50",
            isOpen ? "text-primary font-medium" : "text-muted-foreground",
            collapsed && "justify-center"
          )}
        >
          <div className="flex items-center justify-center w-5 h-5">
            <Icon size={20} />
          </div>
          {!collapsed && (
            <>
              <span className="flex-1">{label}</span>
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </>
          )}
        </CollapsibleTrigger>
        
        <CollapsibleContent className={cn(collapsed && "hidden")}>
          <div className="ml-6 mt-1 flex flex-col gap-1 border-l pl-2">
            {subItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent/50",
                    isActive ? "text-primary font-medium bg-accent/50" : "text-muted-foreground"
                  )
                }
              >
                <div className="flex items-center justify-center w-4 h-4">
                  <item.icon size={16} />
                </div>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
