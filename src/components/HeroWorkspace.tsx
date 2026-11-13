import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  Container,
  ArrowUpRight,
  Columns2,
  Kanban,
  PenTool,
  Network,
  Maximize2,
  X,
  Compass,
  BookOpen,
  Sparkles,
  FolderGit2,
  ArrowRight,
} from 'lucide-react';
import { Lang, Translations } from '../i18n/translations';

interface HeroWorkspaceProps {
  lang: Lang;
  t: Translations['hero'];
  onDesktopDownload: () => void;
  onDockerDeploy: () => void;
  onSelectWorkflowStep: (step: '01' | '02' | '03' | '04') => void;
}

type MockupTab = 'bilingual' | 'kanban' | 'annotate' | 'mindmap';

interface DemoShot {
  id: string;
  labelZh: string;
  labelEn: string;
  src: string;
  captionZh: string;
  captionEn: string;
}

const DEMO_GROUPS: Record<MockupTab, DemoShot[]> = {
  bilingual: [
    {
      id: 'readingpage',
      labelZh: '雙語並排對照',
      labelEn: 'Bilingual Split View',
      src: '/paperread/readingpage.jpg',
      captionZh:
        '譯文與英文原文同步對齊顯示，數學公式、引用編號與段落脈絡精準對應，點擊即可核對原文。',
      captionEn:
        'Synchronized bilingual reading view preserving mathematical equations, citations, and paragraph alignment.',
    },
    {
      id: 'pages',
      labelZh: 'PDF 原頁跟隨燈箱',
      labelEn: 'PDF Original-Page Lightbox',
      src: '/paperread/pages.jpg',
      captionZh:
        '右側即時跟隨顯示原始 PDF 頁面，隨時核對公式編號、表格數值與雙欄原始排版，避免誤讀。',
      captionEn:
        'Side-by-side original PDF page follower lets you verify equations, tables, and figures against the source.',
    },
  ],
  kanban: [
    {
      id: 'researchspace',
      labelZh: '閱讀看板與進度',
      labelEn: 'Reading Kanban Board',
      src: '/paperread/researchspace.jpg',
      captionZh:
        '以「待閱讀」、「閱讀中」、「待整理」、「已完成」看板統整文獻進度，每篇論文清楚呈現閱讀百分比。',
      captionEn:
        'Organize papers across To Read, Reading, Organizing, and Done columns with real-time reading progress.',
    },
    {
      id: 'route',
      labelZh: '閱讀路徑視覺化',
      labelEn: 'Visual Reading Path',
      src: '/paperread/route.jpg',
      captionZh:
        '從核心主題出發視覺化串聯前後代論文、引用關係與推薦理由，一鍵加入候選清單或閱讀看板。',
      captionEn:
        'Trace citation lineage and recommended reading sequences visually, then queue papers directly to your board.',
    },
  ],
  annotate: [
    {
      id: 'handwrite',
      labelZh: '手寫筆跡與筆記',
      labelEn: 'Freehand Ink & Notes',
      src: '/paperread/handwrite.jpg',
      captionZh:
        '支援多色畫筆手寫標註、螢光重點、文字方塊與雙側邊欄閱讀筆記，完整保留閱讀當下的思考脈絡。',
      captionEn:
        'Multi-color freehand ink strokes, highlights, and margin notes preserve your thoughts right on the paper.',
    },
    {
      id: 'sticker',
      labelZh: '貼紙素材與 AI 釋義',
      labelEn: 'Stickers & Inline AI',
      src: '/paperread/sticker.jpg',
      captionZh:
        '內建 Mega Doodles / Lucide / Feather 貼紙素材與套索群組拖曳，搭配側邊欄原文釋義整理。',
      captionEn:
        'Built-in Mega Doodles, Lucide, and Feather stickers with lasso grouping alongside inline explanations.',
    },
  ],
  mindmap: [
    {
      id: 'mindmap',
      labelZh: '論文結構心智圖',
      labelEn: 'Paper Structure Mindmap',
      src: '/paperread/mindmap.jpg',
      captionZh:
        '自動梳理研究問題、核心方法、實驗基準與研究限制，點擊即可全覽整篇論文的邏輯骨幹。',
      captionEn:
        'Automatically maps problem statements, core methods, benchmarks, and limitations into an interactive mindmap.',
    },
    {
      id: 'chatAI',
      labelZh: '原文錨定 AI 問答',
      labelEn: 'Source-Grounded Q&A',
      src: '/paperread/chatAI.jpg',
      captionZh:
        '針對特定公式或段落提問時，自動附上對應章節出處與公式推導拆解，不脫離原文脈絡。',
      captionEn:
        'Ask questions anchored to specific equations or paragraphs with traceable section references.',
    },
  ],
};

interface OrbitNodeMeta {
  step: '01' | '02' | '03' | '04';
  demoTab: MockupTab;
  titleZh: string;
  titleEn: string;
  subZh: string;
  subEn: string;
  detailZh: string;
  detailEn: string;
  thumb: string;
  tag: string;
}

const ORBIT_NODES: OrbitNodeMeta[] = [
  {
    step: '01',
    demoTab: 'kanban',
    titleZh: '探索與排程',
    titleEn: 'Discover',
    subZh: 'OpenAlex · 看板 · 閱讀路徑',
    subEn: 'OpenAlex · Kanban · Paths',
    detailZh: '串聯引用脈絡與閱讀看板，將龐雜文獻收斂為清晰的每日閱讀排程。',
    detailEn: 'Connect citation lineage and Kanban columns into a calm daily reading queue.',
    thumb: '/paperread/route.jpg',
    tag: 'SQLite + OpenAlex',
  },
  {
    step: '02',
    demoTab: 'bilingual',
    titleZh: '雙語與註記',
    titleEn: 'Read & Ink',
    subZh: '原頁燈箱 · 手寫 · 貼紙',
    subEn: 'PDF Lightbox · Ink · Stickers',
    detailZh: '原文與譯文並排對照，結合手寫畫筆、貼紙素材與 Zotero 批次匯入。',
    detailEn: 'Verify bilingual prose beside original PDF pages with freehand ink & stickers.',
    thumb: '/paperread/handwrite.jpg',
    tag: 'PDF + Handwriting',
  },
  {
    step: '03',
    demoTab: 'mindmap',
    titleZh: '深度剖析',
    titleEn: 'Analyze',
    subZh: '心智圖 · 跨論文比較',
    subEn: 'Mindmap · Cross-Search',
    detailZh: '一鍵生成結構化心智圖，進行 2–5 篇論文比較與附帶頁碼的問答。',
    detailEn: 'Map paper structure into mindmaps and compare 2–5 papers with grounded Q&A.',
    thumb: '/paperread/mindmap.jpg',
    tag: 'Mindmap + Search',
  },
  {
    step: '04',
    demoTab: 'annotate',
    titleZh: '知識庫匯出',
    titleEn: 'Organize',
    subZh: 'Obsidian · Markdown · JSON',
    subEn: 'Obsidian · Markdown · JSON',
    detailZh: '自動建立雙向 [[WikiLinks]]，所有資產以開放格式保存在 ~/PaperRead。',
    detailEn: 'Export structured notes with [[WikiLinks]] in pure Markdown & JSON locally.',
    thumb: '/paperread/readingnote.jpg',
    tag: '[[WikiLinks]]',
  },
];

export function HeroWorkspace({
  lang,
  t,
  onDesktopDownload,
  onDockerDeploy,
  onSelectWorkflowStep,
}: HeroWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<MockupTab>('bilingual');
  const [subIndex, setSubIndex] = useState<number>(0);
  const [zoomOpen, setZoomOpen] = useState<boolean>(false);

  const [orbitIdx, setOrbitIdx] = useState<number>(0);
  const [orbitPaused, setOrbitPaused] = useState<boolean>(false);

  const currentGroup = DEMO_GROUPS[activeTab];
  const currentShot = currentGroup[subIndex] || currentGroup[0];
  const activeOrbit = ORBIT_NODES[orbitIdx];

  const handleSelectTab = (tab: MockupTab) => {
    setActiveTab(tab);
    setSubIndex(0);
  };

  // Gentle auto-orbit cycle across the 4 research modules until user interacts
  useEffect(() => {
    if (orbitPaused) return;
    const timer = setInterval(() => {
      setOrbitIdx((prev) => (prev + 1) % ORBIT_NODES.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [orbitPaused]);

  useEffect(() => {
    if (!zoomOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [zoomOpen]);

  const orbitIcons = [Compass, BookOpen, Sparkles, FolderGit2];

  return (
    <section className="relative overflow-hidden bg-[var(--bg-page)] pt-12 pb-20 lg:pt-16 lg:pb-24">
      {/* Subtle Unified Architectural Drafting Grid & Soft Ambient Paper Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.45] dark:opacity-[0.22]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 78% 18%, rgba(45, 97, 115, 0.14), transparent 44%), radial-gradient(circle at 18% 22%, rgba(224, 168, 79, 0.11), transparent 38%), radial-gradient(var(--border-strong) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 100% 100%, 28px 28px',
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* Asymmetric Creative Hero Split */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:gap-12">
          {/* Left Column: Editorial Headline & Primary Actions */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-code inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-[var(--accent-amber)]"
            >
              <img
                src="/paperread/paperread-mark.png"
                alt=""
                aria-hidden="true"
                className="h-5 w-5 object-contain mix-blend-multiply dark:invert dark:mix-blend-screen"
              />
              <span>{t.kicker}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="text-balance mt-5 text-[clamp(2.15rem,4.1vw,3.35rem)] font-extrabold leading-[1.16] tracking-tight text-[var(--text-primary)]"
            >
              {lang === 'zh' ? (
                <>
                  從文獻探索、論文閱讀到知識整理的
                  <span className="relative inline-block text-[var(--accent-indigo)]">
                    個人研究工作區
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 280 12"
                      preserveAspectRatio="none"
                      className="absolute -bottom-1.5 left-0 h-2.5 w-full text-[var(--accent-gold)]"
                    >
                      <motion.path
                        d="M3 8 C 75 2, 195 2, 277 7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </svg>
                  </span>
                  。
                </>
              ) : (
                <>
                  A Local-First{' '}
                  <span className="relative inline-block text-[var(--accent-indigo)]">
                    Personal Research Workspace
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 280 12"
                      preserveAspectRatio="none"
                      className="absolute -bottom-1.5 left-0 h-2.5 w-full text-[var(--accent-gold)]"
                    >
                      <motion.path
                        d="M3 8 C 75 2, 195 2, 277 7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </svg>
                  </span>{' '}
                  from Discovery to Knowledge.
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]"
            >
              {t.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                onClick={onDesktopDownload}
                className="inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[var(--accent-indigo)] px-5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-indigo-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-indigo)]"
              >
                <Download className="h-4 w-4" />
                <span>{t.ctaDesktop}</span>
              </button>

              <button
                type="button"
                onClick={onDockerDeploy}
                className="inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 text-sm font-semibold text-[var(--text-primary)] transition-all hover:-translate-y-0.5 hover:bg-[var(--bg-surface-2)]"
              >
                <Container className="h-4 w-4 text-[var(--accent-teal)]" />
                <span>{t.ctaDocker}</span>
              </button>

              <a
                href="https://github.com/YuriyLin/PaperRead"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              >
                <span>{t.ctaGithub}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>

            {/* Unboxed Architectural Metadata Strip */}
            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--text-muted)]">
              <span>Built on EasyRead</span>
              <span aria-hidden="true">·</span>
              <span>Win / macOS / Linux / Docker</span>
              <span aria-hidden="true">·</span>
              <span>Local JSON & Markdown</span>
            </div>
          </div>

          {/* Right Column: Kinetic Research Constellation Workbench */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setOrbitPaused(true)}
            onMouseLeave={() => setOrbitPaused(false)}
            className="relative overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] p-5 shadow-[0_20px_50px_-15px_rgba(22,35,40,0.12)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.55)]"
          >
            {/* Header of Kinetic Workbench */}
            <div className="mb-4 flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <div className="flex items-center gap-2">
                <img
                  src="/paperread/paperread-mark.png"
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-5 object-contain mix-blend-multiply dark:invert dark:mix-blend-screen"
                />
                <span className="text-xs font-bold text-[var(--text-primary)]">
                  {lang === 'zh' ? '研究生命週期導覽儀表' : 'Kinetic Research Pipeline'}
                </span>
              </div>
              <span className="font-code text-[11px] text-[var(--accent-amber)]">
                {activeOrbit.step} · {activeOrbit.tag}
              </span>
            </div>

            {/* 2x2 Interactive Orbit Nodes with Animated SVG Connection Ring Behind */}
            <div className="relative">
              {/* Animated SVG Orbital Ring Behind Cards */}
              <svg
                aria-hidden="true"
                viewBox="0 0 400 220"
                className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
              >
                <motion.ellipse
                  cx="200"
                  cy="110"
                  rx="135"
                  ry="74"
                  fill="none"
                  stroke="var(--accent-indigo)"
                  strokeWidth="1.2"
                  strokeDasharray="5 6"
                  animate={{ strokeDashoffset: [0, -44] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                />
                <circle
                  cx="200"
                  cy="110"
                  r="34"
                  fill="var(--bg-page)"
                  stroke="var(--border-strong)"
                  strokeWidth="1.2"
                />
              </svg>

              {/* Center Medallion Badge */}
              <div className="pointer-events-none absolute inset-0 z-10 hidden place-items-center sm:grid">
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="grid h-12 w-12 place-items-center rounded-full border border-[var(--accent-indigo)]/40 bg-[var(--bg-surface)] shadow-md"
                >
                  <img
                    src="/paperread/paperread-mark.png"
                    alt="PaperRead Hub"
                    className="h-7 w-7 object-contain mix-blend-multiply dark:invert dark:mix-blend-screen"
                  />
                </motion.div>
              </div>

              <div className="relative z-20 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {ORBIT_NODES.map((node, idx) => {
                  const Icon = orbitIcons[idx];
                  const isActive = orbitIdx === idx;
                  return (
                    <button
                      key={node.step}
                      type="button"
                      onClick={() => {
                        setOrbitIdx(idx);
                        setOrbitPaused(true);
                        handleSelectTab(node.demoTab);
                      }}
                      className={`group relative rounded-xl border p-3.5 text-left transition-all ${
                        isActive
                          ? 'border-[var(--accent-indigo)] bg-[var(--bg-sage)] shadow-xs ring-1 ring-[var(--accent-indigo)]'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-page)]/90 hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface)]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-code text-[11px] font-bold text-[var(--accent-indigo)]">
                          {node.step}
                        </span>
                        <Icon
                          className={`h-3.5 w-3.5 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-[var(--accent-indigo)]' : 'text-[var(--text-muted)]'
                          }`}
                        />
                      </div>
                      <div className="mt-1.5 text-sm font-bold text-[var(--text-primary)]">
                        {lang === 'zh' ? node.titleZh : node.titleEn}
                      </div>
                      <div className="mt-0.5 text-[11px] text-[var(--text-secondary)]">
                        {lang === 'zh' ? node.subZh : node.subEn}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Stage Micro-Preview Bar with AnimatePresence */}
            <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] p-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeOrbit.step}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center"
                >
                  <img
                    src={activeOrbit.thumb}
                    alt={lang === 'zh' ? activeOrbit.titleZh : activeOrbit.titleEn}
                    referrerPolicy="no-referrer"
                    className="h-16 w-full shrink-0 rounded-lg border border-[var(--border-subtle)] object-cover object-top sm:w-28"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                      {lang === 'zh' ? activeOrbit.detailZh : activeOrbit.detailEn}
                    </p>
                    <div className="mt-1.5 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onSelectWorkflowStep(activeOrbit.step)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--accent-indigo)] hover:underline"
                      >
                        <span>
                          {lang === 'zh' ? '深入瀏覽此模組' : 'Explore module details'}
                        </span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Real PaperRead Workspace Demo Showcase */}
        <div
          className="mt-14 overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-[0_24px_60px_-15px_rgba(15,23,42,0.14)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.65)]"
          aria-label="PaperRead Real Demo Showcase"
        >
          {/* Window Topbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-4 py-3">
            <div className="hidden items-center gap-2 sm:flex" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>

            {/* 4 Workspace Demo Tabs */}
            <div
              className="flex flex-wrap items-center gap-1 rounded-lg bg-[var(--bg-surface-3)]/70 p-1"
              role="tablist"
            >
              {(
                [
                  { id: 'bilingual', label: t.tabs.bilingual, icon: Columns2 },
                  { id: 'kanban', label: t.tabs.kanban, icon: Kanban },
                  { id: 'annotate', label: t.tabs.annotate, icon: PenTool },
                  { id: 'mindmap', label: t.tabs.mindmap, icon: Network },
                ] as const
              ).map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleSelectTab(id)}
                    className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[var(--bg-surface)] text-[var(--accent-indigo)] shadow-xs'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            <div className="font-code hidden text-xs text-[var(--text-muted)] md:block">
              {t.workspaceLabel}
            </div>
          </div>

          {/* Sub-view Bar + Zoom Action */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] bg-[var(--bg-page)] px-5 py-2.5">
            <div className="flex flex-wrap items-center gap-2">
              {currentGroup.map((shot, idx) => (
                <button
                  key={shot.id}
                  type="button"
                  onClick={() => setSubIndex(idx)}
                  className={`rounded-md border px-3 py-1 text-xs font-semibold transition-colors ${
                    subIndex === idx
                      ? 'border-[var(--accent-indigo)] bg-[var(--accent-indigo)]/10 text-[var(--accent-indigo)]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {lang === 'zh' ? shot.labelZh : shot.labelEn}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setZoomOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 py-1 text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-indigo)] hover:text-[var(--text-primary)]"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>{lang === 'zh' ? '放大檢視原圖' : 'Inspect Fullscreen'}</span>
            </button>
          </div>

          {/* Real Screenshot Viewport with Smooth Crossfade */}
          <div className="bg-[var(--bg-surface-2)]/40 p-3 sm:p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentShot.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  type="button"
                  onClick={() => setZoomOpen(true)}
                  className="group relative block w-full overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[#f6f3ec] text-left focus-visible:outline-2 focus-visible:outline-[var(--accent-indigo)]"
                  aria-label={
                    lang === 'zh' ? '點擊放大檢視 PaperRead 實際畫面' : 'Click to enlarge screenshot'
                  }
                >
                  <img
                    src={currentShot.src}
                    alt={lang === 'zh' ? currentShot.labelZh : currentShot.labelEn}
                    referrerPolicy="no-referrer"
                    className="aspect-[16/9] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.006]"
                  />
                </button>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
                  <p className="text-[var(--text-secondary)]">
                    <span className="font-semibold text-[var(--text-primary)]">
                      {lang === 'zh' ? currentShot.labelZh : currentShot.labelEn}
                    </span>
                    <span aria-hidden="true"> · </span>
                    <span>{lang === 'zh' ? currentShot.captionZh : currentShot.captionEn}</span>
                  </p>
                  <span className="font-code text-[11px] text-[var(--text-muted)]">
                    PaperRead v1.5.2 · Real UI
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal for Real Demo Image */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
          onClick={() => setZoomOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-[var(--bg-surface)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-5 py-3">
              <div className="text-sm font-bold text-[var(--text-primary)]">
                {lang === 'zh' ? currentShot.labelZh : currentShot.labelEn}
              </div>
              <button
                type="button"
                onClick={() => setZoomOpen(false)}
                aria-label="Close lightbox"
                className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[82vh] overflow-auto bg-[#f6f3ec] p-2">
              <img
                src={currentShot.src}
                alt={lang === 'zh' ? currentShot.labelZh : currentShot.labelEn}
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
