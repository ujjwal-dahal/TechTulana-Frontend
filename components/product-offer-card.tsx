"use client";

import { useState } from "react";
import {
  ExternalLink,
  PackageCheck,
  ShieldCheck,
  XCircle,
  HelpCircle,
  Store,
} from "lucide-react";

import type { Offer } from "../types/comparison";
import { formatNpr } from "../lib/utils";

export function ProductOfferCard({
  offer,
  isBest,
}: {
  offer: Offer;
  isBest: boolean;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  const stockStyle =
    offer.in_stock === true
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      : offer.in_stock === false
        ? "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
        : "border-[var(--line)] bg-[var(--surface-secondary)] text-[var(--text-secondary)]";

  const stockLabel =
    offer.in_stock === true
      ? "In stock"
      : offer.in_stock === false
        ? "Out of stock"
        : "Stock unknown";

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-[var(--surface)] text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        isBest
          ? "border-[var(--accent)] ring-1 ring-[var(--accent)]/30"
          : "border-[var(--line)] hover:border-[var(--accent)]/60"
      }`}
    >
      {/* Best offer label comes only from the backend */}
      {isBest && (
        <div className="flex items-center gap-2 border-b border-[var(--accent)]/25 bg-[var(--accent-soft)] px-4 py-2.5">
          <ShieldCheck
            size={16}
            className="shrink-0 text-[var(--accent)]"
            aria-hidden="true"
          />
          <span className="text-xs font-bold text-[var(--text-primary)]">
            Backend-selected best offer
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Product image and details */}
        <div className="flex items-start gap-4">
          <div className="grid size-24 shrink-0 place-items-center overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface-secondary)] sm:size-28">
            {offer.image && !imageFailed ? (
              <img
                src={offer.image}
                alt={offer.product_name}
                loading="lazy"
                onError={() => setImageFailed(true)}
                className="size-full object-contain p-2"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-[var(--text-secondary)]">
                <Store size={28} aria-hidden="true" />
                <span className="text-[10px] font-medium">No image</span>
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
              {offer.site_name}
            </p>

            <h3 className="line-clamp-3 break-words text-sm font-semibold leading-6 sm:text-base">
              {offer.product_name}
            </h3>

            <div className="mt-3">
              <p className="text-xs font-medium text-[var(--text-secondary)]">
                Listed price
              </p>

              <p className="mt-0.5 break-words font-mono text-xl font-bold tracking-tight sm:text-2xl">
                NPR {formatNpr(offer.price)}
              </p>

              {offer.regular_price !== null &&
                offer.regular_price > offer.price && (
                  <p className="mt-1 font-mono text-sm text-[var(--text-secondary)] line-through">
                    NPR {formatNpr(offer.regular_price)}
                  </p>
                )}
            </div>
          </div>
        </div>

        {/* Stock and verification badges */}
        <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--line)] pt-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-semibold ${stockStyle}`}
          >
            {offer.in_stock === true ? (
              <PackageCheck size={14} aria-hidden="true" />
            ) : offer.in_stock === false ? (
              <XCircle size={14} aria-hidden="true" />
            ) : (
              <HelpCircle size={14} aria-hidden="true" />
            )}

            {stockLabel}
          </span>

          <span
            title="Product identity validation status"
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium ${
              offer.verified
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "border-[var(--line)] bg-[var(--surface-secondary)] text-[var(--text-secondary)]"
            }`}
          >
            <ShieldCheck size={13} aria-hidden="true" />
            Product {offer.verified ? "verified" : "unverified"}
          </span>

          <span
            title="Product specification verification status"
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium ${
              offer.specs_verified
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "border-[var(--line)] bg-[var(--surface-secondary)] text-[var(--text-secondary)]"
            }`}
          >
            <ShieldCheck size={13} aria-hidden="true" />
            Specs {offer.specs_verified ? "verified" : "unverified"}
          </span>
        </div>

        {/* Backend-provided offer flags */}
        {offer.flags.length > 0 && (
          <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2.5">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
              Important notes
            </p>

            <ul className="mt-1 space-y-1">
              {offer.flags.map((flag, index) => (
                <li
                  key={`${flag}-${index}`}
                  className="text-xs leading-5 text-[var(--text-secondary)]"
                >
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Open the original seller page */}
        <div className="mt-auto pt-5">
          <a
            href={offer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[#17210b] transition hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]"
          >
            View product on {offer.site_name}
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
