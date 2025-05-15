import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const hasSub = Array.isArray(subItems) && subItems.length > 0;

  const isItemActive  = href === location.pathname;
  const isChildActive = hasSub && subItems!.some(item => item.href === location.pathname);
  const isActive      = isItemActive || isChildActive || isOpen;

  useEffect(() => {
    if (isChildActive && !isOpen) setIsOpen(true);
  }, [isChildActive, isOpen]);

  const base    = "flex items-center justify-between w-full px-4 py-2 rounded-lg transition-colors hover:bg-muted dark:hover:bg-slate-800";
  const active  = "bg-yellow-200 text-blue-600 font-medium dark:bg-blue-900 dark:text-yellow-200";
  const inactive= "text-muted-foreground dark:text-white";

  // …leaf (no subItems) stays the same…

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

  // === branch with unified trigger ===
  return (
    <Collapsible open={isOpen && !collapsed} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        {href ? (
          <NavLink
            to={href}
            end
            className={cn(
              base,
              isActive ? active : inactive,
              collapsed && "justify-center"
            )}
          >
            {/* icon + label */}
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="flex-1 text-sm font-medium truncate">{label}</span>}
            </div>

            {/* chevron */}
            {!collapsed && (
              isOpen
                ? <ChevronDown className="w-4 h-4 flex-shrink-0" />
                : <ChevronRight className="w-4 h-4 flex-shrink-0" />
            )}
          </NavLink>
        ) : (
          <div
            className={cn(base, isActive ? active : inactive, collapsed && "justify-center")}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="flex-1 text-sm font-medium truncate">{label}</span>}
            </div>
            {!collapsed && (
              isOpen
                ? <ChevronDown className="w-4 h-4 flex-shrink-0" />
                : <ChevronRight className="w-4 h-4 flex-shrink-0" />
            )}
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
