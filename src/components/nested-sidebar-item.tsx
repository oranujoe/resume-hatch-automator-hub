import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

interface NestedSidebarItemProps {
  icon: LucideIcon;
  label: string;
  href?: string;
  subItems?: { icon: LucideIcon; label: string; href: string }[];
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

  // Shared classes
  const base = "flex items-center transition-colors hover:bg-muted dark:hover:bg-slate-800";
  const padding = collapsed ? "px-0 py-2 justify-center" : "gap-3 px-4 py-2 rounded-lg";
  const active = "bg-yellow-200 text-blue-600 rounded-full font-medium dark:bg-blue-900 dark:text-yellow-200";
  const inactive = "text-muted-foreground dark:text-white";

  // No sub-items → simple NavLink
  if (!subItems?.length) {
    return (
      <NavLink
        to={href || "#"}
        className={({ isActive }) =>
          cn(base, padding, isActive ? active : inactive)
        }
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        {!collapsed && <span className="text-sm font-medium truncate">{label}</span>}
      </NavLink>
    );
  }

  // Has sub-items → collapsible
  return (
    <Collapsible open={isOpen && !collapsed} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger
        className={cn(
          base,
          "w-full",
          padding,
          isOpen ? "text-blue-600 font-medium dark:text-blue-400" : inactive
        )}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 text-sm font-medium truncate">{label}</span>
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </>
        )}
      </CollapsibleTrigger>

      <CollapsibleContent className={cn(collapsed && "hidden")}>
        <div className="border-l border-gray-200 dark:border-slate-700 pl-6 mt-1 flex flex-col space-y-1">
          {subItems.map(({ icon: SubIcon, label: subLabel, href: subHref }) => (
            <NavLink
              key={subHref}
              to={subHref}
              className={({ isActive }) =>
                cn(base, "gap-3 px-4 py-2 rounded-lg pl-2", isActive ? active : inactive)
              }
            >
              <SubIcon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium truncate">{subLabel}</span>
            </NavLink>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
