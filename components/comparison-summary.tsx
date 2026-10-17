import { Clock3, Layers3, ShoppingBag, Store, SearchCheck } from "lucide-react";

import type { ComparisonResult } from "../types/comparison";
import { formatSeconds } from "../lib/utils";

export function ComparisonSummary({
  comparison,
  elapsed,
}: {
  comparison: ComparisonResult;
  elapsed: number;
}) {
  // Count offers returned across all comparison groups.
  const offers = comparison.groups.reduce(
    (total, group) => total + group.offers.length,
    0,
  );

  // Count websites that returned at least one offer.
  const sites = comparison.site_status.filter(
    (site) => site.status === "ok" && site.found_count > 0,
  ).length;

  const metrics = [
    {
      label: "Product groups",
      value: comparison.groups.length,
      icon: Layers3,
      iconStyle: "bg-[var(--accent-soft)] text-[var(--accent)]",
    },
    {
      label: "Offers found",
      value: offers,
      icon: ShoppingBag,
      iconStyle: "bg-[var(--surface-secondary)] text-[var(--text-primary)]",
    },
    {
      label: "Sites with offers",
      value: sites,
      icon: Store,
      iconStyle: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Response time",
      value: formatSeconds(elapsed),
      icon: Clock3,
      iconStyle: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
  ] as const;

  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--text-primary)] shadow-sm">
      {/* Summary heading */}
      <div className="p-5 sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/25 bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--accent)]">
              <SearchCheck size={14} aria-hidden="true" />
              Comparison summary
            </div>

            <h2 className="mt-4 break-words text-2xl font-bold tracking-tight sm:text-3xl">
              {comparison.query}
            </h2>

            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              Results collected from supported online stores.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-secondary)] p-4 lg:max-w-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Search overview
            </p>

            <p className="mt-2 text-sm leading-6 text-[var(--text-primary)]">
              {comparison.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 gap-px border-t border-[var(--line)] bg-[var(--line)] sm:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.label}
              className="min-w-0 bg-[var(--surface)] p-4 transition-colors hover:bg-[var(--hover-bg)] sm:p-5"
            >
              <div
                className={`flex size-10 items-center justify-center rounded-xl ${metric.iconStyle}`}
              >
                <Icon size={19} aria-hidden="true" />
              </div>

              <p className="mt-4 break-words font-mono text-xl font-bold tracking-tight sm:text-2xl">
                {metric.value}
              </p>

              <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)] sm:text-sm">
                {metric.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Response information */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--line)] px-5 py-3 sm:px-7">
        <p className="text-xs text-[var(--text-secondary)]">
          Metrics are based on the returned comparison data.
        </p>

        <p className="text-xs text-[var(--text-secondary)]">
          {Number.isFinite(elapsed)
            ? "Request completed"
            : "Response time unavailable"}
        </p>
      </div>
    </section>
  );
}
