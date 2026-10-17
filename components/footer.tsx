import {
  ArrowUpRight,
  Heart,
  ShieldCheck,
  Github,
  Linkedin,
} from "lucide-react";

export function Footer() {
  return (
    <footer
      id="about"
      className="border-t border-[var(--line)] bg-[var(--surface)] text-[var(--text-primary)]"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand and description */}
          <div>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-lg text-lg font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-color)]"
              aria-label="TechTulana Nepal home"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-[var(--accent)] text-[#17210b]">
                <ArrowUpRight size={21} aria-hidden="true" />
              </span>

              <span>
                TechTulana <span className="text-[var(--accent)]">Nepal</span>
              </span>
            </a>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
              Compare product offers from supported Nepali online stores in one
              simple workspace. Make informed shopping decisions with product
              and price information.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold">Quick links</h2>

            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm">
              <li>
                <a
                  href="/"
                  className="text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-color)]"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/#compare"
                  className="text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-color)]"
                >
                  Compare products
                </a>
              </li>

              <li>
                <a
                  href="/#how-it-works"
                  className="text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-color)]"
                >
                  How it works
                </a>
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-4">
              <a
                href="https://github.com/ujjwal-dahal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-color)]"
              >
                <Github size={17} aria-hidden="true" />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/brightnessujjwal/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in a new tab)"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-color)]"
              >
                <Linkedin size={17} aria-hidden="true" />
                LinkedIn
              </a>
            </div>
          </nav>

          {/* Price disclaimer */}
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck
                size={18}
                className="text-emerald-600 dark:text-emerald-400"
                aria-hidden="true"
              />

              <h2 className="text-sm font-semibold">Shop with confidence</h2>
            </div>

            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              Prices, availability, and product details may change. Always
              verify the latest information on the seller&apos;s website before
              purchasing.
            </p>
          </div>
        </div>

        {/* Copyright and creator credit */}
        <div className="mt-8 flex flex-col gap-3 border-t border-[var(--line)] pt-5 text-xs text-[var(--text-secondary)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} TechTulana Nepal. All rights reserved.
          </p>

          <p className="inline-flex flex-wrap items-center gap-1.5">
            Made by{" "}
            <span className="font-bold tracking-wider text-[var(--accent)]">
              UJJWAL DAHAL
            </span>
            <Heart
              size={13}
              className="fill-red-500 text-red-500"
              aria-label="with care"
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
