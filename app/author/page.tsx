import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Linkedin,
  Code2,
  Terminal,
  GitCompareArrows,
  MapPin,
} from "lucide-react";

import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";

export const metadata: Metadata = {
  title: "About the Creator | TechTulana",
  description:
    "Meet Ujjwal Dahal, the developer behind TechTulana Nepal, an electronics price comparison platform.",
};

const skills = [
  "Python",
  "FastAPI",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "AI Agents",
  "LangChain",
];

const projectDetails = [
  "Compare electronics across stores",
  "Match products accurately",
  "Discover better prices",
  "Track price changes",
];

const githubUrl = "https://github.com/ujjwal-dahal";
const linkedinUrl = "https://www.linkedin.com/in/brightnessujjwal/";

export default function AuthorPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] transition-colors duration-200">
        {/* Intro */}
        <section className="border-b border-[var(--line)]">
          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--accent)]"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to TechTulana
            </Link>

            <div className="grid gap-10 py-14 md:grid-cols-[1fr_auto] md:items-end md:py-20">
              <div>
                <p className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                  <span className="size-2 rounded-full bg-[var(--accent)]" />
                  The person behind the project
                </p>

                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
                  Building useful things
                  <span className="block text-[var(--text-secondary)]">
                    with code and curiosity.
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                  I&apos;m Ujjwal Dahal, a full-stack developer interested in
                  AI-powered products, practical software and better digital
                  experiences.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#17210b] transition hover:opacity-85"
                  >
                    <Github size={18} aria-hidden="true" />
                    GitHub
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>

                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] px-5 py-3 text-sm font-medium transition hover:border-[var(--accent)] hover:bg-[var(--hover-bg)]"
                  >
                    <Linkedin size={18} aria-hidden="true" />
                    LinkedIn
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Developer code card */}
              <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 md:w-72">
                <div className="flex items-center gap-2 border-b border-[var(--line)] pb-4">
                  <span className="size-2.5 rounded-full bg-red-400" />
                  <span className="size-2.5 rounded-full bg-yellow-400" />
                  <span className="size-2.5 rounded-full bg-green-400" />
                  <span className="ml-2 font-mono text-xs text-[var(--text-secondary)]">
                    developer.ts
                  </span>
                </div>

                <div className="space-y-3 py-5 font-mono text-sm">
                  <p className="text-[var(--text-secondary)]">
                    <span className="text-purple-500 dark:text-purple-400">
                      const
                    </span>{" "}
                    developer = {"{"}
                  </p>

                  <p className="pl-4">
                    <span className="text-[var(--accent)]">name</span>:{" "}
                    <span className="text-amber-600 dark:text-amber-300">
                      &quot;Ujjwal Dahal&quot;
                    </span>
                    ,
                  </p>

                  <p className="pl-4">
                    <span className="text-[var(--accent)]">focus</span>:{" "}
                    <span className="text-amber-600 dark:text-amber-300">
                      &quot;Full-stack + AI&quot;
                    </span>
                    ,
                  </p>

                  <p className="pl-4">
                    <span className="text-[var(--accent)]">basedIn</span>:{" "}
                    <span className="text-amber-600 dark:text-amber-300">
                      &quot;Nepal&quot;
                    </span>
                  </p>

                  <p className="text-[var(--text-secondary)]">{"}"}</p>
                </div>

                <div className="flex items-center gap-2 border-t border-[var(--line)] pt-4 text-xs text-[var(--text-secondary)]">
                  <MapPin size={14} aria-hidden="true" />
                  Nepal
                  <span className="ml-auto font-mono">available for ideas</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About and project */}
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Terminal size={20} aria-hidden="true" />
                </span>
                <h2 className="text-xl font-semibold">A little about me</h2>
              </div>

              <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
                <p>
                  I enjoy building applications from the backend to the
                  frontend, learning how systems work and turning ideas into
                  working products.
                </p>
                <p>
                  My interests include APIs, web development, AI agents and
                  creating software that solves everyday problems rather than
                  adding complexity.
                </p>
                <p>
                  I use projects like TechTulana to explore these ideas through
                  practical development, experimentation and iteration.
                </p>
              </div>
            </article>

            <aside className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface-secondary)] p-6 sm:p-8">
              <div className="absolute -right-10 -top-10 size-36 rounded-full bg-[var(--accent)] opacity-10 blur-2xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-[var(--accent)] text-[#17210b]">
                    <GitCompareArrows size={22} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-[var(--text-secondary)]">
                    PROJECT / 01
                  </span>
                </div>

                <h2 className="mt-7 text-2xl font-semibold">TechTulana</h2>

                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  A Nepal-focused electronics price comparison platform designed
                  to help people compare products across supported online stores
                  before buying.
                </p>

                <ul className="mt-6 space-y-3">
                  {projectDetails.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-center gap-3 text-sm text-[var(--text-primary)]"
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                        <span className="size-1.5 rounded-full bg-current" />
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition hover:gap-3"
                >
                  Explore TechTulana
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>

          {/* Skills */}
          <section className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                  Current toolkit
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Technologies &amp; interests
                </h2>
              </div>
              <Code2
                size={22}
                className="text-[var(--text-secondary)]"
                aria-hidden="true"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-[var(--line)] bg-[var(--surface-secondary)] px-3.5 py-2 font-mono text-xs text-[var(--text-primary)] transition hover:border-[var(--accent)] hover:bg-[var(--hover-bg)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="mt-6 flex flex-col gap-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                Open to connecting
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                Have an interesting idea?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
                Find my work on GitHub or connect with me on LinkedIn.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[#17210b] transition hover:opacity-85"
              >
                <Github size={17} aria-hidden="true" />
                GitHub
              </a>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] px-4 py-3 text-sm font-medium transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <Linkedin size={17} aria-hidden="true" />
                LinkedIn
              </a>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
}
