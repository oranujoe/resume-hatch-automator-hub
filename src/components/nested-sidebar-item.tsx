import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [open, setOpen] = useState(false);
  const hasSub = Array.isArray(subItems) && subItems.length > 0;

  // shared layout for *all* rows
  const base = `
    flex items-center w-full gap-3
    px-4 py-2 rounded-lg
    transition-colors hover:bg-muted dark:hover:bg-slate-800
  `;
  const activeStyles = `
    bg-yellow-200 text-blue-600 font-medium
    dark:bg-blue-900 dark:text-yellow-200
  `;
  const inactiveStyles = `text-muted-foreground dark:text-white`;

  // choose wrapper: NavLink for leaves, button for branches
  const Wrapper: React.ElementType = hasSub ? "button" : NavLink;
  const wrapperProps = hasSub
    ? { onClick: () => setOpen((o) => !o), type: "button" as const }
    : { to: href! };

  return (
    <>
      <Wrapper
        {...wrapperProps}
        className={({ isActive }: { isActive?: boolean }) =>
          hasSub
            ? cn(
                base,
                open ? activeStyles : inactiveStyles,
                collapsed && "justify-center"
              )
            : cn(
                base,
                isActive ? activeStyles : inactiveStyles,
                collapsed && "justify-center"
              )
        }
      >
        {/* 1) icon always in a fixed 20×20 box */}
        <div className="flex items-center justify-center w-5 h-5">
          <Icon size={20} />
        </div>

        {/* 2) label always flex-1 so it sits in the same spot */}
        {!collapsed && (
          <>
            <span className="flex-1 text-sm font-medium truncate">
              {label}
            </span>
            {/* 3) only branches get an arrow */}
            {hasSub && (open ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
          </>
        )}
      </Wrapper>

      {/* 4) render sub-items with the *same* base styles */}
      {hasSub && !collapsed && open && (
        <div className="ml-6 border-l border-gray-200 dark:border-slate-700 pl-4 mt-1 space-y-1">
          {subItems!.map(({ icon: SubIcon, label: subLabel, href: subHref }) => (
            <NavLink
              key={subHref}
              to={subHref}
              className={({ isActive }: { isActive?: boolean }) =>
                cn(
                  base,
                  "pl-2", // extra indent for sub-items
                  isActive ? activeStyles : inactiveStyles
                )
              }
            >
              <div className="flex items-center justify-center w-5 h-5">
                <SubIcon size={20} />
              </div>
              <span className="flex-1 text-sm font-medium truncate">
                {subLabel}
              </span>
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}
