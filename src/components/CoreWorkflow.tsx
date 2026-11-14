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
  Array<{ src: string; srcEn?: string; captionZh: string; captionEn: string }>
> = {
  '01': [
    {
      src: `${import.meta.env.BASE_URL}paperread/papersearch.jpg`,
      srcEn: `${import.meta.env.BASE_URL}assets/aistudio/explorer_e7c22862.png`,
      captionZh: '研究探索：以 OpenAlex 搜尋主題、會議期刊（ICCV、ECCV、CVPR 等）與公開 PDF',
      captionEn: 'OpenAlex literature search across topics, venues, and open-access PDFs',
    },
    {
      src: `${import.meta.env.BASE_URL}paperread/researchspace.jpg`,
      srcEn: `${import.meta.env.BASE_URL}assets/aistudio/kanban_86ab3431.png`,
      captionZh: '閱讀看板：以待閱讀、閱讀中、待整理與已完成欄位追蹤閱讀進度（SQLite 儲存）',
      captionEn: 'Reading Kanban tracks candidate triage and completion percentages in SQLite',
    },
    {
      src: `${import.meta.env.BASE_URL}paperread/route.jpg`,
      srcEn: `${import.meta.env.BASE_URL}assets/aistudio/route_8a14f9c2.png`,
      captionZh: '漸進式閱讀路徑：串聯引用關係與建議閱讀順序，並附推薦理由',
      captionEn: 'Progressive reading path connects citation chains and recommended reading order',
    },
  ],
  '02': [
    {
      src: `${import.meta.env.BASE_URL}assets/aistudio/image_96b440d9.png`,
      captionZh: 'Chrome 風格多分頁標籤列：自由切換多篇論文並保留各自閱讀進度，亦可拖曳成獨立視窗並排比較',
      captionEn: 'Chrome-style multi-tab bar: switch open papers seamlessly while preserving scroll progress or detach to compare',
    },
    {
      src: `${import.meta.env.BASE_URL}paperread/readingpage.jpg`,
      srcEn: `${import.meta.env.BASE_URL}assets/aistudio/readingpage_0e301299.png`,
      captionZh: '雙語對照與原文核對：左側譯文與右側英文原文同步對齊，保留公式、粗斜體與交叉引用雙向跳轉',
      captionEn: 'Bilingual split reader aligning translated prose and original English text with formula & cross-ref jumps',
    },
    {
      src: `${import.meta.env.BASE_URL}assets/aistudio/handwrite_sticker_32fe6077.png`,
      srcEn: `${import.meta.env.BASE_URL}assets/aistudio/handwrite_sticker_32fe6077.png`,
      captionZh: '手寫、貼紙與視覺標註：支援多色畫筆手寫、內建貼紙素材、螢光重點與側邊欄筆記',
      captionEn: 'Handwriting, stickers & margin highlights with multi-color ink and built-in sticker packs',
    },
    {
      src: `${import.meta.env.BASE_URL}assets/aistudio/image_1e761dc0.png`,
      captionZh: '匯入論文與 Zotero 單向同步：支援資料夾／Zotero 遷移與本機資料夾單向 PDF 同步（保留既有筆記與進度）',
      captionEn: 'Paper import & Zotero one-way folder sync preserving existing notes and reading progress',
    },
  ],
  '03': [
    {
      src: `${import.meta.env.BASE_URL}paperread/keywordsearch.jpg`,
      captionZh: '跨論文關鍵字搜尋：同時比對多篇論文原文與譯文片段，一鍵定位回原始段落',
      captionEn: 'Cross-paper bilingual keyword search jumping directly to matched paragraphs',
    },
    {
      src: `${import.meta.env.BASE_URL}assets/aistudio/image_9878a0d8.png`,
      captionZh: '論文深度剖析報告：長文比例分桶防截斷，呈現實證判定、支持證據、問題分析與 Markdown 複製',
      captionEn: 'Deep Paper Audit report with bucketed anti-truncation extraction, evidence verdicts, and Markdown export',
    },
    {
      src: `${import.meta.env.BASE_URL}assets/aistudio/image_79231da5.png`,
      srcEn: `${import.meta.env.BASE_URL}assets/aistudio/askAI_918778f6.png`,
      captionZh: '附加文件問 AI 與邊讀邊問：支援附加圖表、PDF、TXT／MD 文件與自適應語言簡明回答',
      captionEn: 'File-attached Ask AI supporting figures, PDF, TXT/MD documents and target-language concise replies',
    },
  ],
  '04': [
    {
      src: `${import.meta.env.BASE_URL}assets/aistudio/image_d82a14bb.png`,
      captionZh: '論文筆記、Markmap 與多格式匯出：雙開預覽搭配心智圖展開收合，支援 Obsidian、XMind 與 SVG 匯出',
      captionEn: 'Split notes & Markmap workspace with expand/collapse controls and Obsidian, XMind & SVG export',
    },
    {
      src: `${import.meta.env.BASE_URL}assets/aistudio/image_a6a27ccb.png`,
      captionZh: '離線預渲染與開放格式匯出：支援匯出完整離線 HTML 與輕量手機版（預先編譯 KaTeX，相容 iOS 檔案 App）',
      captionEn: 'Pre-compiled offline HTML & compact mobile export (compatible with iOS Files) alongside open local storage',
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
  const currentDemoSrc =
    lang === 'en' && currentDemo.srcEn ? currentDemo.srcEn : currentDemo.src;

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
                          src: currentDemoSrc,
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
                  {activeStepId === '02' && featureIndex === 0 && (
                    <div className="mb-3 rounded-xl border border-[var(--accent-amber)]/40 bg-[var(--bg-surface)] p-3">
                      <div className="relative aspect-[1280/54] w-full overflow-hidden rounded-lg border border-[var(--border-strong)] bg-[#f6f3ec] shadow-xs">
                        <img
                          src={`${import.meta.env.BASE_URL}assets/aistudio/image_96b440d9.png`}
                          alt={
                            lang === 'zh'
                              ? '擷取自閱讀頁的 Chrome 風格多分頁標籤列'
                              : 'Cropped Chrome-style multi-tab bar from PaperRead reader'
                          }
                          referrerPolicy="no-referrer"
                          className="block h-auto w-full object-cover object-top"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute top-[6%] right-[24%] bottom-[6%] left-[0.8%] rounded border-2 border-[var(--accent-amber)] bg-[var(--accent-amber)]/10"
                        />
                      </div>
                      <div className="mt-2 flex items-center gap-2 pl-3 sm:pl-6">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 36 28"
                          className="h-5 w-7 shrink-0 text-[var(--accent-amber)]"
                          fill="none"
                        >
                          <path
                            d="M28 24 C 14 23, 10 15, 10 4"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M5.5 9.5 L10 3.5 L14.5 9.5"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="font-code text-[11px] font-semibold text-[var(--accent-amber)]">
                          {lang === 'zh'
                            ? '擷取重點｜Chrome 風格標籤列 · 切換論文不遺失閱讀進度'
                            : 'Tab Bar Highlight · Chrome-style tabs keep each paper’s progress'}
                        </span>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      setZoomSrc({
                        src: currentDemoSrc,
                        caption: lang === 'zh' ? currentDemo.captionZh : currentDemo.captionEn,
                      })
                    }
                    className="group block w-full overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[#f6f3ec] text-left"
                  >
                    <img
                      src={currentDemoSrc}
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
