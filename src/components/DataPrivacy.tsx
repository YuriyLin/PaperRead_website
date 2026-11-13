import { useState } from 'react';
import { Folder, FileJson, FileText, GitBranch, Lock, FileCode } from 'lucide-react';
import { Lang, Translations } from '../i18n/translations';

interface DataPrivacyProps {
  lang: Lang;
  t: Translations['privacy'];
}

type SampleFileKey = 'reading-paths' | 'annotations' | 'note';

const FILE_PREVIEWS: Record<SampleFileKey, { filename: string; content: string }> = {
  'reading-paths': {
    filename: 'reading-paths.json',
    content: `{
  "workspace": "NLP-Foundations",
  "kanban": {
    "candidates": ["deepseek-r1-2025", "graphrag-survey"],
    "reading": ["attention-2017", "local-first-sw"],
    "archived": ["bert-2018"]
  },
  "paths": [
    { "from": "seq2seq-2014", "to": "attention-2017", "relation": "replaces-rnn" }
  ]
}`,
  },
  annotations: {
    filename: 'annotations/attention-2017.json',
    content: `{
  "paperId": "attention-2017",
  "page": 4,
  "strokes": [
    { "id": "ink_01", "color": "#334EAB", "points": [[120, 412], [280, 416]] }
  ],
  "stickers": [
    { "pack": "lucide", "name": "lightbulb", "groupId": "grp_4", "x": 144, "y": 440 }
  ]
}`,
  },
  note: {
    filename: 'notes/attention-2017.md',
    content: `---
title: "Attention Is All You Need"
exportedToObsidian: true
---

## 閱讀筆記 (@Page 4)
- 使用 [[Scaled Dot-Product Attention]] 取代循環神經網路
- 相關概念：[[Multi-Head Attention]] / [[Positional Encoding]]`,
  },
};

export function DataPrivacy({ lang, t }: DataPrivacyProps) {
  const [pathOS, setPathOS] = useState<'unix' | 'win'>('unix');
  const [selectedFile, setSelectedFile] = useState<SampleFileKey>('reading-paths');

  const rootPath =
    pathOS === 'unix'
      ? '~/PaperRead'
      : `C:\\Users\\<${lang === 'zh' ? '使用者名稱' : 'username'}>\\PaperRead`;

  const pointIcons = [FileCode, GitBranch, Lock];

  return (
    <section id="privacy" className="py-20 lg:py-24">
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

        <div className="mt-12 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.08fr_1fr]">
          {/* Left: Interactive Local Directory & Open-Format File Inspector */}
          <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-code)] text-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-5 py-3.5">
              <span className="font-code text-xs font-semibold text-slate-300">{t.treeLabel}</span>
              <div className="flex rounded-lg bg-white/10 p-0.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setPathOS('unix')}
                  className={`rounded-md px-2.5 py-1 font-semibold transition-colors ${
                    pathOS === 'unix' ? 'bg-[var(--accent-indigo)] text-white' : 'text-slate-300'
                  }`}
                >
                  macOS / Linux
                </button>
                <button
                  type="button"
                  onClick={() => setPathOS('win')}
                  className={`rounded-md px-2.5 py-1 font-semibold transition-colors ${
                    pathOS === 'win' ? 'bg-[var(--accent-indigo)] text-white' : 'text-slate-300'
                  }`}
                >
                  Windows
                </button>
              </div>
            </div>

            <div className="grid flex-1 grid-cols-1 divide-y divide-white/10 sm:grid-cols-[215px_1fr] sm:divide-x sm:divide-y-0">
              {/* Clickable Directory Tree */}
              <div className="font-code space-y-1.5 p-4 text-xs">
                <div className="flex items-center gap-2 font-bold text-sky-300">
                  <Folder className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{rootPath}</span>
                </div>

                <div className="space-y-1 pl-3 pt-1 text-slate-300">
                  <div className="flex items-center gap-2 px-2 py-1 text-slate-400">
                    <Folder className="h-3.5 w-3.5 text-amber-300" />
                    <span>papers/</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedFile('annotations')}
                    className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors ${
                      selectedFile === 'annotations'
                        ? 'bg-white/15 text-white'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <FileJson className="h-3.5 w-3.5 shrink-0 text-amber-300" />
                    <span className="truncate">annotations/*.json</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedFile('note')}
                    className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors ${
                      selectedFile === 'note'
                        ? 'bg-white/15 text-white'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <FileText className="h-3.5 w-3.5 shrink-0 text-emerald-300" />
                    <span className="truncate">notes/*.md</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedFile('reading-paths')}
                    className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors ${
                      selectedFile === 'reading-paths'
                        ? 'bg-white/15 text-white'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <FileJson className="h-3.5 w-3.5 shrink-0 text-sky-300" />
                    <span className="truncate">reading-paths.json</span>
                  </button>
                </div>
              </div>

              {/* Open-Format File Content Preview */}
              <div className="flex flex-col justify-between p-4">
                <div>
                  <div className="font-code mb-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{FILE_PREVIEWS[selectedFile].filename}</span>
                    <span>UTF-8</span>
                  </div>
                  <pre className="font-code overflow-x-auto text-[11.5px] leading-relaxed text-slate-200">
                    {FILE_PREVIEWS[selectedFile].content}
                  </pre>
                </div>
                <div className="mt-3 border-t border-white/10 pt-2.5 text-[11px] text-slate-400">
                  {t.previewHint}
                </div>
              </div>
            </div>
          </div>

          {/* Right: 3 Privacy & Portability Cards */}
          <div className="flex flex-col justify-between gap-4">
            {t.points.map((pt, idx) => {
              const Icon = pointIcons[idx] || Lock;
              return (
                <div
                  key={pt.title}
                  className="flex flex-1 items-start gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5"
                >
                  <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-[var(--accent-indigo)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">{pt.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
