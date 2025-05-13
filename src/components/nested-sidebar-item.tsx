import React, {
  useState,
  useContext,
  createContext,
  PropsWithChildren,
} from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

/* ---------------------------- Context ---------------------------- */
type SidebarCtx = {
  activeMain: string | null;
  setActiveMain: (k: string) => void;
};

const SidebarContext = createContext<SidebarCtx>({
  activeMain: null,
  setActiveMain: () => {},
});

export function SidebarProvider({ children }: PropsWithChildren) {
  const [activeMain, setActiveMain] = useState<string | null>(null);
  return (
    <SidebarContext.Provider value={{ activeMain, setActiveMain }}>
      {children}
    </SidebarContext.Provider>
  );
}

/* ------------------------ Sidebar Item -------------------------- */
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
  const { activeMain, setActiveMain } = useContext(SidebarContext);
  const [isOpen, setIsOpen] = useState(false);

  const hasSub = Array.isArray(subItems) && subItems.length > 0;
  const location = useLocation();
  const mainKey = href || label; // unique ID

  /* URL‑based checks (for hard refresh / deep link) */
  const urlActive = href ? location.pathname === href : false;
  const childUrlActive =
    hasSub && subItems!.some((c) => location.pathname === c.href);

  const isActive = activeMain === mainKey || urlActive || childUrlActive;

  /* ---------- shared classes ---------- */
  const base =
    "flex items-center justify-between w-full px-4 py-2 rounded-lg transition-colors hover:bg-muted dark:hover:bg-slate-800";
  const active =
    "bg-yellow-200 text-blue-600 font-medium dark:bg-blue-900 dark:text-yellow-200";
  const inactive = "text-muted-foreground dark:text-white";

  const Left = (
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!collapsed && (
        <span className="flex-1 text-sm font-medium truncate">{label}</span>
      )}
    </div>
  );

  const Right =
    !collapsed &&
    (hasSub ? (
      isOpen ? (
        <ChevronDown className="w-4 h-4 flex-shrink-0" />
      ) : (
        <ChevronRight className="w-4 h-4 flex-shrink-0" />
      )
    ) : (
      <ChevronRight className="w-4 h-4 flex-shrink-0" />
    ));

  /* ------------------ Leaf (no children) ------------------ */
  if (!hasSub) {
    return (
      <NavLink
        to={href || "#"}
        className={({ isActive: navActive }) =>
          cn(base, navActive ? active : inactive, collapsed && "justify-center")
        }
        end
        onClick={() => setActiveMain(mainKey)}
      >
        {Left}
        {Right}
      </NavLink>
    );
  }

  /* ----------------- Parent (has children) ---------------- */
  return (
    <Collapsible
      open={isOpen && !collapsed}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) setActiveMain(mainKey);
      }}
      className="w-full"
    >
      <CollapsibleTrigger asChild>
        {href ? (
          <NavLink
            to={href}
            end
            onClick={() => setActiveMain(mainKey)}
            className={({ isActive: navActive }) =>
              cn(
                base,
                navActive || isActive ? active : inactive,
                collapsed && "justify-center"
              )
            }
          >
            {Left}
            {Right}
          </NavLink>
        ) : (
          <button
            type="button"
            onClick={() => setActiveMain(mainKey)}
            className={cn(
              base,
              isActive ? active : inactive,
              collapsed && "justify-center"
            )}
          >
            {Left}
            {Right}
          </button>
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
                onClick={() => setActiveMain(mainKey)}
                className={({ isActive: navActive }) =>
                  cn(base, navActive ? active : inactive, "pl-2")
                }
              >
                <div className="flex items-center gap-3">
                  <SI className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1 text-sm font-medium truncate">
                    {sLabel}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 flex-shrink-0" />
              </NavLink>
            ))}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}
