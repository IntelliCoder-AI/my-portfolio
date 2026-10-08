import type { ReactNode } from "react";
type Props = {
  href?: string;
  children: ReactNode;
  className?: string;
  label: string;
  download?: boolean;
  newTab?: boolean;
};
export function LinkAction({
  href,
  children,
  className = "",
  label,
  download,
  newTab,
}: Props) {
  if (!href) return null;
  const external = href.startsWith("https://");
  const opensNewTab = external || newTab;
  return (
    <a
      className={className}
      href={href}
      aria-label={label}
      download={download || undefined}
      target={opensNewTab ? "_blank" : undefined}
      rel={opensNewTab ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
