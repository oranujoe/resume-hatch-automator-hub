import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

export interface NestedSidebarItemProps {
  id: string;
  icon: LucideIcon;
  label: string;
  href?: string;
  subItems?: { icon: LucideIcon; label: string; href: string }[];
  collapsed?: boolean;
  open: boolean;
  onToggle: () => void;
}

export function NestedSidebarItem({
  id,
  icon: Icon,
  label,
  href,
  subItems,
  collapsed = false,
  open,
  onToggle,
}: NestedSidebarItemProps) {
  const location = useLocation();
  const hasSub = Array.isArray(subItems) && subItems.length > 0;

  // Determine active state
  const isItemRouteActive = href === location.pathname;
  const isChildRouteActive = hasSub && subItems!.some(si => si.href === location.pathname);
  const isActive = open || isItemRouteActive || isChildRouteActive;

  // Base styling
  const baseClasses = "flex items-center justify-between w-full px-4 py-2 rounded-lg transition-colors hover:bg-muted dark:hover:bg-slate-800";
  const activeClasses = "bg-yellow-200 text-blue-600 font-medium dark:bg-blue-900 dark:text-yellow-200";
  const inactiveClasses = "text-muted-foreground dark:text-white";

  // Leaf item
  if (!hasSub) {
    return (
      <NavLink
        to={href!}
        end
        className={({ isActive }) =>
          cn(baseClasses, isActive ? activeClasses : inactiveClasses, collapsed && "justify-center")
        }
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        {!collapsed && <span className="flex-1 ml-3 text-sm font-medium truncate">{label}</span>}
      </NavLink>
    );
  }

  // Branch item with children
  // Decide trigger element: NavLink if href exists, otherwise a div
  const Trigger: any = href ? NavLink : 'div';
  const triggerProps = href ? { to: href, end: true } : {};

  return (
    <Collapsible open={open && !collapsed} onOpenChange={onToggle} className="w-full">
      <CollapsibleTrigger asChild>
        <Trigger
          {...triggerProps}
          className={cn(baseClasses, isActive ? activeClasses : inactiveClasses, collapsed && "justify-center")}
        >
          {/* Icon + Label */}
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="flex-1 text-sm font-medium truncate">{label}</span>}
          </div>

          {/* Chevron */}
          {!collapsed && (open ? <ChevronDown className="w-4 h-4 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 flex-shrink-0" />)}
        </Trigger>
      </CollapsibleTrigger>

      {!collapsed && (
        <CollapsibleContent>
          <div className="ml-6 border-l border-gray-200 dark:border-slate-700 pl-4 mt-1 space-y-1">
            {subItems!.map(({ icon: SI, label: sLabel, href: sHref }) => (
              <NavLink
                key={sHref}
                to={sHref}
                end
                className={({ isActive }) =>
                  cn(baseClasses, isActive ? activeClasses : inactiveClasses, "pl-2")
                }
              >
                <SI className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1 ml-3 text-sm font-medium truncate">{sLabel}</span>
              </NavLink>
            ))}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}
