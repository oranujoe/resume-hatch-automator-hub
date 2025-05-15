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

  // 1) Compute active states
  const isItemActive   = href === location.pathname;
  const isChildActive  = hasSub && subItems!.some(item => item.href === location.pathname);
  const isActive       = isItemActive || isChildActive || isOpen;

  // auto‐expand if a child route is active
  useEffect(() => {
    if (isChildActive && !isOpen) setIsOpen(true);
  }, [isChildActive, isOpen]);

  // 2) Define classes
  const baseClasses     = "flex items-center justify-between w-full px-4 py-2 rounded-lg transition-colors hover:bg-muted dark:hover:bg-slate-800";
  const activeClasses   = "bg-yellow-200 text-blue-600 font-medium dark:bg-blue-900 dark:text-yellow-200";
  const inactiveClasses = "text-muted-foreground dark:text-white";

  // 3) Leaf node (no children)
  if (!hasSub) {
    return (
      <NavLink
        to={href!}
        end                         // ← exact matching only
        className={({ isActive }) =>
          cn(baseClasses, isActive ? activeClasses : inactiveClasses, collapsed && "justify-center")
        }
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="flex-1 text-sm font-medium truncate">{label}</span>}
        </div>
      </NavLink>
    );
  }

  // 4) Branch node (with children)
  return (
    <Collapsible open={isOpen && !collapsed} onOpenChange={setIsOpen} className="w-full">
      {/* Header: entire row gets active styling when isActive */}
      <div
        className={cn(
          baseClasses,
          isActive ? activeClasses : inactiveClasses,
          collapsed && "justify-center",
          hasSub && !collapsed && "pr-2"
        )}
      >
        {/* Left side: if href is provided, clicking navigates; otherwise acts purely as a toggle */}
        {href ? (
          <NavLink to={href} end className="flex-1">
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="flex-1 text-sm font-medium truncate">{label}</span>}
            </div>
          </NavLink>
        ) : (
          <button onClick={() => setIsOpen(o => !o)} className="flex-1 text-left">
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="flex-1 text-sm font-medium truncate">{label}</span>}
            </div>
          </button>
        )}

        {/* Chevron toggle */}
        {!collapsed && (
          <button
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(o => !o);
            }}
            className="p-2 rounded-lg hover:bg-muted dark:hover:bg-slate-800"
          >
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Sub-items */}
      {!collapsed && (
        <CollapsibleContent>
          <div className="ml-6 border-l border-gray-200 dark:border-slate-700 pl-4 mt-1 space-y-1">
            {subItems!.map(({ icon: SI, label: sLabel, href: sHref }) => (
              <NavLink
                key={sHref}
                to={sHref}
                end                     // ← exact matching for children too
                className={({ isActive }) =>
                  cn(baseClasses, isActive ? activeClasses : inactiveClasses, "pl-2")
                }
              >
                <div className="flex items-center gap-3">
                  <SI className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1 text-sm font-medium truncate">{sLabel}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}
