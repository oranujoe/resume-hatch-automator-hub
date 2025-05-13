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

  // Consistent classes for all sidebar items
  const base = "flex transition-colors hover:bg-muted dark:hover:bg-slate-800";
  const padding = collapsed ? "px-0 py-2 justify-center" : "px-4 py-2 rounded-lg";
  const active = "bg-yellow-200 text-blue-600 dark:bg-blue-900 dark:text-yellow-200";
  const inactive = "text-muted-foreground dark:text-white";

  // Create a consistent menu item layout with standardized grid
  const renderMenuItem = (ItemIcon: LucideIcon, itemLabel: string, isItemActive = false, hasChevron = false, isOpen = false) => {
    return (
      <div className="grid grid-cols-[24px_1fr_auto] items-center w-full">
        {/* Fixed-width icon container for alignment */}
        <div className="flex items-center justify-center h-5 w-5">
          <ItemIcon size={20} className="flex-shrink-0" />
        </div>
        
        {/* Label with consistent positioning */}
        {!collapsed && (
          <span className={cn("text-sm font-medium ml-3", isItemActive && "font-medium")}>
            {itemLabel}
          </span>
        )}
        
        {/* Optional chevron in the last column */}
        {!collapsed && hasChevron && (
          <div className="flex items-center justify-center h-5 w-5">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
        )}
      </div>
    );
  };

  // No sub-items → simple NavLink
  if (!subItems?.length) {
    return (
      <NavLink
        to={href || "#"}
        className={({ isActive }) =>
          cn(base, padding, isActive ? active : inactive)
        }
      >
        {({ isActive }) => renderMenuItem(Icon, label, isActive)}
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
          isOpen ? "text-blue-600 dark:text-blue-400" : inactive
        )}
      >
        {renderMenuItem(Icon, label, false, true, isOpen)}
      </CollapsibleTrigger>

      <CollapsibleContent className={cn(collapsed && "hidden")}>
        <div className="border-l border-gray-200 dark:border-slate-700 pl-6 mt-1 flex flex-col space-y-1">
          {subItems.map(({ icon: SubIcon, label: subLabel, href: subHref }) => (
            <NavLink
              key={subHref}
              to={subHref}
              className={({ isActive }) =>
                cn(base, "px-4 py-2 rounded-lg", isActive ? active : inactive)
              }
            >
              {({ isActive }) => renderMenuItem(SubIcon, subLabel, isActive)}
            </NavLink>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default NestedSidebarItem;