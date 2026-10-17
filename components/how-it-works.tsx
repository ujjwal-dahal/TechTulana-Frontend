import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function HowItWorks() {
  const steps: [LucideIcon, string, string][] = [
    [
      Search,
      "Search for a product",
      "Enter a product query and start a comparison.",
    ],
    [
      SlidersHorizontal,
      "Review supported offers",
      "See the actual offers returned by supported websites.",
    ],
    [
      Sparkles,
      "Compare with context",
      "Review specifications, prices, and stock availability.",
    ],
  ];

  return (
    <section id="how-it-works" className="py-18">
      {/* Section heading */}
      <div className="mb-8 max-w-xl">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
          Simple by design
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          A clearer way to shop.
        </h2>

        <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
          Results depend on the data returned by supported websites, so you can
          make decisions with the right context.
        </p>
      </div>

      {/* Steps */}
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map(([Icon, title, text], index) => (
          <div className="card group p-6 sm:p-7" key={title}>
            <span className="grid size-11 place-items-center rounded-xl border border-[var(--accent)]/20 bg-[var(--accent-soft)] text-[var(--accent)] transition-colors group-hover:border-[var(--accent)]/50">
              <Icon size={20} aria-hidden="true" />
            </span>

            <p className="mt-7 font-mono text-xs font-bold text-[var(--accent)]">
              STEP 0{index + 1}
            </p>

            <h3 className="mt-2 text-base font-bold text-[var(--text-primary)]">
              {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
