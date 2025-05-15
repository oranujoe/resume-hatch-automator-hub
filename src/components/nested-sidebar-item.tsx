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
  const hasSub = Array.isArray(subItems) && subItems.length > 0;
  const location = useLocation();
  
  // Check if this item or any of its children are active
  const isItemActive = href && location.pathname === href;
  const isChildActive = hasSub && subItems!.some(item => item.href === location.pathname);
  
  // Auto-expand when a child is active
  useEffect(() => {
    if (isChildActive && !isOpen) {
      setIsOpen(true);
    }
  }, [isChildActive, isOpen]);

  // 1) Base layout for every row
  const base = cn(
    "flex items-center justify-between w-full",
    "px-4 py-2 rounded-lg transition-colors",
    "hover:bg-muted dark:hover:bg-slate-800"
  );

  // 2) Color toggles
  const active = "bg-yellow-200 text-blue-600 font-medium dark:bg-blue-900 dark:text-yellow-200";
  const inactive = "text-muted-foreground dark:text-white";

  // 3) Left side icon+label
  const Left = (
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!collapsed && <span className="flex-1 text-sm font-medium truncate">{label}</span>}
    </div>
  );

  // 4) Right side chevron
  const Right = !collapsed && (
    hasSub
      ? (isOpen
          ? <ChevronDown className="w-4 h-4 flex-shrink-0" />
          : <ChevronRight className="w-4 h-4 flex-shrink-0" />
        )
      : null
  );

  // Handle click on parent items with children
  const handleParentClick = (e: React.MouseEvent) => {
    if (hasSub) {
      // Toggle dropdown state
      setIsOpen(!isOpen);
      
      // If there's also a valid href, let the navigation happen naturally
      if (!href || href === "#") {
        e.preventDefault();
      }
    }
  };

  // === Leaf ===
  if (!hasSub) {
    return (
      <NavLink
        to={href || "#"}
        className={({ isActive }) =>
          cn(base, isActive ? active : inactive, collapsed && "justify-center")
        }
        end
      >
        {Left}
        {Right}
      </NavLink>
    );
  }

  // === Branch ===
  return (
    <Collapsible 
      open={isOpen && !collapsed} 
      onOpenChange={setIsOpen} 
      className="w-full"
    >
      {href && href !== "#" ? (
        <NavLink
          to={href}
          className={({ isActive }) =>
            cn(
              base, 
              (isActive || isChildActive) ? active : inactive,
              collapsed && "justify-center",
              "flex items-center justify-between w-full"
            )
          }
          onClick={handleParentClick}
        >
          {Left}
          {Right}
        </NavLink>
      ) : (
        <CollapsibleTrigger
          className={cn(
            base,
            (isItemActive || isChildActive) ? active : inactive,
            collapsed && "justify-center"
          )}
        >
          {Left}
          {Right}
        </CollapsibleTrigger>
      )}

      {!collapsed && (
        <CollapsibleContent>
          <div className="ml-6 border-l border-gray-200 dark:border-slate-700 pl-4 mt-1 space-y-1">
            {subItems!.map(({ icon: SI, label: sLabel, href: sHref }) => (
              <NavLink
                key={sHref}
                to={sHref}
                className={({ isActive }) =>
                  cn(base, isActive ? active : inactive, "pl-2")
                }
                end
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