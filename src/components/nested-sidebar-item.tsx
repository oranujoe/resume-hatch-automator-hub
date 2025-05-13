/* src/components/nested-sidebar-item.tsx */
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
type SidebarCtx = { activeMain: string | null; setActiveMain: (k: string) => void };
const SidebarContext = createContext<SidebarCtx>({ activeMain: null, setActiveMain: () => {} });

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

  const hasSub   = Array.isArray(subItems) && subItems.length > 0;
  const location = useLocation();
  const mainKey  = href || label;           // unique row ID

  /* URL checks so a hard‑refresh still highlights the correct tab */
  const urlActive      = href ? location.pathname === href : false;
  const childUrlActive = hasSub && subItems!.some(s => location.pathname === s.href);
  const isActive       = activeMain === mainKey || urlActive || childUrlActive;

  /* ---------- shared classes ---------- */
  const outer =
    "flex items-center w-full px-4 py-2 rounded-lg transition-colors hover:bg-muted dark:hover:bg-slate-800";
  const active   = "bg-yellow-200 text-blue-600 font-medium dark:bg-blue-900 dark:text-yellow-200";
  const inactive = "text-muted-foreground dark:text-white";

  /* ---------- Left cluster (icon + text) ---------- */
  const Left = (
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!collapsed && <span className="text-sm font-medium truncate">{label}</span>}
    </div>
  );

  /* ---------- Right cluster (chevron / placeholder) ---------- */
  const ChevronIcon = !collapsed
    ? hasSub
      ? isOpen
        ? <ChevronDown className="w-4 h-4 flex-shrink-0" />
        : <ChevronRight className="w-4 h-4 flex-shrink-0" />
      : <ChevronRight className="w-4 h-4 flex-shrink-0" />
    : null;

  // Always reserve the same width so every row lines up.
  const Right = ChevronIcon ?? <span className="w-4 h-4" />;

  /* ---------------- Leaf (no children) ---------------- */
  if (!hasSub) {
    return (
      <NavLink
        to={href || "#"}
        end
        onClick={() => setActiveMain(mainKey)}
        className={({ isActive }) =>
          cn(outer, isActive ? active : inactive, collapsed && "justify-center")
        }
      >
        {Left}
        <span className="ml-auto">{Right}</span>
      </NavLink>
    );
  }

  /* -------------- Parent (has children) -------------- */
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
                outer,
                navActive || isActive ? active : inactive,
                collapsed && "justify-center"
              )
            }
          >
            {Left}
            <span className="ml-auto">{Right}</span>
          </NavLink>
        ) : (
          <button
            type="button"
            onClick={() => setActiveMain(mainKey)}
            className={cn(outer, isActive ? active : inactive, collapsed && "justify-center")}
          >
            {Left}
            <span className="ml-auto">{Right}</span>
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
                className={({ isActive }) =>
                  cn(outer, isActive ? active : inactive, "pl-2")
                }
              >
                <div className="flex items-center gap-3">
                  <SI className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium truncate">{sLabel}</span>
                </div>
                <span className="ml-auto">
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                </span>
              </NavLink>
            ))}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}
