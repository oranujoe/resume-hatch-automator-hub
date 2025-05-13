/* Sidebar.tsx (or whatever component renders the sidebar) */

import React from "react";
import { Briefcase, Folder, FileText } from "lucide-react";
import {
  SidebarProvider,
  NestedSidebarItem,
} from "@/components/nested-sidebar-item";

export function Sidebar({ collapsed = false }) {
  return (
    <SidebarProvider>
      <aside className={collapsed ? "w-16" : "w-64"}>
        <nav className="flex flex-col gap-1 py-2">
          <NestedSidebarItem
            icon={Briefcase}
            label="Job Parser"
            collapsed={collapsed}
            /* Give parent its own URL if you like, otherwise leave href undefined */
            subItems={[
              { icon: FileText, label: "Dashboard", href: "/parser" },
              { icon: FileText, label: "Uploads",   href: "/parser/uploads" },
            ]}
          />

          <NestedSidebarItem
            icon={Folder}
            label="Applications"
            href="/applications"   /* single‑page parent */
            collapsed={collapsed}
          />
        </nav>
      </aside>
    </SidebarProvider>
  );
}
