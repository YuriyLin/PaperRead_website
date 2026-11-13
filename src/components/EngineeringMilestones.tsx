import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CircleDot,
  Copy,
  GitPullRequest,
  Terminal,
} from 'lucide-react';
import { Translations } from '../i18n/translations';

interface EngineeringMilestonesProps {
  t: Translations['engineering'];
}

const DEV_TEST_COMMANDS = `git clone https://github.com/YuriyLin/PaperRead.git
cd PaperRead && python -m pip install -e .
python -m unittest discover tests -v
node --test tests/test_*.cjs
python scripts/i18n_check.py`;

export function EngineeringMilestones({ t }: EngineeringMilestonesProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyDevCmd = async () => {
    try {
      await navigator.clipboard.writeText(DEV_TEST_COMMANDS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore clipboard failures in restricted environments
    }
  };

  return (
    <section
      id="engineering"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-page)] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="max-w-2xl">
          <div className="font-code text-xs font-semibold tracking-[0.14em] text-[var(--accent-amber)]">
            {t.eyebrow}
          </div>
          <h2 className="text-balance mt-2.5 text-2xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {t.title}
          </h2>
          <p className="mt-3.5 text-base leading-relaxed text-[var(--text-secondary)]">{t.desc}</p>
        </div>

        {/* System Architecture Ribbon */}
        <div className="mt-10">
          <div className="mb-3 text-xs font-semibold text-[var(--accent-amber)]">
            {t.archLabel}
          </div>
          <div className="grid grid-cols-1 gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-sage)] p-5 md:grid-cols-3">
            {t.archLayers.map((layer, idx) => (
              <div key={layer.title} className="flex items-center gap-3">
                <div className="flex-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 text-center">
                  <div className="text-sm font-bold text-[var(--text-primary)]">{layer.title}</div>
                  <div className="mt-1.5 space-y-0.5 text-xs text-[var(--text-secondary)]">
                    {layer.items.map((item) => (
                      <div key={item}>{item}</div>
                    ))}
                  </div>
                </div>
                {idx < t.archLayers.length - 1 && (
                  <ArrowRight className="hidden h-4 w-4 shrink-0 text-[var(--text-muted)] md:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Release Milestones Timeline */}
        <div className="mt-10">
          <div className="mb-3 text-xs font-semibold text-[var(--accent-amber)]">
            {t.milestonesLabel}
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {t.milestones.map((m) => (
              <div
                key={m.version}
                className={`rounded-xl border p-4 ${
                  m.current
                    ? 'border-[var(--accent-indigo)] bg-[var(--bg-sage)]'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-surface)]'
                }`}
              >
                <div className="font-code text-[11px] font-medium text-[var(--text-muted)]">
                  {m.date}
                </div>
                <div className="font-code mt-1 text-base font-bold text-[var(--text-primary)]">
                  {m.version}
                </div>
                <div className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {m.summary}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verifiable Community Issue Fixes */}
        <div className="mt-10">
          <h3 className="text-base font-bold text-[var(--text-primary)]">{t.issuesTitle}</h3>
          <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
            {t.issues.map((issue) => (
              <a
                key={issue.id}
                href={issue.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 transition-all hover:border-[var(--accent-indigo)]"
              >
                <div>
                  <div className="font-code flex items-center justify-between text-[11px] font-semibold text-[var(--accent-amber)]">
                    <span>{issue.id}</span>
                    <span className="text-[var(--text-muted)]">{issue.status}</span>
                  </div>
                  <h4 className="mt-2.5 text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-indigo)]">
                    {issue.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                    {issue.desc}
                  </p>
                </div>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-indigo)]">
                  <span>GitHub Issue</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Open Source Contribution & Issue / PR Format Guide (CONTRIBUTING.md) */}
        <div className="mt-10 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 lg:p-8">
          <div className="flex flex-col justify-between gap-6 border-b border-[var(--border-subtle)] pb-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="font-code text-[11px] font-semibold tracking-[0.12em] text-[var(--accent-amber)]">
                {t.contribute.eyebrow}
              </div>
              <h3 className="mt-2 text-xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-2xl">
                {t.contribute.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                {t.contribute.desc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href="https://github.com/YuriyLin/PaperRead/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent-indigo)] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--accent-indigo-hover)]"
              >
                <CircleDot className="h-3.5 w-3.5" />
                <span>{t.contribute.ctaIssue}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://github.com/YuriyLin/PaperRead/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface-2)] px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-indigo)]"
              >
                <BookOpen className="h-3.5 w-3.5 text-[var(--accent-amber)]" />
                <span>{t.contribute.ctaContributing}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://github.com/YuriyLin/PaperRead/pulls"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] px-3.5 py-2 text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              >
                <GitPullRequest className="h-3.5 w-3.5" />
                <span>{t.contribute.ctaPr}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Issue Format */}
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
                <CircleDot className="h-4 w-4 text-[var(--accent-amber)]" />
                <span>{t.contribute.issueFormatTitle}</span>
              </div>
              <ul className="mt-3.5 space-y-2.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                {t.contribute.issueFormatItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="font-code mt-0.5 shrink-0 text-[11px] font-bold text-[var(--accent-indigo)]">
                      0{idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* PR & i18n Conventions */}
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
                <GitPullRequest className="h-4 w-4 text-[var(--accent-indigo)]" />
                <span>{t.contribute.prRulesTitle}</span>
              </div>
              <ul className="mt-3.5 space-y-2.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                {t.contribute.prRulesItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="font-code mt-0.5 shrink-0 text-[11px] font-bold text-[var(--accent-amber)]">
                      0{idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyable Local Dev & Automated Check Commands */}
          <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[#0F172A] text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <Terminal className="h-3.5 w-3.5 text-amber-400" />
                <span>{t.contribute.devCmdTitle}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyDevCmd}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-[11px] font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-700"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-300">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="font-code overflow-x-auto p-4 text-xs leading-relaxed text-slate-200">
              <code>{DEV_TEST_COMMANDS}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
