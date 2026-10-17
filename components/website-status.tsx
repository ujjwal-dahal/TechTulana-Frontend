import {
  CheckCircle2,
  CircleAlert,
  CircleX,
  Globe2,
  Clock3,
  PackageSearch,
} from "lucide-react";

import type { SiteStatus } from "../types/comparison";
import { formatSeconds } from "../lib/utils";

export function WebsiteStatus({ sites }: { sites: SiteStatus[] }) {
  const successful = sites.filter((site) => site.status === "ok").length;
  const empty = sites.filter((site) => site.status === "empty").length;
  const failed = sites.filter(
    (site) => site.status !== "ok" && site.status !== "empty",
  ).length;

  const statusConfig = {
    ok: {
      label: "Success",
      icon: CheckCircle2,
      style:
        "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      iconStyle: "text-emerald-600 dark:text-emerald-400",
    },
    empty: {
      label: "No offers",
      icon: CircleAlert,
      style:
        "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
      iconStyle: "text-amber-600 dark:text-amber-400",
    },
    error: {
      label: "Failed",
      icon: CircleX,
      style: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
      iconStyle: "text-red-600 dark:text-red-400",
    },
  } as const;

  return (
    <section>
      {/* Section heading */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
            <Globe2 size={15} aria-hidden="true" />
            Source health
          </div>

          <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl">
            Supported websites
          </h2>

          <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
            Check which sources returned product data.
          </p>
        </div>

        <span className="inline-flex w-fit items-center rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)]">
          {sites.length} {sites.length === 1 ? "website" : "websites"} reported
        </span>
      </div>

      {/* Status overview */}
      <div className="mb-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-3 sm:p-4">
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Successful
          </p>
          <p className="mt-1 font-mono text-2xl font-bold text-[var(--text-primary)]">
            {successful}
          </p>
        </div>

        <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-3 sm:p-4">
          <p className="text-xs font-medium text-amber-700 dark:text-amber-300">
            No offers
          </p>
          <p className="mt-1 font-mono text-2xl font-bold text-[var(--text-primary)]">
            {empty}
          </p>
        </div>

        <div className="rounded-xl border border-red-500/25 bg-red-500/5 p-3 sm:p-4">
          <p className="text-xs font-medium text-red-600 dark:text-red-400">
            Failed
          </p>
          <p className="mt-1 font-mono text-2xl font-bold text-[var(--text-primary)]">
            {failed}
          </p>
        </div>
      </div>

      {/* Website status list */}
      <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--text-primary)] shadow-sm">
        {sites.length > 0 ? (
          <div className="divide-y divide-[var(--line)]">
            {sites.map((site, index) => {
              const config =
                site.status === "ok"
                  ? statusConfig.ok
                  : site.status === "empty"
                    ? statusConfig.empty
                    : statusConfig.error;

              const Icon = config.icon;

              return (
                <article
                  key={`${site.name}-${index}`}
                  className="flex flex-col gap-3 p-4 transition-colors hover:bg-[var(--hover-bg)] sm:flex-row sm:items-center sm:gap-4 sm:p-5"
                >
                  {/* Website icon */}
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-secondary)]">
                    <Globe2
                      size={21}
                      className="text-[var(--accent)]"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Website name and message */}
                  <div className="min-w-0 flex-1">
                    <h3 className="break-words text-sm font-semibold sm:text-base">
                      {site.name}
                    </h3>

                    <p className="mt-1 break-words text-sm leading-5 text-[var(--text-secondary)]">
                      {site.message}
                    </p>
                  </div>

                  {/* Offer count and response time */}
                  <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                    <div className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                      <PackageSearch
                        size={15}
                        className="text-[var(--accent)]"
                        aria-hidden="true"
                      />
                      <span>
                        {site.found_count}{" "}
                        {site.found_count === 1 ? "offer" : "offers"}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                      <Clock3
                        size={15}
                        className="text-[var(--text-secondary)]"
                        aria-hidden="true"
                      />
                      <span>{formatSeconds(site.elapsed_seconds)}</span>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className="sm:w-28 sm:text-right">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-semibold ${config.style}`}
                    >
                      <Icon
                        size={14}
                        className={config.iconStyle}
                        aria-hidden="true"
                      />
                      {config.label}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="px-4 py-10 text-center">
            <Globe2
              size={30}
              className="mx-auto text-[var(--text-secondary)]"
              aria-hidden="true"
            />

            <p className="mt-3 text-sm font-semibold text-[var(--text-primary)]">
              No website status available
            </p>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Website status information was not returned for this request.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
