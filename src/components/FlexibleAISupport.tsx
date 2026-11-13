import { useState } from 'react';
import { ShieldOff, Terminal, Cloud, Cpu } from 'lucide-react';
import { Lang, Translations } from '../i18n/translations';

interface FlexibleAISupportProps {
  lang: Lang;
  t: Translations['ai'];
}

const CONFIG_EXAMPLES: Record<'none' | 'cli' | 'cloud' | 'local', string> = {
  none: `{
  "ai": {
    "enabled": false,
    "mode": "offline-only"
  },
  "features": ["library", "pdf-reader", "handwriting", "stickers", "obsidian-export"]
}`,
  cli: `{
  "ai": {
    "enabled": true,
    "mode": "local-cli",
    "provider": "claude-code", // or "antigravity-cli" | "codex-cli"
    "useLocalAuthSession": true
  }
}`,
  cloud: `{
  "ai": {
    "enabled": true,
    "mode": "cloud-api",
    "provider": "gemini", // "openai" | "claude" | "deepseek"
    "endpoint": "https://generativelanguage.googleapis.com/v1beta"
  }
}`,
  local: `{
  "ai": {
    "enabled": true,
    "mode": "local-model",
    "provider": "ollama", // or "lm-studio"
    "baseUrl": "http://127.0.0.1:11434",
    "model": "qwen2.5:14b"
  }
}`,
};

export function FlexibleAISupport({ lang, t }: FlexibleAISupportProps) {
  const [selectedMode, setSelectedMode] = useState<'none' | 'cli' | 'cloud' | 'local'>('cli');
  const [previewView, setPreviewView] = useState<'ui' | 'json'>('ui');

  const icons = {
    none: ShieldOff,
    cli: Terminal,
    cloud: Cloud,
    local: Cpu,
  };

  return (
    <section id="ai-models" className="py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="font-code text-xs font-semibold tracking-[0.14em] text-[var(--accent-amber)]">
            {t.eyebrow}
          </div>
          <h2 className="text-balance mt-2.5 text-2xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {t.title}
          </h2>
          <p className="mt-3.5 text-base leading-relaxed text-[var(--text-secondary)]">{t.desc}</p>
        </div>

        {/* Highlight Banner: AI is Optional */}
        <div className="mt-10 flex flex-col justify-between gap-4 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface-2)] p-6 sm:flex-row sm:items-center">
          <div className="max-w-3xl">
            <h3 className="text-base font-bold text-[var(--text-primary)]">{t.bannerTitle}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
              {t.bannerDesc}
            </p>
          </div>
          <div className="font-code shrink-0 text-xs font-semibold text-[var(--accent-teal)]">
            {t.bannerBadge}
          </div>
        </div>

        {/* 4 Interactive Mode Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.modes.map((mode) => {
            const Icon = icons[mode.id];
            const isSelected = selectedMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSelectedMode(mode.id)}
                className={`flex flex-col justify-between rounded-2xl border p-5 text-left transition-all ${
                  isSelected
                    ? 'border-[var(--accent-indigo)] bg-[var(--bg-surface)] shadow-sm ring-1 ring-[var(--accent-indigo)]'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-code text-[11px] font-semibold text-[var(--accent-indigo)]">
                      {mode.kicker}
                    </span>
                    <Icon className="h-4 w-4 text-[var(--text-muted)]" />
                  </div>
                  <h3 className="mt-2.5 text-base font-bold text-[var(--text-primary)]">
                    {mode.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                    {mode.desc}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[var(--border-subtle)] pt-3.5">
                  {mode.providers.map((provider) => (
                    <span
                      key={provider}
                      className="font-code rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-2 py-0.5 text-[11px] font-medium text-[var(--text-primary)]"
                    >
                      {provider}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Real PDF AI Model Interface Screenshot + Config JSON Toggle */}
        <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-4 py-2.5 text-xs">
            <span className="font-code font-semibold text-[var(--text-primary)]">
              {previewView === 'ui'
                ? lang === 'zh'
                  ? 'PaperRead · AI 模型切換與問答介面 (PDF p.7)'
                  : 'PaperRead · AI Model Selector & Grounded Q&A (PDF p.7)'
                : '~/PaperRead/config.json'}
            </span>
            <div className="flex items-center gap-2">
              <span className="hidden text-[11px] text-[var(--text-muted)] sm:inline">
                {t.configTitle}
              </span>
              <div className="flex rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-0.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setPreviewView('ui')}
                  className={`rounded px-2.5 py-1 font-semibold ${
                    previewView === 'ui'
                      ? 'bg-[var(--accent-indigo)] text-white'
                      : 'text-[var(--text-secondary)]'
                  }`}
                >
                  {lang === 'zh' ? '模型介面截圖' : 'Model UI'}
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewView('json')}
                  className={`rounded px-2.5 py-1 font-semibold ${
                    previewView === 'json'
                      ? 'bg-[var(--accent-indigo)] text-white'
                      : 'text-[var(--text-secondary)]'
                  }`}
                >
                  config.json
                </button>
              </div>
            </div>
          </div>

          {previewView === 'ui' ? (
            <div className="bg-[#f6f3ec] p-3 sm:p-5">
              <img
                src="/paperread/chatAI.jpg"
                alt={
                  lang === 'zh'
                    ? 'PaperRead AI 模型切換與原文對照問答介面'
                    : 'PaperRead AI Model Selector and Grounded Q&A Interface'
                }
                referrerPolicy="no-referrer"
                className="mx-auto max-h-[540px] w-auto rounded-lg border border-[var(--border-subtle)] object-contain shadow-xs"
              />
            </div>
          ) : (
            <pre className="font-code overflow-x-auto bg-[var(--bg-code)] p-4 text-xs leading-relaxed text-slate-200">
              {CONFIG_EXAMPLES[selectedMode]}
            </pre>
          )}
        </div>
      </div>
    </section>
  );
}
