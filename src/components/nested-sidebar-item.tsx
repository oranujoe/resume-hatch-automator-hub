
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
            "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
            "hover:bg-muted dark:hover:bg-slate-800",
            isActive 
              ? "bg-yellow-200 text-blue-600 rounded-full font-medium dark:bg-blue-900 dark:text-yellow-200" 
              : "text-muted-foreground dark:text-white",
            collapsed && "justify-center"
          )
        }
      >
        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </span>
        {!collapsed && <span className="text-sm font-medium truncate">{label}</span>}
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
            "flex w-full items-center gap-3 px-4 py-2 rounded-lg transition-colors",
            "hover:bg-muted dark:hover:bg-slate-800",
            isOpen 
              ? "text-blue-600 font-medium dark:text-blue-400" 
              : "text-muted-foreground dark:text-white",
            collapsed && "justify-center"
          )}
        >
          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
            <Icon className="w-5 h-5" />
          </span>
          {!collapsed && (
            <>
              <span className="text-sm font-medium truncate flex-1">{label}</span>
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
                    "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                    "hover:bg-muted dark:hover:bg-slate-800",
                    isActive 
                      ? "bg-yellow-200 text-blue-600 rounded-full font-medium dark:bg-blue-900 dark:text-yellow-200" 
                      : "text-muted-foreground dark:text-white"
                  )
                }
              >
                <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                  <item.icon className="w-5 h-5" />
                </span>
                <span className="text-sm font-medium truncate">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
