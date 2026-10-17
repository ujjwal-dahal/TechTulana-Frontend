"use client";

import { useRef, useState } from "react";

import { Navbar } from "../components/navbar";
import { HeroSearch } from "../components/hero-search";
import { LoadingState } from "../components/loading-state";
import { ErrorState } from "../components/error-state";
import { ComparisonSummary } from "../components/comparison-summary";
import { WebsiteStatus } from "../components/website-status";
import { ComparisonGroupCard } from "../components/comparison-group";
import { HowItWorks } from "../components/how-it-works";
import { Footer } from "../components/footer";

import { ApiError, compareProduct } from "../lib/api";
import type { CompareResponse } from "../types/comparison";

const statusMessage: Partial<Record<CompareResponse["status"], string>> = {
  invalid_query: "Please enter a product name with at least two characters.",
  unsupported_category: "This product category is not currently supported.",
  no_results: "No matching products were returned by the supported websites.",
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [lastQuery, setLastQuery] = useState("");
  const [response, setResponse] = useState<CompareResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resultsRef = useRef<HTMLElement>(null);

  async function submit(queryOverride?: string) {
    if (loading) return;

    const trimmed = (queryOverride ?? query).trim();

    if (trimmed.length < 2) {
      setError("Enter a product name with at least two characters.");
      return;
    }

    setQuery(trimmed);
    setLastQuery(trimmed);
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const nextResponse = await compareProduct(trimmed);

      setResponse(nextResponse);

      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } catch (caught) {
      setError(
        caught instanceof ApiError
          ? caught.message
          : "An unexpected error occurred. Please try again.",
      );

      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } finally {
      setLoading(false);
    }
  }

  const comparison = response?.comparison;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)]">
        <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 sm:pt-10 lg:px-8">
          <HeroSearch
            query={query}
            onQueryChange={setQuery}
            onSubmit={() => submit()}
            disabled={loading}
          />

          <section
            ref={resultsRef}
            aria-live="polite"
            className="scroll-mt-24 pb-10 pt-10 sm:pt-14"
          >
            {loading && (
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm sm:p-8">
                <LoadingState />
              </div>
            )}

            {!loading && error && (
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm sm:p-8">
                <ErrorState
                  message={error}
                  onRetry={() => submit(lastQuery || query)}
                />
              </div>
            )}

            {!loading && !error && response && (
              <div className="space-y-8">
                {response.status !== "ok" && (
                  <div
                    role="status"
                    className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 sm:p-6"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="size-5"
                          aria-hidden="true"
                        >
                          <path
                            d="M12 9v4m0 4h.01M10.3 3.9 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3l-7.5-13.1a2 2 0 0 0-3.4 0Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      <div>
                        <h2 className="font-semibold text-[var(--text-primary)]">
                          {statusMessage[response.status] ?? response.message}
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                          {response.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {comparison && (
                  <>
                    <ComparisonSummary
                      comparison={comparison}
                      elapsed={response.elapsed_seconds}
                    />

                    {comparison.warnings.length > 0 && (
                      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 sm:p-6">
                        <div className="flex items-center gap-2">
                          <span className="flex size-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              className="size-4"
                              aria-hidden="true"
                            >
                              <path
                                d="M12 9v4m0 4h.01M10.3 3.9 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3l-7.5-13.1a2 2 0 0 0-3.4 0Z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>

                          <h2 className="font-semibold text-[var(--text-primary)]">
                            Important notes
                          </h2>
                        </div>

                        <ul className="mt-4 space-y-2">
                          {comparison.warnings.map((warning, index) => (
                            <li
                              key={`${warning}-${index}`}
                              className="flex items-start gap-2 text-sm leading-6 text-[var(--text-secondary)]"
                            >
                              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-500" />
                              <span>{warning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                          Search activity
                        </p>
                        <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                          Website status
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                          See which supported stores returned product offers.
                        </p>
                      </div>

                      <WebsiteStatus sites={comparison.site_status} />
                    </div>

                    <div className="space-y-5">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Comparison results
                          </p>
                          <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                            Product offers
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                            Review prices, specifications, and stock status.
                          </p>
                        </div>

                        <span className="inline-flex w-fit items-center rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-sm font-medium text-[var(--text-secondary)]">
                          {comparison.groups.length}{" "}
                          {comparison.groups.length === 1
                            ? "variant"
                            : "variants"}
                        </span>
                      </div>

                      {comparison.groups.length > 0 ? (
                        <div className="space-y-5">
                          {comparison.groups.map((group, index) => (
                            <ComparisonGroupCard
                              group={group}
                              key={`${group.variant_key}-${index}`}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface)] px-5 py-12 text-center sm:px-8">
                          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[var(--surface-secondary)] text-[var(--text-secondary)]">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              className="size-7"
                              aria-hidden="true"
                            >
                              <circle cx="11" cy="11" r="7" />
                              <path
                                d="m16 16 4 4M8 11h6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>

                          <h3 className="mt-4 text-base font-semibold">
                            No product offers to display
                          </h3>
                          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
                            No comparison groups were returned for this query.
                            Try another product name or check the website status
                            above.
                          </p>

                          <button
                            type="button"
                            onClick={() => submit(lastQuery || query)}
                            disabled={loading}
                            className="mt-5 inline-flex min-h-10 items-center justify-center rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[#17210b] transition hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-color)] focus-visible:ring-offset-2"
                          >
                            Try again
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </section>

          <div className="border-t border-[var(--line)] pt-12 sm:pt-16">
            <HowItWorks />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
