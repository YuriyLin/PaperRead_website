import { useState } from 'react';
import { Monitor, Apple, Terminal, Container, Check, Copy, ArrowUpRight } from 'lucide-react';
import { Lang, Translations } from '../i18n/translations';

export type InstallTab = 'windows' | 'macos' | 'linux' | 'docker';

interface InstallGuideProps {
  lang: Lang;
  t: Translations['install'];
  activeTab: InstallTab;
  detectedOS: InstallTab;
  onSelectTab: (tab: InstallTab) => void;
  onToast: (msg: string) => void;
}

export function InstallGuide({
  lang,
  t,
  activeTab,
  detectedOS,
  onSelectTab,
  onToast,
}: InstallGuideProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const linuxCommand = `chmod +x PaperRead-*.AppImage\n./PaperRead-*.AppImage`;
  const dockerCommand = `docker pull ghcr.io/yuriylin/paperread:v1.5.4\ndocker run -d --name paperread --restart unless-stopped -p 8765:8765 -v paperread-data:/data/PaperRead ghcr.io/yuriylin/paperread:v1.5.4`;

  const copyCommand = async (id: string, cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedId(id);
      onToast(
        lang === 'zh' ? '終端機指令已複製到剪貼簿' : 'Terminal command copied to clipboard'
      );
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      onToast(lang === 'zh' ? '無法自動複製，請手動選取指令' : 'Please copy the command manually');
    }
  };

  const detectedLabel =
    detectedOS === 'windows'
      ? 'Windows (x64)'
      : detectedOS === 'macos'
      ? 'macOS (Apple Silicon)'
      : 'Linux (x64)';

  return (
    <section
      id="install"
      className="border-y border-[var(--border-subtle)] bg-[var(--bg-surface-2)] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="font-code text-xs font-semibold tracking-[0.14em] text-[var(--accent-amber)]">
            {t.eyebrow}
          </div>
          <h2 className="text-balance mt-2.5 text-2xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {t.title}
          </h2>
          <p className="mt-3.5 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {t.descPrefix}{' '}
            <span className="font-semibold text-[var(--accent-teal)]">
              {t.detectedPrefix} {detectedLabel}
            </span>
          </p>
        </div>

        {/* Platform Switcher Card */}
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-sm">
          {/* Tabs */}
          <div
            className="flex flex-wrap items-center gap-1 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-2"
            role="tablist"
          >
            {(
              [
                { id: 'windows', label: t.tabs.windows, icon: Monitor },
                { id: 'macos', label: t.tabs.macos, icon: Apple },
                { id: 'linux', label: t.tabs.linux, icon: Terminal },
                { id: 'docker', label: t.tabs.docker, icon: Container },
              ] as const
            ).map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectTab(id)}
                  className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                    isActive
                      ? 'bg-[var(--bg-surface)] text-[var(--accent-indigo)] shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === 'windows' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  {lang === 'zh'
                    ? 'Windows (x64) Setup 安裝指南'
                    : 'Windows (x64) Desktop Installer'}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {lang === 'zh'
                    ? '從 GitHub Releases 下載 PaperRead-Setup-1.5.4.exe 安裝程式，雙擊執行精靈即可完成本機安裝並建立桌面捷徑。'
                    : 'Download PaperRead-Setup-1.5.4.exe from GitHub Releases and run the setup wizard to install PaperRead locally.'}
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="https://github.com/YuriyLin/PaperRead/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--accent-indigo)] px-4 text-xs font-semibold text-white hover:bg-[var(--accent-indigo-hover)] sm:text-sm"
                  >
                    <span>
                      {lang === 'zh'
                        ? '下載 Windows Setup (v1.5.4)'
                        : 'Download Windows Setup (v1.5.4)'}
                    </span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <span className="font-code text-xs text-[var(--text-muted)]">
                    C:\Users\&lt;{lang === 'zh' ? '使用者名稱' : 'username'}&gt;\PaperRead
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'macos' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  {lang === 'zh'
                    ? 'macOS (Apple Silicon) DMG 安裝指南'
                    : 'macOS (Apple Silicon) DMG Setup'}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {lang === 'zh'
                    ? '下載 arm64 DMG 映像檔（PaperRead-1.5.4-arm64.dmg），開啟後將 PaperRead.app 拖曳至 Applications 資料夾即可啟動。'
                    : 'Download the arm64 DMG image (PaperRead-1.5.4-arm64.dmg), open it, and drag PaperRead.app into your Applications folder.'}
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="https://github.com/YuriyLin/PaperRead/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--accent-indigo)] px-4 text-xs font-semibold text-white hover:bg-[var(--accent-indigo-hover)] sm:text-sm"
                  >
                    <span>
                      {lang === 'zh'
                        ? '下載 macOS arm64 DMG (v1.5.4)'
                        : 'Download macOS arm64 DMG (v1.5.4)'}
                    </span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <span className="font-code text-xs text-[var(--text-muted)]">~/PaperRead</span>
                </div>
              </div>
            )}

            {activeTab === 'linux' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  {lang === 'zh'
                    ? 'Linux (x64) AppImage 安裝與啟動'
                    : 'Linux (x64) AppImage Quick Start'}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {lang === 'zh'
                    ? '從 GitHub Releases 下載 AppImage 檔案後，在終端機賦予執行權限即可直接啟動：'
                    : 'Download the AppImage from GitHub Releases, make it executable, and launch directly:'}
                </p>

                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[var(--bg-code)] p-4">
                  <button
                    type="button"
                    onClick={() => copyCommand('linux', linuxCommand)}
                    className="absolute top-3 right-3 inline-flex h-8 items-center gap-1.5 rounded-md bg-white/10 px-3 text-xs font-semibold text-slate-100 transition-colors hover:bg-white/20"
                  >
                    {copiedId === 'linux' ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>{copiedId === 'linux' ? t.copiedBtn : t.copyBtn}</span>
                  </button>
                  <pre className="font-code overflow-x-auto pr-28 text-xs leading-relaxed text-slate-200 sm:text-sm">
                    {linuxCommand}
                  </pre>
                </div>

                <a
                  href="https://github.com/YuriyLin/PaperRead/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-indigo)] hover:underline"
                >
                  <span>
                    {lang === 'zh' ? '前往 GitHub Releases 下載 AppImage' : 'Download AppImage from Releases'}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            )}

            {activeTab === 'docker' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  {lang === 'zh'
                    ? 'Docker 瀏覽器版（自架伺服器）'
                    : 'Docker Browser Edition (Self-Hosted)'}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {lang === 'zh'
                    ? '可直接拉取 v1.5.4 官方 GHCR 映像檔一鍵啟動（適合 NAS、實驗室伺服器或遠端瀏覽器存取）：'
                    : 'Pull the official v1.5.4 GHCR image directly for personal NAS, lab workstations, or remote browser access:'}
                </p>

                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[var(--bg-code)] p-4">
                  <button
                    type="button"
                    onClick={() => copyCommand('docker', dockerCommand)}
                    className="absolute top-3 right-3 inline-flex h-8 items-center gap-1.5 rounded-md bg-white/10 px-3 text-xs font-semibold text-slate-100 transition-colors hover:bg-white/20"
                  >
                    {copiedId === 'docker' ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>{copiedId === 'docker' ? t.copiedBtn : t.copyBtn}</span>
                  </button>
                  <pre className="font-code overflow-x-auto pr-28 text-xs leading-relaxed text-slate-200 sm:text-sm">
                    {dockerCommand}
                  </pre>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                  <span className="text-[var(--text-secondary)]">
                    {lang === 'zh' ? '容器啟動後請以瀏覽器開啟：' : 'Once running, open in browser:'}{' '}
                    <code className="font-code rounded bg-[var(--bg-surface-2)] px-2 py-0.5 font-semibold text-[var(--accent-teal)]">
                      http://localhost:8765
                    </code>
                  </span>
                  <a
                    href="https://github.com/YuriyLin/PaperRead"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[var(--accent-indigo)] hover:underline"
                  >
                    <span>docker-compose.yml</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
