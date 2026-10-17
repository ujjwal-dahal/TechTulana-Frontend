import { BadgeCheck, Info, PackageSearch, TrendingUp } from "lucide-react";

import type { ComparisonGroup } from "../types/comparison";
import { formatNpr } from "../lib/utils";
import { ProductOfferCard } from "./product-offer-card";

export function ComparisonGroupCard({ group }: { group: ComparisonGroup }) {
  const hasPriceRange = group.price_min !== null && group.price_max !== null;

  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--text-primary)] shadow-sm transition-all duration-200 hover:border-[var(--accent)] hover:shadow-md">
      {/* Product variant header */}
      <div className="border-b border-[var(--line)] p-5 sm:p-6 lg:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-[var(--accent-soft)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
                Product variant
              </span>

              {group.is_comparable ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <BadgeCheck size={14} aria-hidden="true" />
                  Comparable
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
                  <Info size={13} aria-hidden="true" />
                  Comparison uncertain
                </span>
              )}
            </div>

            <h2 className="break-words text-lg font-bold leading-7 tracking-tight sm:text-xl">
              {group.label || "Unspecified variant"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              {group.is_comparable
                ? "Offers are considered comparable by the backend."
                : "Product specifications may be incomplete or the offers may not be directly comparable."}
            </p>
          </div>

          {/* Price range */}
          <div className="shrink-0 rounded-xl border border-[var(--line)] bg-[var(--surface-secondary)] p-4 sm:min-w-44 sm:text-right">
            <p className="text-xs font-medium text-[var(--text-secondary)]">
              Price range
            </p>

            {hasPriceRange ? (
              <>
                <p className="mt-1.5 font-mono text-lg font-bold tracking-tight">
                  NPR {formatNpr(group.price_min!)}
                </p>

                {group.price_max !== group.price_min && (
                  <p className="mt-1 font-mono text-sm text-[var(--text-secondary)]">
                    to NPR {formatNpr(group.price_max!)}
                  </p>
                )}
              </>
            ) : (
              <p className="mt-1.5 text-lg font-semibold text-[var(--text-secondary)]">
                Not available
              </p>
            )}

            {group.spread_percent !== null && (
              <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--text-secondary)]">
                <TrendingUp size={13} aria-hidden="true" />
                {group.spread_percent.toFixed(1)}% price spread
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Offer cards */}
      <div className="p-5 sm:p-6 lg:p-7">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold">Available offers</h3>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Prices and stock reported by each website
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[var(--surface-secondary)] px-2.5 py-1.5 text-xs font-semibold text-[var(--text-secondary)]">
            <PackageSearch size={14} aria-hidden="true" />
            {group.offers.length}{" "}
            {group.offers.length === 1 ? "offer" : "offers"}
          </span>
        </div>

        {/* Explain why a best offer may not exist */}
        {group.best_offer === null && group.offers.length > 0 && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
            <Info
              size={18}
              className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
              aria-hidden="true"
            />

            <div>
              <p className="text-sm font-semibold">No best offer selected</p>
              <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                The backend did not identify a best offer for this group. Offers
                are shown as returned, without selecting a replacement in the
                frontend.
              </p>
            </div>
          </div>
        )}

        {group.offers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {group.offers.map((offer, index) => (
              <ProductOfferCard
                key={`${offer.site_key}-${offer.url}-${index}`}
                offer={offer}
                isBest={
                  group.best_offer !== null &&
                  group.best_offer.url === offer.url
                }
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[var(--line)] bg-[var(--surface-secondary)] px-4 py-10 text-center">
            <PackageSearch
              size={28}
              className="mx-auto text-[var(--text-secondary)]"
              aria-hidden="true"
            />

            <p className="mt-3 text-sm font-semibold">No offers found</p>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              No product offers were returned for this variant.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
