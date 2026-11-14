import { useState } from 'react';
import { ShieldOff, Terminal, Cloud, Cpu, Plus, ChevronDown, ExternalLink } from 'lucide-react';
import { Lang, Translations } from '../i18n/translations';

interface FlexibleAISupportProps {
  lang: Lang;
  t: Translations['ai'];
}

interface DemoModelCard {
  id: string;
  name: string;
  provider: string;
  mode: 'cli' | 'cloud' | 'local';
}

const DEMO_MODELS: DemoModelCard[] = [
  { id: 'opus', name: 'Claude Opus 4.7', provider: 'Claude Code', mode: 'cli' },
  { id: 'sonnet', name: 'Claude Sonnet 4.6', provider: 'Claude Code', mode: 'cli' },
  { id: 'gpt6', name: 'GPT-6-Luna', provider: 'Codex CLI', mode: 'cli' },
  { id: 'gpt56luna', name: 'GPT-5.6-Luna', provider: 'Codex CLI', mode: 'cli' },
  { id: 'gemini38', name: 'Gemini 3.8 Flash', provider: 'Antigravity CLI', mode: 'cli' },
  { id: 'gpt56terra', name: 'GPT-5.6-Terra', provider: 'Codex CLI', mode: 'cli' },
  { id: 'qwen36', name: 'qwen3.6-35b-iq2m:latest', provider: 'Ollama', mode: 'local' },
];

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
    "translateModel": "Gemini 3.8 Flash (Antigravity CLI)",
    "askAiDefaultModel": "GPT-5.6-Terra (Codex CLI)",
    "useLocalAuthSession": true
  }
}`,
  cloud: `{
  "ai": {
    "enabled": true,
    "mode": "cloud-api",
    "provider": "deepseek", // "openai" | "claude" | "gemini"
    "endpoint": "https://api.deepseek.com/v1"
  }
}`,
  local: `{
  "ai": {
    "enabled": true,
    "mode": "local-model",
    "provider": "ollama", // or "lm-studio"
    "baseUrl": "http://127.0.0.1:11434",
    "model": "qwen3.6-35b-iq2m:latest"
  }
}`,
};

export function FlexibleAISupport({ lang, t }: FlexibleAISupportProps) {
  const [selectedMode, setSelectedMode] = useState<'none' | 'cli' | 'cloud' | 'local'>('cli');
  const [previewView, setPreviewView] = useState<'ui' | 'json'>('ui');
  const [translateModelId, setTranslateModelId] = useState<string>('gemini38');
  const [askAiModelId, setAskAiModelId] = useState<string>('gpt56terra');
  const [addProvider, setAddProvider] = useState<'claude' | 'codex' | 'antigravity' | 'api'>('api');
  const [apiService, setApiService] = useState<'DeepSeek' | 'OpenAI' | 'Gemini' | 'Ollama'>(
    'DeepSeek'
  );

  const icons = {
    none: ShieldOff,
    cli: Terminal,
    cloud: Cloud,
    local: Cpu,
  };

  const handleModeSelect = (modeId: 'none' | 'cli' | 'cloud' | 'local') => {
    setSelectedMode(modeId);
    if (modeId === 'local') {
      setTranslateModelId('qwen36');
      setAddProvider('api');
      setApiService('Ollama');
    } else if (modeId === 'cloud') {
      setAddProvider('api');
      setApiService('DeepSeek');
    } else if (modeId === 'cli') {
      setTranslateModelId('gemini38');
      setAskAiModelId('gpt56terra');
    }
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
                onClick={() => handleModeSelect(mode.id)}
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

        {/* Interactive PaperRead v1.5.3 Settings · Model Switcher UI + Config JSON Toggle */}
        <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-4 py-2.5 text-xs">
            <span className="font-code font-semibold text-[var(--text-primary)]">
              {previewView === 'ui'
                ? lang === 'zh'
                  ? 'PaperRead · 設定 · 模型切換介面 (v1.5.3)'
                  : 'PaperRead · Settings · Model Switcher (v1.5.3)'
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
                  {lang === 'zh' ? '模型介面預覽' : 'Model UI'}
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
            <div className="bg-[var(--bg-surface-2)]/70 p-4 sm:p-6">
              <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-sm">
                {/* Modal Top Tabs: 設定 / 模型 / 閱讀 / 側邊欄 / 快捷鍵 */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] px-6 py-4">
                  <div className="flex flex-wrap items-center gap-5">
                    <span className="text-base font-extrabold text-[var(--text-primary)]">
                      {lang === 'zh' ? '設定' : 'Settings'}
                    </span>
                    <div className="flex items-center gap-4 text-xs font-semibold">
                      <span className="border-b-2 border-[var(--accent-teal)] pb-1 text-[var(--text-primary)]">
                        {lang === 'zh' ? '模型' : 'Models'}
                      </span>
                      <span className="pb-1 text-[var(--text-muted)]">
                        {lang === 'zh' ? '閱讀' : 'Reading'}
                      </span>
                      <span className="pb-1 text-[var(--text-muted)]">
                        {lang === 'zh' ? '側邊欄' : 'Sidebar'}
                      </span>
                      <span className="pb-1 text-[var(--text-muted)]">
                        {lang === 'zh' ? '快捷鍵' : 'Shortcuts'}
                      </span>
                    </div>
                  </div>
                  <span className="font-code text-[11px] text-[var(--text-muted)]">
                    {lang === 'zh'
                      ? '點擊模型卡片體驗切換預設任務模型'
                      : 'Click cards to switch Translation / Ask AI roles'}
                  </span>
                </div>

                <div className="space-y-5 p-6">
                  {/* Configured Model Grid (Matches Settings -> Model Screenshot) */}
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {DEMO_MODELS.map((model) => {
                      const isTranslate = translateModelId === model.id;
                      const isAskAi = askAiModelId === model.id;
                      const isAssigned = isTranslate || isAskAi;
                      return (
                        <button
                          key={model.id}
                          type="button"
                          onClick={() => setTranslateModelId(model.id)}
                          className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all ${
                            isAssigned
                              ? 'border-[var(--accent-teal)] bg-[var(--accent-teal)]/5 ring-1 ring-[var(--accent-teal)]/40'
                              : 'border-[var(--border-subtle)] bg-[var(--bg-page)] hover:border-[var(--border-strong)]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="truncate text-xs font-bold text-[var(--text-primary)]">
                              {model.name}
                            </span>
                            <span className="text-[10px] text-[var(--text-muted)]">···</span>
                          </div>
                          <div className="mt-1 text-[11px] text-[var(--text-secondary)]">
                            {model.provider}
                          </div>
                          <div className="mt-2.5 flex min-h-[20px] flex-wrap items-center gap-1.5">
                            {isTranslate && (
                              <span className="rounded bg-[var(--accent-teal)]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--accent-teal)]">
                                {lang === 'zh' ? '翻譯' : 'Translate'}
                              </span>
                            )}
                            {isAskAi && (
                              <span className="rounded bg-[var(--accent-teal)]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--accent-teal)]">
                                {lang === 'zh' ? '問 AI 預設' : 'Ask AI Default'}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}

                    {/* + 新增模型 */}
                    <button
                      type="button"
                      onClick={() => setAddProvider('api')}
                      className="flex min-h-[86px] flex-col items-start justify-center gap-1 rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-page)]/60 p-3.5 text-left transition-colors hover:border-[var(--accent-teal)]"
                    >
                      <Plus className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                      <span className="text-xs font-bold text-[var(--text-primary)]">
                        {lang === 'zh' ? '新增模型' : 'Add Model'}
                      </span>
                    </button>
                  </div>

                  {/* 新增模型 Provider & API Panel */}
                  <div className="border-t border-[var(--border-subtle)] pt-4">
                    <div className="mb-2.5 text-[11px] font-semibold text-[var(--text-muted)]">
                      {lang === 'zh' ? '新增模型來源' : 'Add Provider'}
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {(
                        [
                          { id: 'claude', label: 'Claude Code' },
                          { id: 'codex', label: 'Codex CLI' },
                          { id: 'antigravity', label: 'Antigravity CLI' },
                          { id: 'api', label: lang === 'zh' ? 'API 介面' : 'API Endpoint' },
                        ] as const
                      ).map((item) => {
                        const active = addProvider === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setAddProvider(item.id)}
                            className={`rounded-lg border px-3 py-2 text-left text-xs font-bold transition-colors ${
                              active
                                ? 'border-[var(--accent-teal)] bg-[var(--accent-teal)]/5 text-[var(--text-primary)] ring-1 ring-[var(--accent-teal)]/30'
                                : 'border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-primary)] hover:border-[var(--border-strong)]'
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>

                    {addProvider === 'api' ? (
                      <div className="mt-4 space-y-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] font-semibold text-[var(--text-muted)]">
                            {lang === 'zh' ? '服務' : 'Service'}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {(['DeepSeek', 'OpenAI', 'Gemini', 'Ollama'] as const).map((svc) => (
                              <button
                                key={svc}
                                type="button"
                                onClick={() => setApiService(svc)}
                                className={`font-code rounded px-2 py-0.5 text-[10px] font-semibold transition-colors ${
                                  apiService === svc
                                    ? 'bg-[var(--accent-teal)] text-white'
                                    : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                                }`}
                              >
                                {svc}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-2 text-xs font-medium text-[var(--text-primary)]">
                          <span>{apiService}</span>
                          <ChevronDown className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                        </div>

                        <p className="inline-flex flex-wrap items-center gap-1 text-[11px] text-[var(--text-muted)]">
                          <span>
                            {lang === 'zh'
                              ? `支援 OpenAI 相容 API 的服務 · ${apiService} 官方／自訂端點`
                              : `OpenAI-compatible endpoint · ${apiService} API or local base URL`}
                          </span>
                          <ExternalLink className="h-3 w-3 text-[var(--accent-teal)]" />
                        </p>
                      </div>
                    ) : (
                      <div className="mt-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] p-4 text-xs text-[var(--text-secondary)]">
                        {lang === 'zh'
                          ? `直接調用本機已授權的 ${
                              addProvider === 'claude'
                                ? 'Claude Code'
                                : addProvider === 'codex'
                                ? 'Codex CLI'
                                : 'Antigravity CLI'
                            } 工作階段，無須重複填入雲端 API Key。`
                          : `Invoke your already authenticated local ${
                              addProvider === 'claude'
                                ? 'Claude Code'
                                : addProvider === 'codex'
                                ? 'Codex CLI'
                                : 'Antigravity CLI'
                            } session without entering duplicate API keys.`}
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
