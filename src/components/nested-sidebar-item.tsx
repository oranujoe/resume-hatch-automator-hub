import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

interface NestedSidebarItemProps {
  id: string;                                 // NEW
  icon: LucideIcon;
  label: string;
  href?: string;
  subItems?: { icon: LucideIcon; label: string; href: string }[];
  collapsed?: boolean;

  // CONTROLLED:
  open: boolean;                              // replaces internal isOpen
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

  // only style “active” if _this_ item’s open OR current route matches
  const isItemRouteActive  = href === location.pathname;
  const isChildRouteActive = hasSub && subItems!.some(si => si.href === location.pathname);
  const isActive           = open || isItemRouteActive || isChildRouteActive;

  const base    = "flex items-center justify-between w-full px-4 py-2 rounded-lg transition-colors hover:bg-muted dark:hover:bg-slate-800";
  const active  = "bg-yellow-200 text-blue-600 font-medium dark:bg-blue-900 dark:text-yellow-200";
  const inactive= "text-muted-foreground dark:text-white";

  // — leaf item (no subItems) —
  if (!hasSub) {
    return (
      <NavLink
        to={href!}
        end
        className={({ isActive }) =>
          cn(base, isActive ? active : inactive, collapsed && "justify-center")
        }
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        {!collapsed && <span className="flex-1 ml-3 text-sm font-medium truncate">{label}</span>}
      </NavLink>
    );
  }

  // — branch with unified trigger —
  return (
    <Collapsible open={open && !collapsed} onOpenChange={onToggle} className="w-full">
      <CollapsibleTrigger asChild>
        {/* Wrap entire header (icon, label, chevron) so clicking anywhere toggles */}
        {href ? (
          <NavLink
            to={href}
            end
            className={cn(base, isActive ? active : inactive, collapsed && "justify-center")}
            onClick={onToggle}            // also toggle on click
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="flex-1 text-sm font-medium truncate">{label}</span>}
            </div>
            {!collapsed && (open ? <ChevronDown className="w-4 h-4"/> : <ChevronRight className="w-4 h-4"/>)}
          </NavLink>
        ) : (
          <div
            className={cn(base, isActive ? active : inactive, collapsed && "justify-center")}
            onClick={onToggle}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="flex-1 text-sm font-medium truncate">{label}</span>}
            </div>
            {!collapsed && (open ? <ChevronDown className="w-4 h-4"/> : <ChevronRight className="w-4 h-4"/>)}
          </div>
        )}
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
                  cn(base, isActive ? active : inactive, "pl-2")
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
