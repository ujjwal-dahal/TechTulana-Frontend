import {
  LoaderCircle,
  Search,
  Store,
  PackageSearch,
  GitCompareArrows,
} from "lucide-react";

export function LoadingState() {
  const steps = [
    {
      icon: Search,
      title: "Searching supported stores",
      description: "Looking for matching product listings.",
    },
    {
      icon: PackageSearch,
      title: "Extracting product details",
      description: "Collecting available prices and specifications.",
    },
    {
      icon: GitCompareArrows,
      title: "Preparing comparison",
      description: "Organizing offers for easier comparison.",
    },
  ];

  return (
    <section
      className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--text-primary)] shadow-sm"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Loading header */}
      <div className="flex items-start gap-4 border-b border-[var(--line)] p-5 sm:p-6">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[var(--accent)]/20 bg-[var(--accent-soft)] text-[var(--accent)]">
          <LoaderCircle size={25} className="animate-spin" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-bold sm:text-lg">
              Comparing product prices
            </h2>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/25 bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--accent)]">
              <span className="size-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
              In progress
            </span>
          </div>

          <p className="mt-1.5 text-sm leading-6 text-[var(--text-secondary)]">
            Searching supported websites, collecting product offers, and
            preparing your comparison. This may take up to a minute.
          </p>
        </div>
      </div>

      {/* Indeterminate progress indicator */}
      <div
        className="h-1 overflow-hidden bg-[var(--surface-secondary)]"
        aria-hidden="true"
      >
        <div className="h-full w-1/3 animate-pulse rounded-full bg-[var(--accent)]" />
      </div>

      {/* Loading steps */}
      <div className="p-5 sm:p-6">
        <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
          What&apos;s happening
        </p>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="flex items-start gap-3 sm:flex-col sm:gap-3"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-secondary)] text-[var(--accent)]">
                  <Icon size={19} aria-hidden="true" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    {index + 1}. {step.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Helpful note */}
        <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface-secondary)] p-3.5">
          <Store
            size={17}
            className="mt-0.5 shrink-0 text-[var(--accent)]"
            aria-hidden="true"
          />

          <p className="text-xs leading-5 text-[var(--text-secondary)]">
            Results depend on website availability and the product information
            each supported store provides.
          </p>
        </div>
      </div>
    </section>
  );
}
