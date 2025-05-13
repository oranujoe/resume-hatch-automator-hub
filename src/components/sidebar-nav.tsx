
import React from "react";
import { NavLink } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SidebarNavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
  collapsed?: boolean;
}

export const SidebarNavItem = ({ 
  icon: Icon, 
  label, 
  href,
  isActive,
  collapsed = false 
}: SidebarNavItemProps) => {
  return (
    <NavLink 
      to={href} 
      className={({ isActive: routeActive }) => cn(
        "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
        "hover:bg-muted dark:hover:bg-slate-800",
        (isActive || routeActive) 
          ? "bg-yellow-200 text-blue-600 rounded-full font-medium dark:bg-blue-900 dark:text-yellow-200" 
          : "text-muted-foreground dark:text-white",
        collapsed && "justify-center"
      )}
    >
      <div className="flex items-center justify-center w-5 h-5">
        <Icon size={20} className="flex-shrink-0" />
      </div>
      {!collapsed && <span className="text-sm font-medium truncate">{label}</span>}
    </NavLink>
  );
};

interface SidebarNavProps {
  items: Array<{
    icon: LucideIcon;
    label: string;
    href: string;
    isActive?: boolean;
    subItems?: Array<{
      icon: LucideIcon;
      label: string;
      href: string;
      isActive?: boolean;
    }>;
  }>;
  collapsed?: boolean;
  className?: string;
}

export function SidebarNav({ items, collapsed = false, className }: SidebarNavProps) {
  return (
    <nav className={cn("grid gap-1 px-2", className)}>
      {items.map((item) => (
        <React.Fragment key={item.label}>
          {!item.subItems || item.subItems.length === 0 ? (
            <SidebarNavItem
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={item.isActive}
              collapsed={collapsed}
            />
          ) : (
            <div className="space-y-1">
              <SidebarNavItem
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={item.isActive}
                collapsed={collapsed}
              />
              {!collapsed && item.subItems && (
                <div className="ml-6 flex flex-col gap-1 border-l pl-2">
                  {item.subItems.map((subItem) => (
                    <SidebarNavItem
                      key={subItem.href}
                      icon={subItem.icon}
                      label={subItem.label}
                      href={subItem.href}
                      isActive={subItem.isActive}
                      collapsed={collapsed}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
