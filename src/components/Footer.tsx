import { Translations } from '../i18n/translations';

interface FooterProps {
  t: Translations['footer'];
}

export function Footer({ t }: FooterProps) {
  const repoBase = 'https://github.com/YuriyLin/PaperRead';

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-14">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand Summary */}
          <div>
            <div className="flex items-center gap-2.5 font-bold text-[var(--text-primary)]">
              <img
                src={`${import.meta.env.BASE_URL}paperread/paperread-mark.png`}
                alt="PaperRead"
                className="h-7 w-7 shrink-0 object-contain mix-blend-multiply dark:invert dark:mix-blend-screen"
              />
              <span className="text-base">PaperRead</span>
              <span className="font-code text-xs font-medium text-[var(--text-muted)]">v1.5.2</span>
            </div>
            <p className="mt-3.5 max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
              {t.tagline}
            </p>
          </div>

          {/* Documentation Links */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-[var(--text-primary)]">
              {t.docsHeading}
            </h4>
            <ul className="mt-3.5 space-y-2.5 text-sm text-[var(--text-secondary)]">
              <li>
                <a
                  href={`${repoBase}#readme`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-indigo)] hover:underline"
                >
                  {t.links.guide}
                </a>
              </li>
              <li>
                <a
                  href={`${repoBase}/tree/main/docs`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-indigo)] hover:underline"
                >
                  {t.links.design}
                </a>
              </li>
              <li>
                <a
                  href={`${repoBase}/tree/main/docs`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-indigo)] hover:underline"
                >
                  {t.links.format}
                </a>
              </li>
              <li>
                <a
                  href={`${repoBase}/tree/main/docs`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-indigo)] hover:underline"
                >
                  {t.links.api}
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Issues Links */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-[var(--text-primary)]">
              {t.communityHeading}
            </h4>
            <ul className="mt-3.5 space-y-2.5 text-sm text-[var(--text-secondary)]">
              <li>
                <a
                  href={`${repoBase}/blob/main/CHANGELOG.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-indigo)] hover:underline"
                >
                  {t.links.changelog}
                </a>
              </li>
              <li>
                <a
                  href={`${repoBase}/blob/main/CONTRIBUTING.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-indigo)] hover:underline"
                >
                  {t.links.contributing}
                </a>
              </li>
              <li>
                <a
                  href={`${repoBase}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-indigo)] hover:underline"
                >
                  {t.links.issues}
                </a>
              </li>
              <li>
                <a
                  href={repoBase}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-indigo)] hover:underline"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-muted)] md:flex-row md:items-center">
          <div>{t.licenseNote}</div>
          <div>{t.creditsNote}</div>
        </div>
      </div>
    </footer>
  );
}
