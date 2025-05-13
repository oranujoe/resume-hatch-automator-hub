/* src/components/nested-sidebar-item.tsx  ── only the parent-row part changed */
…
  /* ─────────────────── Parent (has children) ────────────────── */
  return (
    <Collapsible
      open={isOpen && !collapsed}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) setActiveMain(mainKey);
      }}
      className="w-full"
    >
      {/* ▼ NEW: if the parent has an href we render a NavLink; otherwise a button.
           Either way, setActiveMain fires immediately, so the row lights up as
           soon as it’s clicked – even before the URL changes. */}
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
                className={({ isActive }) =>
                  cn(base, isActive ? active : inactive, "pl-2")
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
