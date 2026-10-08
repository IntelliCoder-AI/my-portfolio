"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/portfolio";
export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const topObserver = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    const marker = document.getElementById("header-marker");
    if (marker) topObserver.observe(marker);
    const intersections = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersections.set(entry.target.id, entry.boundingClientRect.top);
          else intersections.delete(entry.target.id);
        }
        const visible = [...intersections].sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]));
        if (visible[0]) setActive(visible[0][0]);
      },
      { rootMargin: "-90px 0px -55% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main section[id]:not(#github)")
      .forEach((section) => observer.observe(section));
    return () => {
      topObserver.disconnect();
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner container">
        <a className="wordmark" href="#home" aria-label="Anurag home">
          a<span>.</span>
          <span className="wordmark-name">
            anurag<span className="wordmark-slash"> / </span>dev
          </span>
        </a>
        <nav
          id="primary-navigation"
          aria-label="Main navigation"
          className={open ? "nav-links is-open" : "nav-links"}
        >
          {navigation.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              aria-current={
                active === item.toLowerCase() ? "location" : undefined
              }
              onClick={() => { setOpen(false); setActive(item.toLowerCase()); }}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            ref={menuButton}
            className="icon-button menu-toggle"
            aria-expanded={open}
            aria-controls="primary-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
