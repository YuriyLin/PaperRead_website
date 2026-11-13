import { useState, useEffect, useCallback } from 'react';
import { TRANSLATIONS, Lang } from './i18n/translations';
import { Navbar } from './components/Navbar';
import { HeroWorkspace } from './components/HeroWorkspace';
import { WhyPaperRead } from './components/WhyPaperRead';
import { CoreWorkflow } from './components/CoreWorkflow';
import { FlexibleAISupport } from './components/FlexibleAISupport';
import { EngineeringMilestones } from './components/EngineeringMilestones';
import { InstallGuide, InstallTab } from './components/InstallGuide';
import { DataPrivacy } from './components/DataPrivacy';
import { Footer } from './components/Footer';

function detectUserOS(): InstallTab {
  if (typeof navigator === 'undefined') return 'windows';
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('mac')) return 'macos';
  if (ua.includes('linux')) return 'linux';
  return 'windows';
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      return localStorage.getItem('paperread-theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const [lang, setLang] = useState<Lang>('zh');
  const [detectedOS] = useState<InstallTab>(() => detectUserOS());
  const [installTab, setInstallTab] = useState<InstallTab>(() => detectUserOS());
  const [workflowStep, setWorkflowStep] = useState<'01' | '02' | '03' | '04'>('01');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('paperread-theme', theme);
    } catch {
      // Ignore storage failures in restricted contexts
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
  }, [lang]);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
  }, []);

  useEffect(() => {
    if (!toastMsg) return;
    const timer = setTimeout(() => setToastMsg(null), 2400);
    return () => clearTimeout(timer);
  }, [toastMsg]);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      showToast(
        next === 'dark'
          ? lang === 'zh'
            ? '已切換至深色模式 (Dark Mode)'
            : 'Switched to Dark Mode'
          : lang === 'zh'
          ? '已切換至護眼紙張模式 (Paper Light Mode)'
          : 'Switched to Paper Light Mode'
      );
      return next;
    });
  };

  const handleToggleLang = () => {
    setLang((prev) => {
      const next: Lang = prev === 'zh' ? 'en' : 'zh';
      showToast(next === 'zh' ? '已切換為繁體中文介面' : 'Switched interface to English');
      return next;
    });
  };

  const scrollToInstall = (tab: InstallTab) => {
    setInstallTab(tab);
    const el = document.getElementById('install');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const jumpToWorkflowStep = (step: '01' | '02' | '03' | '04') => {
    setWorkflowStep(step);
    const el = document.getElementById('workflow');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const t = TRANSLATIONS[lang];

  return (
    <div id="top" className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      <Navbar
        lang={lang}
        t={t.nav}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onToggleLang={handleToggleLang}
        onDownloadClick={() => scrollToInstall(detectedOS)}
      />

      <main>
        <HeroWorkspace
          lang={lang}
          t={t.hero}
          onDesktopDownload={() => scrollToInstall(detectedOS)}
          onDockerDeploy={() => scrollToInstall('docker')}
          onSelectWorkflowStep={jumpToWorkflowStep}
        />

        <WhyPaperRead t={t.why} />

        <CoreWorkflow
          lang={lang}
          t={t.workflow}
          activeStepId={workflowStep}
          onSelectStep={setWorkflowStep}
          onToast={showToast}
        />

        <FlexibleAISupport lang={lang} t={t.ai} />

        <EngineeringMilestones t={t.engineering} />

        <InstallGuide
          lang={lang}
          t={t.install}
          activeTab={installTab}
          detectedOS={detectedOS}
          onSelectTab={setInstallTab}
          onToast={showToast}
        />

        <DataPrivacy lang={lang} t={t.privacy} />
      </main>

      <Footer t={t.footer} />

      {/* Subtle Toast Feedback */}
      {toastMsg && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-6 bottom-6 z-50 rounded-lg border border-[var(--border-strong)] bg-[var(--text-primary)] px-4 py-2.5 text-xs font-semibold text-[var(--bg-page)] shadow-lg"
        >
          {toastMsg}
        </div>
      )}
    </div>
  );
}
