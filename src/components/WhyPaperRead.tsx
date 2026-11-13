import { Layers, BookOpenCheck, HardDrive, ArrowRight } from 'lucide-react';
import { Translations } from '../i18n/translations';

interface WhyPaperReadProps {
  t: Translations['why'];
}

export function WhyPaperRead({ t }: WhyPaperReadProps) {
  const icons = [Layers, BookOpenCheck, HardDrive];

  return (
    <section id="why-paperread" className="py-16 lg:py-24">
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

        {/* 4-Stage Research Flow Ribbon (Explore -> Organize -> Read -> Connect) */}
        <div className="mt-10">
          <div className="mb-3 text-xs font-semibold text-[var(--accent-amber)]">
            {t.flowTitle}
          </div>
          <div className="grid grid-cols-1 gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-sage)] p-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.flowSteps.map((step, idx) => (
              <div key={step.title} className="flex items-center gap-3">
                <div className="flex-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3.5">
                  <div className="text-sm font-bold text-[var(--text-primary)]">{step.title}</div>
                  <div className="mt-0.5 text-xs text-[var(--text-secondary)]">{step.desc}</div>
                </div>
                {idx < t.flowSteps.length - 1 && (
                  <ArrowRight className="hidden h-4 w-4 shrink-0 text-[var(--text-muted)] lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3-Column Pain vs. Solution Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.cards.map((card, idx) => {
            const Icon = icons[idx] || Layers;
            return (
              <article
                key={card.title}
                className="flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 transition-all hover:border-[var(--border-strong)]"
              >
                <div>
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-[var(--accent-indigo)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {card.summary}
                  </p>
                </div>

                <div className="mt-6 space-y-3 border-t border-[var(--border-subtle)] pt-5 text-xs leading-relaxed">
                  <div>
                    <span className="font-semibold text-[#9E5A5A] dark:text-[#C88A8A]">
                      {t.painLabel} ·{' '}
                    </span>
                    <span className="text-[var(--text-muted)]">{card.pain}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[var(--accent-teal)]">
                      {t.solveLabel} ·{' '}
                    </span>
                    <span className="text-[var(--text-primary)]">{card.solve}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Open Source Attribution (EasyRead Foundation & PaperRead Extensions) */}
        <div className="mt-14">
          <div className="font-code text-xs font-semibold tracking-[0.14em] text-[var(--accent-amber)]">
            {t.attributionEyebrow}
          </div>
          <h3 className="mt-2 text-xl font-bold text-[var(--text-primary)]">
            {t.attributionTitle}
          </h3>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-sage)] p-6">
              <div className="text-sm font-bold text-[var(--text-primary)]">{t.easyreadTitle}</div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {t.easyreadDesc}
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-6">
              <div className="text-sm font-bold text-[var(--text-primary)]">
                {t.paperreadTitle}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {t.paperreadDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
