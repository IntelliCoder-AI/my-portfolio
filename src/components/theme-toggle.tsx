"use client";
import { useEffect, useRef, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
    return () => { if (timeout.current) clearTimeout(timeout.current); };
  }, []);
  function toggle() {
    const next = !dark;
    const root = document.documentElement;
    root.classList.add("theme-changing");
    root.dataset.theme = next ? "dark" : "light";
    setDark(next);
    try { localStorage.setItem("portfolio-theme", next ? "dark" : "light"); } catch {}
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => root.classList.remove("theme-changing"), 600);
  }
  return (
    <button className="theme-control" type="button" onClick={toggle}
      data-mode={dark ? "dark" : "light"} aria-pressed={dark}
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}>
      <span className="theme-control-icons" aria-hidden="true">
        <Moon className="theme-moon" size={17} /><Sun className="theme-sun" size={17} />
      </span>
      <span className="mono theme-control-label">{dark ? "Light" : "Dark"}</span>
    </button>
  );
}
