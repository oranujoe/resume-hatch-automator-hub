
--- a/nested-sidebar-item.tsx
+++ b/nested-sidebar-item.tsx
@@ export function NestedSidebarItem(...) {
-    <Link
-      href={href}
-      className={cn(
-        /* maybe missing items-center? */
-        collapsed && "justify-center"
-        /* ... */
-      )}
-    >
-      <Icon />
-      {!collapsed && <span>{label}</span>}
-    </Link>
+    <Link
+      href={href}
+      className={cn(
+        "flex items-center transition-colors",
+        collapsed ? "justify-center px-2 py-2" : "gap-3 px-4 py-2 rounded-lg",
+        /* your active/inactive classes */
+      )}
+    >
+      <Icon className="w-5 h-5 flex-shrink-0" />
+      {!collapsed && (
+        <span className="text-sm font-medium truncate">
+          {label}
+        </span>
+      )}
+    </Link>

