import type { ReactNode } from "react";
export default function EditorialSectionHeader({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <header className="catalog-header">
      <div className="masthead">
        <h1>
          {title}
          <span>.</span>
        </h1>
        {action && <div className="catalog-header-action">{action}</div>}
      </div>
      <div className="catalog-intro">{children}</div>
    </header>
  );
}
