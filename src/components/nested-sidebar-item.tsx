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

  // core shared classes
  const base = "flex items-center w-full transition-colors";
  const hover = "hover:bg-muted dark:hover:bg-slate-800";

  // padding & alignment
  const expandedLayout = "justify-start gap-3 px-4 py-2 rounded-lg";
  const collapsedLayout = "justify-center px-0 py-2";

  // active/inactive colors
  const activeColor = "bg-yellow-200 text-blue-600 dark:bg-blue-900 dark:text-yellow-200";
  const inactiveColor = "text-muted-foreground dark:text-white";

  // render a simple NavLink when no subItems
  if (!subItems?.length) {
    return (
      <NavLink
        to={href || "#"}
        end                              // exact match for active
        className={({ isActive }) =>
          cn(
            base,
            hover,
            collapsed ? collapsedLayout : expandedLayout,
            isActive ? `${activeColor}` : inactiveColor,
            // only give pill shape when active & expanded
            !collapsed && isActive && "rounded-full"
          )
        }
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        {!collapsed && (
          <span className="text-sm font-medium truncate">{label}</span>
        )}
      </NavLink>
    );
  }

  // render collapsible trigger + nested items
  return (
    <Collapsible open={isOpen && !collapsed} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger
        className={cn(
          base,
          hover,
          collapsed ? collapsedLayout : expandedLayout,
          isOpen ? "text-blue-600 font-medium dark:text-blue-400" : inactiveColor,
          !collapsed && isOpen && "rounded-full"
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
              end
              className={({ isActive }) =>
                cn(
                  base,
                  hover,
                  // nested items always expand, so use expandedLayout
                  `gap-3 px-4 py-2 rounded-lg pl-2`,
                  isActive ? activeColor : inactiveColor,
                  isActive && "rounded-full"
                )
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
