import { Suspense, type ReactNode } from "react";
import Menu from "../shared/Menu";
import ErrorBoundary from "./ErrorBoundary";

// every page renders inside this: navbar + page area
export default function Layout({ path, children }: { path: string; children: ReactNode }) {
  return (
    <div className="with-menu">
      <Menu />

      {/* .menu-page = everything right of (desktop) / above (mobile) the navbar */}
      <div className="menu-page">
        {/* key resets the error when you go to another page */}
        <ErrorBoundary key={path}>
          <Suspense fallback={<p className="page-status">Loading…</p>}>{children}</Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
