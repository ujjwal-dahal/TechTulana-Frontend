"use client";

import {
  BarChart3,
  ArrowRight,
  Menu,
  X,
  ShieldCheck,
  Sun,
  Moon,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useTheme } from "./theme-provider";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Compare Prices", href: "/#compare" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "About", href: "/#about" },
    { label: "Author", href: "/author" },
  ];

  const themeButton = (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--text-primary)] transition-colors hover:bg-[var(--hover-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-color)]"
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      {theme === "dark" ? (
        <Sun size={19} aria-hidden="true" />
      ) : (
        <Moon size={19} aria-hidden="true" />
      )}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--surface)]/90 text-[var(--text-primary)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="inline-flex min-w-0 shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-color)]"
          aria-label="TechTulana Nepal home"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-[#17210b] shadow-sm">
            <BarChart3 size={21} strokeWidth={2.3} aria-hidden="true" />
          </span>

          <span className="text-base font-extrabold tracking-tight sm:text-lg">
            TechTulana <span className="text-[var(--accent)]">Nepal</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-5 lg:flex xl:gap-7"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-md py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-color)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          {themeButton}

          <Link
            href="/#compare"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[#17210b] shadow-sm transition hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-color)]"
          >
            Start comparing
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          {themeButton}

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex size-10 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--text-primary)] transition-colors hover:bg-[var(--hover-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-color)]"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? (
              <X size={21} aria-hidden="true" />
            ) : (
              <Menu size={21} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[var(--line)] bg-[var(--surface)] px-4 py-4 shadow-lg sm:px-6 lg:hidden"
        >
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-color)]"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/#compare"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[#17210b] transition hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-color)]"
            >
              Start comparing
              <ArrowRight size={16} aria-hidden="true" />
            </Link>

            <div className="mt-3 flex items-center gap-2 border-t border-[var(--line)] px-3 pt-4 text-xs text-[var(--text-secondary)]">
              <ShieldCheck
                size={15}
                className="shrink-0 text-[var(--accent)]"
                aria-hidden="true"
              />
              Compare offers from supported stores
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
