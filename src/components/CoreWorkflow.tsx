import { useState } from 'react';
import { Check, Copy, Maximize2, X } from 'lucide-react';
import { Lang, Translations } from '../i18n/translations';

interface CoreWorkflowProps {
  lang: Lang;
  t: Translations['workflow'];
  activeStepId: '01' | '02' | '03' | '04';
  onSelectStep: (id: '01' | '02' | '03' | '04') => void;
  onToast: (msg: string) => void;
}

const STAGE_FEATURE_DEMOS: Record<
  '01' | '02' | '03' | '04',
  Array<{ src: string; captionZh: string; captionEn: string }>
> = {
  '01': [
    {
      src: `${import.meta.env.BASE_URL}paperread/papersearch.jpg`,
      captionZh: '研究探索：以 OpenAlex 搜尋主題、會議期刊（ICCV、ECCV、CVPR 等）與公開 PDF',
      captionEn: 'OpenAlex literature search across topics, venues, and open-access PDFs',
    },
    {
      src: `${import.meta.env.BASE_URL}paperread/researchspace.jpg`,
      captionZh: '閱讀看板：以待閱讀、閱讀中、待整理與已完成欄位追蹤閱讀進度（SQLite 儲存）',
      captionEn: 'Reading Kanban tracks candidate triage and completion percentages in SQLite',
    },
    {
      src: `${import.meta.env.BASE_URL}paperread/route.jpg`,
      captionZh: '漸進式閱讀路徑：串聯引用關係與建議閱讀順序，並附推薦理由',
      captionEn: 'Progressive reading path connects citation chains and recommended reading order',
    },
  ],
  '02': [
    {
      src: `${import.meta.env.BASE_URL}paperread/readingpage.jpg`,
      captionZh: '雙語閱讀與 PDF 原頁並排：譯文、原文、公式與圖表同步對齊，隨時核對原始脈絡',
      captionEn: 'Bilingual split reader aligning translated prose, equations, and original PDF pages',
    },
    {
      src: `${import.meta.env.BASE_URL}paperread/sticker.jpg`,
      captionZh: '雙語對照與貼紙標註：內建貼紙素材、段落劃線與 AI 原文釋義整理',
      captionEn: 'Bilingual annotations with built-in stickers and inline AI explanations',
    },
    {
      src: `${import.meta.env.BASE_URL}paperread/handwrite.jpg`,
      captionZh: '自由手寫與筆記：支援滑鼠手寫、筆寬／顏色切換、橡皮擦、復原重做與雙側邊欄筆記',
      captionEn: 'Freehand ink annotations with width/color controls, eraser, and margin notes',
    },
    {
      src: `${import.meta.env.BASE_URL}paperread/readingnote.jpg`,
      captionZh: '筆記工作區與 Zotero 匯入：支援預覽與 Markdown 雙模式整理及批次文獻匯入',
      captionEn: 'Preview and Markdown reading notes workspace with Zotero batch import',
    },
  ],
  '03': [
    {
      src: `${import.meta.env.BASE_URL}paperread/keywordsearch.jpg`,
      captionZh: '跨論文關鍵字搜尋：同時比對多篇論文原文與譯文片段，一鍵定位回原始段落',
      captionEn: 'Cross-paper bilingual keyword search jumping directly to matched paragraphs',
    },
    {
      src: `${import.meta.env.BASE_URL}paperread/chatAI.jpg`,
      captionZh: '深度剖析與 2–5 篇比較：保留章節與公式出處連結，協助回到原文核對',
      captionEn: 'Deep breakdown and 2–5 paper comparison anchored to original sections',
    },
    {
      src: `${import.meta.env.BASE_URL}paperread/mindmap.jpg`,
      captionZh: '論文結構心智圖：自動將研究動機、方法、實驗與限制梳理為互動心智圖',
      captionEn: 'Interactive structural mindmap organizing motivation, method, and results',
    },
  ],
  '04': [
    {
      src: `${import.meta.env.BASE_URL}paperread/readingnote.jpg`,
      captionZh: '結構化筆記與 Markmap 整理：一鍵匯出為 Obsidian 雙向連結格式',
      captionEn: 'Structured notes and Markmap summaries ready for Obsidian WikiLinks export',
    },
    {
      src: `${import.meta.env.BASE_URL}paperread/sticker.jpg`,
      captionZh: '開放格式保存：所有貼紙、標註座標與 AI 解析皆保存於本機 JSON 與 Markdown',
      captionEn: 'Open JSON and Markdown persistence for long-term local backup and portability',
    },
  ],
};

export function CoreWorkflow({
  lang,
  t,
  activeStepId,
  onSelectStep,
  onToast,
}: CoreWorkflowProps) {
  const [featureIndex, setFeatureIndex] = useState<number>(0);
  const [stage04View, setStage04View] = useState<'screenshot' | 'markdown'>('screenshot');
  const [copiedMd, setCopiedMd] = useState(false);
  const [zoomSrc, setZoomSrc] = useState<{ src: string; caption: string } | null>(null);

  const activeStep = t.steps.find((s) => s.id === activeStepId) || t.steps[0];
  const demos = STAGE_FEATURE_DEMOS[activeStepId];
  const currentDemo = demos[featureIndex] || demos[0];

  const handleStepSelect = (id: '01' | '02' | '03' | '04') => {
    onSelectStep(id);
    setFeatureIndex(0);
  };

  const obsidianSnippet = `---
title: "Attention Is All You Need"
venue: "NeurIPS 2017"
tags: [paper, transformer, attention]
status: archived
---

# 核心方法與筆記
- 透過 [[Multi-Head Attention]] 取代循環架構，支援平行化計算
- 關聯文獻：[[Seq2Seq-2014]] · [[BERT-Pretraining]]

## 原頁註記 (@Page 4)
> Scaled Dot-Product Attention 透過除以 √dₖ 避免點積過大導致梯度消失`;

  const copyObsidian = async () => {
    try {
      await navigator.clipboard.writeText(obsidianSnippet);
      setCopiedMd(true);
      onToast(
        lang === 'zh' ? '已複製 Obsidian Markdown 匯出範例' : 'Copied Obsidian Markdown sample'
      );
      setTimeout(() => setCopiedMd(false), 1800);
    } catch {
      onToast(lang === 'zh' ? '無法存取剪貼簿' : 'Clipboard unavailable');
    }
  };

  return (
    <section
      id="workflow"
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
          <p className="mt-3.5 text-base leading-relaxed text-[var(--text-secondary)]">{t.desc}</p>
        </div>

        {/* 4-Stage Step Selector */}
        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" role="tablist">
          {t.steps.map((step) => {
            const isActive = step.id === activeStepId;
            return (
              <button
                key={step.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleStepSelect(step.id)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  isActive
                    ? 'border-[var(--accent-indigo)] bg-[var(--bg-surface)] shadow-sm ring-1 ring-[var(--accent-indigo)]'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-surface)]/75 hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface)]'
                }`}
              >
                <div className="font-code text-xs font-semibold text-[var(--accent-indigo)]">
                  {step.code}
                </div>
                <div className="mt-1 text-base font-bold text-[var(--text-primary)]">
                  {step.title}
                </div>
                <div className="mt-0.5 text-xs text-[var(--text-muted)]">{step.shortDesc}</div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Workspace Stage */}
        <div className="mt-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[0.95fr_1.15fr]">
            {/* Left: Clickable Feature Breakdown */}
            <div className="flex flex-col justify-center">
              <div className="font-code text-xs font-semibold text-[var(--accent-teal)]">
                {activeStep.code}
              </div>
              <h3 className="text-balance mt-2 text-xl font-extrabold text-[var(--text-primary)] sm:text-2xl">
                {activeStep.heading}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                {activeStep.lead}
              </p>

              <div className="mt-6 space-y-2.5">
                {activeStep.features.map((feat, idx) => {
                  const isSelected = featureIndex === idx;
                  return (
                    <button
                      key={feat.title}
                      type="button"
                      onClick={() => {
                        setFeatureIndex(idx);
                        if (activeStepId === '04') setStage04View('screenshot');
                      }}
                      className={`w-full rounded-xl border p-4 text-left transition-all ${
                        isSelected
                          ? 'border-[var(--accent-indigo)] bg-[var(--accent-indigo)]/8'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-page)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-[var(--text-primary)]">
                          {feat.title}
                        </span>
                        <span className="font-code text-[11px] text-[var(--accent-indigo)]">
                          {isSelected
                            ? lang === 'zh'
                              ? '檢視中'
                              : 'Viewing'
                            : lang === 'zh'
                            ? '切換畫面'
                            : 'Preview'}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                        {feat.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Real PaperRead Screenshot Viewer */}
            <div className="flex flex-col justify-between rounded-xl border border-[var(--border-strong)] bg-[var(--bg-page)] p-4 sm:p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="font-code text-[11px] font-semibold text-[var(--text-muted)]">
                  {lang === 'zh' ? '實際系統介面預覽' : 'Real Application Screenshot'}
                </span>

                <div className="flex items-center gap-2">
                  {activeStepId === '04' && (
                    <div className="flex rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-0.5 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setStage04View('screenshot')}
                        className={`rounded px-2.5 py-1 font-semibold ${
                          stage04View === 'screenshot'
                            ? 'bg-[var(--accent-indigo)] text-white'
                            : 'text-[var(--text-secondary)]'
                        }`}
                      >
                        {lang === 'zh' ? '介面截圖' : 'UI Demo'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setStage04View('markdown')}
                        className={`rounded px-2.5 py-1 font-semibold ${
                          stage04View === 'markdown'
                            ? 'bg-[var(--accent-indigo)] text-white'
                            : 'text-[var(--text-secondary)]'
                        }`}
                      >
                        Obsidian .md
                      </button>
                    </div>
                  )}

                  {!(activeStepId === '04' && stage04View === 'markdown') && (
                    <button
                      type="button"
                      onClick={() =>
                        setZoomSrc({
                          src: currentDemo.src,
                          caption: lang === 'zh' ? currentDemo.captionZh : currentDemo.captionEn,
                        })
                      }
                      className="inline-flex h-7 items-center gap-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 text-[11px] font-semibold text-[var(--text-secondary)] hover:border-[var(--accent-indigo)] hover:text-[var(--text-primary)]"
                    >
                      <Maximize2 className="h-3 w-3" />
                      <span>{lang === 'zh' ? '放大' : 'Zoom'}</span>
                    </button>
                  )}
                </div>
              </div>

              {activeStepId === '04' && stage04View === 'markdown' ? (
                <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl bg-[var(--bg-code)] p-4">
                  <button
                    type="button"
                    onClick={copyObsidian}
                    className="absolute top-3 right-3 inline-flex h-8 items-center gap-1.5 rounded-md bg-white/10 px-2.5 text-[11px] font-semibold text-slate-100 hover:bg-white/20"
                  >
                    {copiedMd ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>
                      {copiedMd
                        ? lang === 'zh'
                          ? '已複製'
                          : 'Copied'
                        : lang === 'zh'
                        ? '複製範例'
                        : 'Copy'}
                    </span>
                  </button>
                  <pre className="font-code overflow-x-auto pr-20 text-xs leading-relaxed text-slate-200">
                    {obsidianSnippet}
                  </pre>
                  <div className="mt-4 border-t border-white/10 pt-2.5 text-[11px] text-slate-400">
                    {lang === 'zh'
                      ? '自動生成 YAML Frontmatter 與 [[WikiLinks]]，無縫匯入 Obsidian 知識圖譜。'
                      : 'Generates YAML frontmatter and [[WikiLinks]] ready for your Obsidian graph.'}
                  </div>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setZoomSrc({
                        src: currentDemo.src,
                        caption: lang === 'zh' ? currentDemo.captionZh : currentDemo.captionEn,
                      })
                    }
                    className="group block w-full overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[#f6f3ec] text-left"
                  >
                    <img
                      src={currentDemo.src}
                      alt={lang === 'zh' ? currentDemo.captionZh : currentDemo.captionEn}
                      referrerPolicy="no-referrer"
                      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                  </button>
                  <p className="mt-3 text-xs leading-relaxed text-[var(--text-secondary)]">
                    {lang === 'zh' ? currentDemo.captionZh : currentDemo.captionEn}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Version Mapping Footnote (Matching Portfolio Pages 3 & 5) */}
          <div className="mt-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-sage)] px-4 py-3 text-xs text-[var(--text-secondary)]">
            {activeStep.versionNote}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {zoomSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
          onClick={() => setZoomSrc(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-[var(--bg-surface)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] px-5 py-3">
              <div className="truncate text-xs font-semibold text-[var(--text-primary)] sm:text-sm">
                {zoomSrc.caption}
              </div>
              <button
                type="button"
                onClick={() => setZoomSrc(null)}
                aria-label="Close lightbox"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[82vh] overflow-auto bg-[#f6f3ec] p-2">
              <img
                src={zoomSrc.src}
                alt={zoomSrc.caption}
                referrerPolicy="no-referrer"
                className="mx-auto h-auto max-w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
