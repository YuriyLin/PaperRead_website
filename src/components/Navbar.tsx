import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Star, Download, Languages } from 'lucide-react';
import { Lang, Translations } from '../i18n/translations';

interface NavbarProps {
  lang: Lang;
  t: Translations['nav'];
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onToggleLang: () => void;
  onDownloadClick: () => void;
}

export function Navbar({
  t,
  theme,
  onToggleTheme,
  onToggleLang,
  onDownloadClick,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const navItems = [
    { href: '#workflow', id: 'workflow', label: t.workflow },
    { href: '#ai-models', id: 'ai-models', label: t.ai },
    { href: '#engineering', id: 'engineering', label: t.engineering },
    { href: '#install', id: 'install', label: t.install },
    { href: '#privacy', id: 'privacy', label: t.privacy },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      let current = '';
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          current = item.id;
          break;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-page)]/88 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-6">
        {/* Left: Real PaperRead Logo & Version */}
        <a
          href="#top"
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap font-bold tracking-tight text-[var(--text-primary)]"
        >
          <img
            src={`${import.meta.env.BASE_URL}paperread/paperread-mark.png`}
            alt="PaperRead"
            className="h-7 w-7 shrink-0 object-contain mix-blend-multiply dark:invert dark:mix-blend-screen"
          />
          <span className="text-lg">PaperRead</span>
          <span className="font-code tabular-nums text-xs font-medium text-[var(--text-muted)]">
            v1.5.2
          </span>
        </a>

        {/* Center: Anchor Navigation */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary Navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`relative shrink-0 whitespace-nowrap py-1 text-sm font-medium transition-colors hover:text-[var(--text-primary)] ${
                activeSection === item.id
                  ? 'text-[var(--accent-indigo)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[var(--accent-indigo)]'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Utilities & Primary CTA */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            title={theme === 'dark' ? t.themeToLight : t.themeToDark}
            aria-label={theme === 'dark' ? t.themeToLight : t.themeToDark}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-[var(--accent-indigo)]"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={onToggleLang}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-[var(--accent-indigo)]"
          >
            <Languages className="h-3.5 w-3.5" />
            <span>{t.langSwitchLabel}</span>
          </button>

          <a
            href="https://github.com/YuriyLin/PaperRead"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-2)] sm:inline-flex"
          >
            <Star className="h-3.5 w-3.5 text-[var(--accent-amber)]" />
            <span>GitHub</span>
            <span className="font-code tabular-nums text-[var(--text-muted)]">350+</span>
          </a>

          <button
            type="button"
            onClick={onDownloadClick}
            className="hidden h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-[var(--accent-indigo)] px-4 text-xs font-semibold text-white transition-colors hover:bg-[var(--accent-indigo-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-indigo)] md:inline-flex"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{t.download}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)]"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-2 border-t border-[var(--border-subtle)] pt-3">
              <a
                href="https://github.com/YuriyLin/PaperRead"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-xs font-semibold text-[var(--text-primary)]"
              >
                <Star className="h-3.5 w-3.5 text-[var(--accent-amber)]" />
                <span>GitHub (350+ ★)</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onDownloadClick();
                }}
                className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg bg-[var(--accent-indigo)] text-xs font-semibold text-white"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{t.download}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
