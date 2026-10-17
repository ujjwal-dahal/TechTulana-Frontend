"use client";

import { ArrowRight, Search, Sparkles } from "lucide-react";

const suggestions = [
  "MacBook Air M4",
  "MacBook Pro M5",
  "iPhone",
  "Samsung Galaxy",
];

type HeroSearchProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
};

export function HeroSearch({
  query,
  onQueryChange,
  onSubmit,
  disabled,
}: HeroSearchProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] px-5 py-12 text-[var(--text-primary)] shadow-sm sm:px-10 sm:py-16 lg:px-14 lg:py-20">
      {/* Electric Lime background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 -z-10 size-80 rounded-full bg-lime-400/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-20 -z-10 size-72 rounded-full bg-lime-500/10 blur-3xl"
      />

      <div className="mx-auto max-w-3xl text-center">
        {/* Eyebrow label */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-4 py-2 text-xs font-semibold tracking-wide text-[var(--accent)] sm:text-sm">
          <Sparkles size={15} aria-hidden="true" />
          Price intelligence for Nepal
        </div>

        {/* Main heading */}
        <h1 className="text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
          Find the right product.
          <span className="mt-2 block text-[var(--accent)]">
            Compare the right price.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
          Compare product offers, check specifications, and explore prices from
          supported online stores in Nepal.
        </p>

        {/* Search form */}
        <form
          id="compare"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
          className="mx-auto mt-9 max-w-2xl"
        >
          <div className="group flex flex-col gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-2 shadow-lg shadow-black/5 transition focus-within:border-[var(--accent)] focus-within:ring-4 focus-within:ring-[var(--accent)]/15 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
              <Search
                size={21}
                className="shrink-0 text-[var(--text-secondary)] transition group-focus-within:text-[var(--accent)]"
                aria-hidden="true"
              />

              <label className="sr-only" htmlFor="product-query">
                Product to compare
              </label>

              <input
                id="product-query"
                type="search"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search MacBook, iPhone, Samsung..."
                autoComplete="off"
                disabled={disabled}
                className="min-w-0 flex-1 border-0 bg-transparent py-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)] disabled:cursor-not-allowed sm:text-base"
              />
            </div>

            <button
              type="submit"
              disabled={disabled || query.trim().length < 2}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#17210b] shadow-sm transition hover:opacity-85 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)]/30 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6"
            >
              {disabled ? "Comparing..." : "Compare prices"}

              {!disabled && <ArrowRight size={17} aria-hidden="true" />}
            </button>
          </div>

          {/* Suggested product searches */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="mr-1 text-xs font-medium text-[var(--text-secondary)]">
              Popular searches
            </span>

            {suggestions.map((suggestion) => (
              <button
                type="button"
                key={suggestion}
                disabled={disabled}
                onClick={() => onQueryChange(suggestion)}
                className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </form>

        {/* Trust note */}
        <p className="mt-6 text-xs leading-5 text-[var(--text-secondary)] sm:text-sm">
          Prices and availability depend on the data returned by supported
          stores.
        </p>
      </div>
    </section>
  );
}
