import { AlertTriangle, RefreshCw, ShieldAlert } from "lucide-react";

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <section
      className="overflow-hidden rounded-2xl border border-red-500/30 bg-[var(--surface)] text-[var(--text-primary)] shadow-sm"
      role="alert"
      aria-live="assertive"
    >
      {/* Error header */}
      <div className="flex items-start gap-4 border-b border-red-500/20 bg-red-500/10 p-5 sm:p-6">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-500/15">
          <AlertTriangle
            size={22}
            className="text-red-600 dark:text-red-400"
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold sm:text-lg">
              Comparison could not be completed
            </h3>

            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-600 dark:text-red-400">
              Error
            </span>
          </div>

          <p className="text-sm leading-6 text-[var(--text-secondary)]">
            We couldn&apos;t retrieve the product comparison results. Check the
            details below and try again.
          </p>
        </div>
      </div>

      {/* Error details */}
      <div className="p-5 sm:p-6">
        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-secondary)] p-4">
          <div className="flex items-start gap-2.5">
            <ShieldAlert
              size={17}
              className="mt-0.5 shrink-0 text-[var(--text-secondary)]"
              aria-hidden="true"
            />

            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Error details
              </p>

              <p className="mt-1 break-words text-sm leading-6 text-[var(--text-primary)]">
                {message}
              </p>
            </div>
          </div>
        </div>

        {/* Retry action */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-[var(--text-secondary)]">
            Your next attempt will run the comparison again.
          </p>

          <button
            type="button"
            onClick={onRetry}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[#17210b] shadow-sm transition hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] active:scale-[0.98]"
          >
            <RefreshCw size={16} aria-hidden="true" />
            Try again
          </button>
        </div>
      </div>
    </section>
  );
}
