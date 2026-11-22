export type Lang = 'zh' | 'en';

export interface Translations {
  nav: {
    workflow: string;
    ai: string;
    engineering: string;
    install: string;
    privacy: string;
    download: string;
    themeToDark: string;
    themeToLight: string;
    langSwitchLabel: string;
  };
  hero: {
    kicker: string;
    brandSuffix: string;
    headline: string;
    subtitle: string;
    ctaDesktop: string;
    ctaDocker: string;
    ctaGithub: string;
    workspaceLabel: string;
    modules: Array<{
      num: string;
      en: string;
      zh: string;
      targetStep: '01' | '02' | '03' | '04';
    }>;
    tabs: {
      bilingual: string;
      kanban: string;
      annotate: string;
      mindmap: string;
    };
  };
  why: {
    eyebrow: string;
    title: string;
    desc: string;
    flowTitle: string;
    flowSteps: Array<{
      title: string;
      desc: string;
    }>;
    painLabel: string;
    solveLabel: string;
    cards: Array<{
      title: string;
      summary: string;
      pain: string;
      solve: string;
    }>;
    attributionEyebrow: string;
    attributionTitle: string;
    easyreadTitle: string;
    easyreadDesc: string;
    paperreadTitle: string;
    paperreadDesc: string;
  };
  workflow: {
    eyebrow: string;
    title: string;
    desc: string;
    steps: Array<{
      id: '01' | '02' | '03' | '04';
      code: string;
      title: string;
      shortDesc: string;
      heading: string;
      lead: string;
      versionNote: string;
      features: Array<{
        title: string;
        desc: string;
      }>;
    }>;
  };
  ai: {
    eyebrow: string;
    title: string;
    desc: string;
    bannerTitle: string;
    bannerDesc: string;
    bannerBadge: string;
    modes: Array<{
      id: 'none' | 'cli' | 'cloud' | 'local';
      kicker: string;
      title: string;
      desc: string;
      providers: string[];
    }>;
    configTitle: string;
    mineru: {
      eyebrow: string;
      title: string;
      desc: string;
      efficiencyNote: string;
      localTitle: string;
      localDesc: string;
      cloudTitle: string;
      cloudDesc: string;
    };
  };
  engineering: {
    eyebrow: string;
    title: string;
    desc: string;
    archLabel: string;
    archLayers: Array<{
      title: string;
      items: string[];
    }>;
    milestonesLabel: string;
    milestones: Array<{
      badge?: string;
      version: string;
      highlights: string[];
      current?: boolean;
    }>;
    issuesTitle: string;
    issues: Array<{
      id: string;
      status: string;
      title: string;
      desc: string;
      url: string;
    }>;
    contribute: {
      eyebrow: string;
      title: string;
      desc: string;
      issueFormatTitle: string;
      issueFormatItems: string[];
      prRulesTitle: string;
      prRulesItems: string[];
      devCmdTitle: string;
      ctaIssue: string;
      ctaContributing: string;
      ctaPr: string;
    };
  };
  install: {
    eyebrow: string;
    title: string;
    descPrefix: string;
    detectedPrefix: string;
    copyBtn: string;
    copiedBtn: string;
    tabs: {
      windows: string;
      macos: string;
      linux: string;
      docker: string;
    };
  };
  privacy: {
    eyebrow: string;
    title: string;
    desc: string;
    treeLabel: string;
    previewHint: string;
    points: Array<{
      title: string;
      desc: string;
    }>;
  };
  footer: {
    tagline: string;
    docsHeading: string;
    communityHeading: string;
    licenseNote: string;
    creditsNote: string;
    links: {
      guide: string;
      design: string;
      format: string;
      api: string;
      changelog: string;
      contributing: string;
      issues: string;
    };
  };
}

export const TRANSLATIONS: Record<Lang, Translations> = {
  zh: {
    nav: {
      workflow: '四大模組',
      ai: 'AI 模型',
      engineering: '架構與貢獻',
      install: '快速安裝',
      privacy: '資料隱私',
      download: '立即下載',
      themeToDark: '切換深色模式',
      themeToLight: '切換護眼紙張模式',
      langSwitchLabel: '繁 / EN',
    },
    hero: {
      kicker: 'OPEN SOURCE · LOCAL-FIRST AI RESEARCH WORKSPACE · v1.5.4',
      brandSuffix: 'AI 學術研究與論文閱讀工作區',
      headline: '從文獻探索、論文閱讀到知識整理的個人研究工作區',
      subtitle:
        '建立於 EasyRead 之上持續開源開發，將 OpenAlex 文獻探索、看板排程、雙語原頁對照、手寫貼紙註記與 Obsidian 知識庫整合進同一個本機工作區。',
      ctaDesktop: '下載桌面版 (v1.5.4)',
      ctaDocker: 'Docker 快速部署',
      ctaGithub: '瀏覽 GitHub',
      workspaceLabel: '~/PaperRead · Local Workspace',
      modules: [
        { num: '01', en: 'DISCOVER', zh: '文獻探索與排程', targetStep: '01' },
        { num: '02', en: 'READ', zh: '雙語閱讀與註記', targetStep: '02' },
        { num: '03', en: 'ANALYZE', zh: '深度剖析與心智圖', targetStep: '03' },
        { num: '04', en: 'ORGANIZE', zh: '知識整理與匯出', targetStep: '04' },
      ],
      tabs: {
        bilingual: '雙語對照與 PDF 原頁燈箱',
        kanban: '閱讀看板與路徑',
        annotate: '手寫與貼紙註記',
        mindmap: '論文心智圖',
      },
    },
    why: {
      eyebrow: 'WHY PAPERREAD',
      title: '從分散的研究工具，建立可持續使用的個人工作區',
      desc: '研究者往往需要在學術搜尋平台、PDF 閱讀器、AI 對話工具與筆記軟體間反覆切換。PaperRead 針對這個工作流程的斷點，以開源方式整合文獻發現、閱讀與知識累積。',
      flowTitle: '研究工作流程',
      flowSteps: [
        { title: '探索 Explore', desc: '檢索主題與引用關係' },
        { title: '管理 Organize', desc: '候選清單與閱讀看板' },
        { title: '閱讀 Read', desc: '原文核對、標註與筆記' },
        { title: '沉澱 Connect', desc: '比較分析與知識庫匯出' },
      ],
      painLabel: '傳統痛點',
      solveLabel: 'PaperRead 解法',
      cards: [
        {
          title: '告別工具碎片化',
          summary: '搜尋、進度、筆記集中於單一工作區，不再跨軟體迷失。',
          pain: '瀏覽器開滿搜尋分頁、資料夾堆滿未讀 PDF、摘要與心得散落在不同筆記軟體。',
          solve: '從 OpenAlex 探索、Kanban 看板排程到雙語精讀與筆記匯出，全數收斂於同一工作區。',
        },
        {
          title: '保留原文脈絡',
          summary: '雙語對照與原頁燈箱，隨時核對公式、圖表與原始段落，拒絕 AI 幻覺脫節。',
          pain: '依賴純文字 AI 摘要容易遺漏實驗條件，複雜推導公式與圖表在轉譯後容易失真。',
          solve: '譯文與 PDF 原頁並排同步對照，所有筆記、標註與 AI 問答皆保留原文段落依據。',
        },
        {
          title: '本機優先與完全掌控',
          summary: '資料以 JSON、Markdown 與 SQLite 儲存在本機（~/PaperRead），無雲端帳號綁定。',
          pain: '封閉式雲端服務綁定帳號與訂閱，離線無法存取，研究資產難以長期遷移保存。',
          solve: '開放結構化檔案保存於本機硬碟，支援 Git 版本控制、Zotero 批次匯入與自主備份。',
        },
      ],
      attributionEyebrow: 'OPEN SOURCE ATTRIBUTION',
      attributionTitle: '開發來源與開源延續',
      easyreadTitle: '開源基礎｜EasyRead',
      easyreadDesc:
        '沿用 EasyRead 專案原有的 AI 論文閱讀基礎，包含 PDF 原頁／譯文對照、基本註記及 AI 對話能力，並向原專案與其貢獻者明確致謝。',
      paperreadTitle: 'PaperRead 的擴充方向',
      paperreadDesc:
        '聚焦研究探索（OpenAlex、閱讀看板、漸進式閱讀路徑）、手寫與貼紙標註、Zotero 單向同步、心智圖、跨論文比較與 Obsidian 知識整理，持續擴增跨平台發布與測試維護。',
    },
    workflow: {
      eyebrow: 'CORE WORKFLOW · 01 TO 04',
      title: '四大研究模組互動導覽',
      desc: '點擊切換四個研究階段與細項功能，右側同步顯示 PaperRead 實際系統畫面與操作預覽。',
      steps: [
        {
          id: '01',
          code: '01 · Discover & Organize',
          title: '探索與排程',
          shortDesc: 'OpenAlex、看板、閱讀路徑',
          heading: '從「找到相關論文」到「知道下一篇該讀什麼」',
          lead: '將文獻搜尋、候選清單與引用脈絡整理成連貫流程，並支援非同步背景研究任務降低操作中斷。',
          versionNote:
            '版本對應｜v1.4.2：探索、看板與閱讀路徑；v1.5.0：互動路徑地圖；v1.5.3：統一任務監控、通知已讀穩定性與英文介面自適應摘要',
          features: [
            {
              title: '研究探索（OpenAlex 整合）',
              desc: '搜尋主題、會議期刊（ICCV / ECCV / CVPR / NeurIPS 等）與公開 PDF；支援英文介面下以英文產出候選摘要與推薦理由。',
            },
            {
              title: '候選清單與閱讀看板',
              desc: '透過 Kanban 看板管理待閱讀、閱讀中、待整理與已完成狀態與閱讀百分比，並以統一任務監控彈窗追蹤背景作業。',
            },
            {
              title: '漸進式閱讀路徑 (Reading Path)',
              desc: '從主題或核心論文出發，串聯「背景入門 → 主流方法 → 核心研究 → 前沿延伸」視覺化閱讀順序與推薦理由。',
            },
          ],
        },
        {
          id: '02',
          code: '02 · Read & Annotate',
          title: '沉浸閱讀與註記',
          shortDesc: '標籤列、圖片側欄對照、手寫、貼紙',
          heading: '將個人標註與思考痕跡保留在可回溯的原文脈絡',
          lead: '內文自動裁切顯示完整圖表並支援一鍵固定於右側側欄參考，搭配 Chrome 多分頁標籤列、手寫貼紙與 Zotero 同步。',
          versionNote:
            '版本對應｜v1.5.2：貼紙與多分頁；v1.5.3：交叉跳轉與 Zotero 同步；v1.5.4：圖片自動裁切、側欄固定對照、單表重解析與 MinerU 結構解析',
          features: [
            {
              title: 'Chrome 風格多分頁標籤列設計',
              desc: '參考 Chrome 標籤頁設計，多篇論文可於頂部標籤列自由切換並各自保留閱讀位置，也可拖曳成獨立視窗並排比較。',
            },
            {
              title: '雙語對照、樣式保留與交叉跳轉',
              desc: '左側譯文與右側英文原文同步對齊，保留 PDF 粗斜體與公式排版，並支援圖表、章節、公式與文獻雙向跳轉。',
            },
            {
              title: '圖片自動裁切與右側側欄對照',
              desc: '於內文處即可完整瀏覽高解析度自動裁切圖表（支援手動重框），並可一鍵加入右側側欄作為參考，閱讀後續段落與公式免來回捲動。',
            },
            {
              title: '手寫、貼紙與套索群組',
              desc: '支援滑鼠／觸控手寫、筆寬與顏色切換、橡皮擦復原重做，以及內建貼紙素材、文字方塊與套索群組移動。',
            },
            {
              title: '全螢幕筆記與 Zotero 單向同步',
              desc: '支援全螢幕雙開筆記與原文游標引用；設定本機 Zotero 資料夾即可單向同步 PDF 並保留既有筆記與進度。',
            },
          ],
        },
        {
          id: '03',
          code: '03 · Analyze & Connect',
          title: '深度剖析與連結',
          shortDesc: '跨論文檢索、深度剖析、附加文件問 AI',
          heading: '從單篇理解延伸到跨論文比較，並回到原文核對',
          lead: '提供跨論文 KaTeX 公式檢索、長文比例分桶深度剖析、統一背景任務監控與支援附加檔案的問 AI。',
          versionNote:
            '版本對應｜v1.5.2：技術剖析與 2–5 篇比較；v1.5.3：長文分桶深度剖析、問 AI 附加文件、統一任務監控與全英文介面',
          features: [
            {
              title: '跨論文 KaTeX 雙欄檢索與全英文介面',
              desc: '同時檢索多篇論文原文與譯文，支援 KaTeX 高亮定位；Research Explorer、標籤列與任務彈窗亦提供完整英文介面。',
            },
            {
              title: '深度剖析報告與多維度比較',
              desc: '長文依章節比例分桶抽取避免後半篇截斷，產出含實證判定與證據表的剖析報告，並支援 2–5 篇橫向比較。',
            },
            {
              title: '附加文件問 AI 與統一任務監控',
              desc: '問 AI 支援附加圖表、PDF、TXT／MD 文件輔助分析與目標語言簡明作答；背景作業整合於統一任務監控彈窗。',
            },
          ],
        },
        {
          id: '04',
          code: '04 · Build Knowledge Base',
          title: '建構長期知識庫',
          shortDesc: 'Obsidian、XMind/SVG 與離線預渲染',
          heading: '將閱讀成果轉為可保存、可遷移的長期研究資產',
          lead: '把摘要、深度剖析、貼紙標註、心智圖與研究筆記匯出為 Obsidian Markdown、XMind／SVG 與離線手機版 HTML。',
          versionNote:
            '開放格式原則｜v1.5.3 支援 Markmap 展開收合與匯出 XMind／SVG，以及離線 HTML 預先編譯 KaTeX 數學公式（相容 iOS 檔案 App）',
          features: [
            {
              title: 'Obsidian 與 XMind / SVG 匯出',
              desc: '筆記與分析報告自動生成 YAML Frontmatter 與 [[WikiLinks]]，Markmap 支援展開／收合並可匯出 XMind 與 SVG。',
            },
            {
              title: '離線預渲染與開放格式保存',
              desc: '支援匯出離線 HTML 與輕量手機版（預先編譯 KaTeX 公式，相容 iOS 檔案 App），資產皆以開放格式保存於本機。',
            },
          ],
        },
      ],
    },
    ai: {
      eyebrow: 'FLEXIBLE AI SUPPORT',
      title: '彈性 AI 模型架構，依需求自由配置',
      desc: '完全不綁定單一模型或訂閱方案，支援本機 CLI 工具、主流雲端 API 與完全離地的本地模型。',
      bannerTitle: 'AI 並非使用 PaperRead 的必要條件',
      bannerDesc:
        '未配置任何模型時，文獻管理、PDF 閱讀、手寫與貼紙註記、Markdown 筆記整理與 Obsidian 匯出依然完全免費且離線可用；僅在使用全文翻譯、AI 問答與深度剖析時才需要模型。',
      bannerBadge: 'Zero Lock-in · Offline Ready',
      modes: [
        {
          id: 'none',
          kicker: 'Mode 00 · Pure Offline',
          title: '無 AI 純本地閱讀',
          desc: '免填任何 API Key，完整離線使用文獻看板、PDF 閱讀、手寫貼紙與知識整理匯出。',
          providers: ['Offline PDF', 'Handwriting', 'Obsidian Export'],
        },
        {
          id: 'cli',
          kicker: 'Mode 01 · Local CLI',
          title: '本機 CLI 工具',
          desc: '直接調用已登入授權的本機命令列 AI 工具，無須重複申請或管理額外金鑰。',
          providers: ['Antigravity CLI', 'Claude Code', 'Codex CLI'],
        },
        {
          id: 'cloud',
          kicker: 'Mode 02 · Cloud API',
          title: '雲端 API',
          desc: '自由填入自有 API Key 或自訂相容端點，用於高品質雙語翻譯與長論文剖析。',
          providers: ['OpenAI', 'Claude', 'Gemini', 'DeepSeek'],
        },
        {
          id: 'local',
          kicker: 'Mode 03 · Air-Gapped',
          title: '完全離地本地模型',
          desc: '推論全程不離開本機硬體或內網，適合機密手稿與完全斷網的研究環境。',
          providers: ['Ollama', 'LM Studio'],
        },
      ],
      configTitle: '切換檢視真實設定畫面或 config.json',
      mineru: {
        eyebrow: 'PDF STRUCTURE ENGINE · MINERU (OPTIONAL · v1.5.4)',
        title: '整合 MinerU 輕量、高精度的 PDF 結構解析引擎',
        desc: '先由 MinerU 精準擷取數學公式（LaTeX）、跨欄與合併儲存格表格及圖片座標，再交由模型純文字翻譯；支援雲端與本地自架自由切換。',
        efficiencyNote:
          '大幅提高文獻翻譯速度並顯著減少 LLM Token 消耗（搭配本機參考文獻解析，純文獻頁更不額外耗費 Token）。',
        localTitle: '本地自架模式（Local / 內網）',
        localDesc:
          '於本機或內網執行，省去檔案上傳與排隊延遲（搭配 GPU 速度最快），資料完全不外流，適合機密手稿。',
        cloudTitle: '雲端解析模式（mineru.net）',
        cloudDesc:
          '免裝環境、填上 API Token 即可上手，並支援單頁實測；連線失敗或超額時自動回退內建流程。',
      },
    },
    engineering: {
      eyebrow: 'ENGINEERING & RELEASES',
      title: '跨平台發布、系統架構與可驗證社群修復',
      desc: '除了研究功能，PaperRead 亦持續投入跨平台安裝打包、自動化建置、前後端測試與 GitHub Issue 實質問題修復。',
      archLabel: '系統組成架構',
      archLayers: [
        { title: '使用介面', items: ['Electron 桌面版', 'Docker 瀏覽器版'] },
        { title: '應用與研究服務', items: ['Python 後端 · MinerU 解析', '非同步研究／分析任務'] },
        { title: '資料與開放整合', items: ['SQLite · JSON · Markdown', 'OpenAlex · 彈性 AI 模型'] },
      ],
      milestonesLabel: '重大版本里程碑',
      milestones: [
        {
          badge: '目前正式版',
          version: 'v1.5.4',
          highlights: [
            '圖片自動裁切與右側側欄對照',
            '整合 MinerU 結構解析（雲端／本地）',
            '單表重新解析與自訂翻譯補充指令',
          ],
          current: true,
        },
        {
          version: 'v1.5.3',
          highlights: ['Zotero 單向同步', '統一任務監控彈窗', '全英文介面與多語系自適應'],
        },
        {
          version: 'v1.5.2',
          highlights: ['貼紙素材庫與手繪編輯', '多論文分頁與雙開並排', '深度剖析報告與互動心智圖'],
        },
        {
          version: 'v1.5.1',
          highlights: ['階層分類與 Zotero 批次匯入', '滑鼠手寫註記與行動版 HTML 匯出'],
        },
        {
          version: 'v1.5.0',
          highlights: ['互動式閱讀路徑地圖', 'Quick Peek 快速預覽與背景任務'],
        },
        {
          version: 'v1.4.2 – v1.4.6',
          highlights: [
            '研究工作區與 OpenAlex 探索上線',
            'AI 智慧標註與跨平台 Docker / AppImage',
          ],
        },
      ],
      issuesTitle: '可驗證的社群問題修復案例',
      issues: [
        {
          id: 'ISSUE #6 · 已關閉／完成',
          status: 'Linux / Firefox',
          title: 'Linux / Firefox 導覽按鈕失效修復',
          desc: '使用者回報 Docker 版於 Linux Firefox 無法開啟 PDF、筆記、問 AI 等面板。更新紀錄記載以明確載入 pdf-panel.js 修復初始化與函式缺失問題。',
          url: 'https://github.com/YuriyLin/PaperRead/issues/6',
        },
        {
          id: 'ISSUE #7 · 已關閉／完成',
          status: 'macOS DMG',
          title: 'macOS DMG 版 OpenAlex 無法連線修復',
          desc: '使用者提供 SSL 憑證線索。更新紀錄記載調整研究搜尋的網路請求，統一改用具信任憑證處理的 http.urlopen 確保跨環境連線穩定。',
          url: 'https://github.com/YuriyLin/PaperRead/issues/7',
        },
      ],
      contribute: {
        eyebrow: 'OPEN SOURCE CONTRIBUTION · CONTRIBUTING.MD',
        title: '歡迎提出 Issue 回報與參與 Pull Request 貢獻',
        desc: 'PaperRead 持續在 GitHub 上演進，無論是回報跨平台 Bug、功能建議、補齊測試，或協助完善介面與雙語翻譯，都非常歡迎依循專案 CONTRIBUTING.md 規範加入貢獻。',
        issueFormatTitle: 'Issue 回報建議格式（直接使用內建範本）',
        issueFormatItems: [
          '說明執行環境與安裝方式（Windows / macOS / Linux 桌面版或 Docker 自架版，以及 Python / Node 版本）。',
          '簡述重現步驟、實際現象與預期行為；若資訊尚未齊全，依然歡迎先開單補充線索。',
          '若涉及介面異常或網路／AI 連線錯誤，建議附上螢幕截圖、終端機紀錄或錯誤訊息。',
        ],
        prRulesTitle: 'Pull Request 與程式碼規範',
        prRulesItems: [
          '單一 PR 專注完成一件事，並在說明中清楚描述修改動機、影響範圍與重現測試方式（UI 調整附截圖）。',
          'Bug 修復或新功能請於 tests/ 補上對應單元測試；PR 提交後 GitHub Actions 會於 Win / macOS / Linux 自動驗證。',
          '請勿手動更動 CHANGELOG.md 或版本號（由維護者於正式發布時統一更新）。',
          '介面文字須支援雙語切換：前端以 PR.t("...")、後端以 tr("...") 包裝中文文案，並於 easyread/web/i18n/en.json 補齊英文。',
        ],
        devCmdTitle: '本機開發與自動化檢查指令（需 Python 3.10+ / Electron 另需 Node.js 22+）',
        ctaIssue: '前往提出 Issue',
        ctaContributing: '閱讀 CONTRIBUTING.md',
        ctaPr: '查看 Pull Requests',
      },
    },
    install: {
      eyebrow: 'INSTALLATION & QUICK START',
      title: '多平台安裝與快速上手導覽',
      descPrefix:
        '目前最新正式發布版本為 v1.5.4。支援桌面端一鍵安裝、應用內自動檢查更新與 Docker 自架瀏覽器版。',
      detectedPrefix: '已自動偵測您的環境：',
      copyBtn: '複製指令',
      copiedBtn: '已複製',
      tabs: {
        windows: 'Windows (x64)',
        macos: 'macOS (Apple Silicon)',
        linux: 'Linux (x64)',
        docker: 'Docker 瀏覽器版（自架伺服器）',
      },
    },
    privacy: {
      eyebrow: 'DATA & PRIVACY',
      title: '資料隱私與開放本機目錄結構',
      desc: '點擊左側資料夾與檔案節點，直接檢視 PaperRead 在本機磁碟中如何以開放格式管理你的研究資料。',
      treeLabel: 'Local Workspace Directory',
      previewHint: '點選左側任意檔案預覽開放格式內容',
      points: [
        {
          title: '開放 JSON、Markdown 與 SQLite 儲存',
          desc: '無專有加密鎖定。書目、手寫座標、貼紙位置與雙語閱讀筆記皆以可讀檔案保存於本機，便於備份與遷移。',
        },
        {
          title: '原生支援 Git 版本控制與雲端硬碟備份',
          desc: '直接將 ~/PaperRead（Windows 為 C:\\Users\\<使用者名稱>\\PaperRead）納入 Git 管理或透過 iCloud、Dropbox、Syncthing 同步。',
        },
        {
          title: '最小化且透明的網路連線原則',
          desc: '僅在使用者主動執行「文獻搜尋」或選擇「雲端 AI 模型」時，才會傳送必要查詢或段落；本機閱讀與離地模型全程不連外。',
        },
      ],
    },
    footer: {
      tagline:
        '從文獻探索、論文閱讀到知識整理的本機個人研究工作區。歡迎前往 GitHub 提出建議、回報問題或參與開源貢獻。',
      docsHeading: '文件與技術規格',
      communityHeading: '專案與社群資源',
      licenseNote: '以 MIT License 開源釋出 · 致謝 EasyRead 專案奠定基礎',
      creditsNote: '貼紙素材授權：Lucide (ISC) · Feather (MIT) · Mega Doodles Pack (CC BY-SA 4.0)',
      links: {
        guide: '使用手冊',
        design: '系統設計',
        format: '資料格式',
        api: 'API 文件',
        changelog: '更新紀錄 (CHANGELOG)',
        contributing: '參與貢獻 (CONTRIBUTING)',
        issues: '回報問題 (Issues)',
      },
    },
  },
  en: {
    nav: {
      workflow: 'Modules',
      ai: 'AI Models',
      engineering: 'Contribute',
      install: 'Install',
      privacy: 'Privacy',
      download: 'Download',
      themeToDark: 'Switch to Dark Mode',
      themeToLight: 'Switch to Paper Light Mode',
      langSwitchLabel: 'EN / 繁',
    },
    hero: {
      kicker: 'OPEN SOURCE · LOCAL-FIRST AI RESEARCH WORKSPACE · v1.5.4',
      brandSuffix: 'AI Academic Research & Paper Reading Workspace',
      headline: 'A Local-First Personal Research Workspace from Discovery to Knowledge',
      subtitle:
        'Built upon EasyRead, unifying OpenAlex literature search, reading Kanban, bilingual original-page alignment, ink & sticker annotations, and Obsidian export in one local workspace.',
      ctaDesktop: 'Download Desktop (v1.5.4)',
      ctaDocker: 'Docker Quick Deploy',
      ctaGithub: 'Browse GitHub',
      workspaceLabel: '~/PaperRead · Local Workspace',
      modules: [
        { num: '01', en: 'DISCOVER', zh: 'Literature Search & Board', targetStep: '01' },
        { num: '02', en: 'READ', zh: 'Bilingual & Annotations', targetStep: '02' },
        { num: '03', en: 'ANALYZE', zh: 'Deep Analysis & Mindmap', targetStep: '03' },
        { num: '04', en: 'ORGANIZE', zh: 'Obsidian Knowledge Base', targetStep: '04' },
      ],
      tabs: {
        bilingual: 'Bilingual & PDF Lightbox',
        kanban: 'Kanban & Reading Path',
        annotate: 'Handwriting & Stickers',
        mindmap: 'Paper Mindmap',
      },
    },
    why: {
      eyebrow: 'WHY PAPERREAD',
      title: 'From Scattered Research Tools to a Sustainable Local Workspace',
      desc: 'Researchers constantly jump between academic search engines, PDF readers, AI chats, and note apps. PaperRead bridges those gaps in a single open-source workspace.',
      flowTitle: 'Research Flow',
      flowSteps: [
        { title: 'Explore', desc: 'Topics & citation lineage' },
        { title: 'Organize', desc: 'Candidates & Kanban board' },
        { title: 'Read', desc: 'Original page & annotations' },
        { title: 'Connect', desc: 'Comparison & vault export' },
      ],
      painLabel: 'The Pain',
      solveLabel: 'PaperRead Solution',
      cards: [
        {
          title: 'End Tool Fragmentation',
          summary: 'Search, reading progress, and notes unified in one local workspace.',
          pain: 'Dozens of search tabs, cluttered PDF folders, and notes scattered across disconnected tools.',
          solve: 'Unify OpenAlex exploration, Kanban triage, bilingual reading, and note synthesis in one desktop app.',
        },
        {
          title: 'Preserve Original Context',
          summary: 'Bilingual alignment and PDF original-page lightbox prevent AI hallucinations.',
          pain: 'Text-only AI summaries miss experimental constraints and distort equations and figures.',
          solve: 'Inspect translated prose beside the original PDF page while keeping every note anchored to its source.',
        },
        {
          title: 'Local-First & Full Control',
          summary: 'Stored locally in JSON, Markdown & SQLite (~/PaperRead) with zero cloud lock-in.',
          pain: 'Closed SaaS platforms lock libraries behind accounts and restrict offline portability.',
          solve: 'Open structured files on your own drive—ready for Git version control, Zotero import, and backups.',
        },
      ],
      attributionEyebrow: 'OPEN SOURCE ATTRIBUTION',
      attributionTitle: 'Upstream Foundation & Extension Scope',
      easyreadTitle: 'Open-Source Foundation | EasyRead',
      easyreadDesc:
        'Builds upon EasyRead’s core AI paper reading foundation—PDF original/translation alignment, foundational annotations, and AI chat—with explicit credit to upstream authors.',
      paperreadTitle: 'PaperRead Extensions',
      paperreadDesc:
        'Expands into literature discovery (OpenAlex, Kanban, reading paths), ink & sticker annotations, Zotero one-way folder sync, mindmaps, multi-paper comparison, and cross-platform packaging.',
    },
    workflow: {
      eyebrow: 'CORE WORKFLOW · 01 TO 04',
      title: 'Interactive Tour of the Four Research Modules',
      desc: 'Select each stage and sub-feature to preview real PaperRead screenshots and workflows.',
      steps: [
        {
          id: '01',
          code: '01 · Discover & Organize',
          title: 'Discover & Organize',
          shortDesc: 'OpenAlex, Kanban, Reading Path',
          heading: 'From finding relevant papers to knowing what to read next',
          lead: 'Connect topic search, candidate triaging, and citation lineage with non-blocking async background research tasks.',
          versionNote:
            'Releases | v1.4.2: Discovery & Kanban; v1.5.0: Interactive Path Map; v1.5.3: Unified Task Monitor, Notification Fix & English Adaptive Abstracts',
          features: [
            {
              title: 'OpenAlex Research Search',
              desc: 'Search topics, conferences (ICCV, ECCV, CVPR, NeurIPS), and open PDFs; English UI automatically generates English candidate summaries and path rationales.',
            },
            {
              title: 'Candidate List & Reading Kanban',
              desc: 'Track To Read, Reading, Organizing, and Done columns in SQLite, backed by a unified job monitor modal.',
            },
            {
              title: 'Progressive Reading Path',
              desc: 'Trace foundational background → mainstream models → core papers → frontier gaps visually with rationale.',
            },
          ],
        },
        {
          id: '02',
          code: '02 · Read & Annotate',
          title: 'Read & Annotate',
          shortDesc: 'Tab Bar, Figure Dock, Ink, Stickers',
          heading: 'Keep personal annotations anchored to traceable source context',
          lead: 'Inspect auto-cropped figures inline or pinned in the right side panel alongside Chrome-style tabs, ink annotations, and Zotero sync.',
          versionNote:
            'Releases | v1.5.2: Tabs & Stickers; v1.5.3: Cross-Refs & Zotero Sync; v1.5.4: Auto-Cropped Figures, Side Dock Reference, Single-Table Reparse & MinerU',
          features: [
            {
              title: 'Chrome-Style Multi-Tab Bar Design',
              desc: 'Switch effortlessly between open papers in the top Chrome-style tab strip with preserved positions, or drag tabs out to compare.',
            },
            {
              title: 'Bilingual Split View, Styling & Cross-Refs',
              desc: 'Align translated prose beside original text with preserved PDF bold/italic styling and bidirectional figure/equation jumps.',
            },
            {
              title: 'Auto-Cropped Figures & Side-Panel Reference',
              desc: 'Render crisp auto-cropped figures inline (with manual recrop) and pin any figure to the right dock so you never scroll back to compare.',
            },
            {
              title: 'Handwriting, Stickers & Lasso Group',
              desc: 'Mouse/stylus ink with width, color, eraser, undo/redo, built-in sticker packs, and lasso group dragging.',
            },
            {
              title: 'Fullscreen Notes & Zotero One-Way Sync',
              desc: 'Fullscreen split notes with cursor citations plus one-way local Zotero PDF sync that preserves existing notes and progress.',
            },
          ],
        },
        {
          id: '03',
          code: '03 · Analyze & Connect',
          title: 'Analyze & Connect',
          shortDesc: 'Cross-Paper Search, Deep Audit, File Q&A',
          heading: 'Move from single-paper reading to cross-paper synthesis',
          lead: 'Query bilingual KaTeX corpora, run bucketed long-paper audits, monitor jobs centrally, and attach reference files to Ask AI.',
          versionNote:
            'Releases | v1.5.2: Deep Audit & 2–5 Paper Compare; v1.5.3: Bucketed Audit Reports, File-Attached Ask AI, Unified Job Monitor & Full English UI',
          features: [
            {
              title: 'Cross-Paper KaTeX Search & Full English UI',
              desc: 'Search English and translated corpora with KaTeX highlights; Research Explorer, tabs, logs, and job modals support full English.',
            },
            {
              title: 'Deep Audit Report & Multi-Paper Compare',
              desc: 'Section-proportioned bucketing prevents long-paper truncation; inspect verdict & evidence tables or compare 2–5 papers.',
            },
            {
              title: 'File-Attached Ask AI & Unified Job Monitor',
              desc: 'Attach figures, PDFs, TXT, or MD files to Ask AI with target-language replies, backed by a unified background task monitor.',
            },
          ],
        },
        {
          id: '04',
          code: '04 · Build Knowledge Base',
          title: 'Build Your Knowledge Base',
          shortDesc: 'Obsidian, XMind/SVG & Offline KaTeX',
          heading: 'Turn deep reading into durable, portable research assets',
          lead: 'Export structured summaries, audits, mindmaps, and user notes into Obsidian Markdown, XMind/SVG, and offline mobile HTML.',
          versionNote:
            'Open Format | v1.5.3 adds Markmap expand/collapse with XMind/SVG export and pre-rendered offline KaTeX HTML for iOS Files',
          features: [
            {
              title: 'Obsidian & XMind / SVG Export',
              desc: 'Generate YAML frontmatter and [[WikiLinks]] for Obsidian, plus Markmap expand/collapse controls and XMind/SVG export.',
            },
            {
              title: 'Pre-Rendered Offline HTML & Open Storage',
              desc: 'Export standalone HTML or compact mobile packages with pre-compiled KaTeX (compatible with iOS Files) in open local formats.',
            },
          ],
        },
      ],
    },
    ai: {
      eyebrow: 'FLEXIBLE AI SUPPORT',
      title: 'Flexible AI Model Architecture — Never Mandatory',
      desc: 'No vendor lock-in. Connect local CLI agents, cloud APIs, or air-gapped local models—or run offline without AI.',
      bannerTitle: 'AI is NOT required to use PaperRead',
      bannerDesc:
        'Without any model configured, library management, PDF reading, ink & sticker annotations, and Markdown export remain 100% free and offline. Models are only needed for translation, Q&A, and AI synthesis.',
      bannerBadge: 'Zero Lock-in · Offline Ready',
      modes: [
        {
          id: 'none',
          kicker: 'Mode 00 · Pure Offline',
          title: 'No-AI Offline Mode',
          desc: 'Zero API keys required. Full access to Kanban, PDF reader, handwriting, stickers, and Obsidian export.',
          providers: ['Offline PDF', 'Handwriting', 'Obsidian Export'],
        },
        {
          id: 'cli',
          kicker: 'Mode 01 · Local CLI',
          title: 'Local CLI Tools',
          desc: 'Invoke authenticated CLI agents already installed on your machine without extra API key setup.',
          providers: ['Antigravity CLI', 'Claude Code', 'Codex CLI'],
        },
        {
          id: 'cloud',
          kicker: 'Mode 02 · Cloud API',
          title: 'Cloud APIs',
          desc: 'Use your own API key or compatible endpoint for frontier-grade translation and deep paper breakdown.',
          providers: ['OpenAI', 'Claude', 'Gemini', 'DeepSeek'],
        },
        {
          id: 'local',
          kicker: 'Mode 03 · Air-Gapped',
          title: 'Local Offline Models',
          desc: 'Keep all tokens on your own workstation or LAN—ideal for unpublished drafts and offline labs.',
          providers: ['Ollama', 'LM Studio'],
        },
      ],
      configTitle: 'Toggle between real settings UI and config.json',
      mineru: {
        eyebrow: 'PDF STRUCTURE ENGINE · MINERU (OPTIONAL · v1.5.4)',
        title: 'MinerU Lightweight, High-Precision PDF Structure Parsing',
        desc: 'Extract LaTeX formulas, merged-cell tables, and figure coordinates via MinerU before pure-text LLM translation—freely switchable between Local Self-Hosted and Cloud modes.',
        efficiencyNote:
          'Accelerates paper translation while significantly reducing LLM token consumption (paired with local reference parsing at zero extra token cost).',
        localTitle: 'Local Self-Hosted Mode',
        localDesc:
          'Runs on your workstation or LAN with zero upload/queue latency (fastest with GPU) and keeps sensitive drafts 100% private.',
        cloudTitle: 'Cloud Parsing Mode (mineru.net)',
        cloudDesc:
          'Zero local setup—enter your API Token and test on 1 page immediately, with automatic fallback to the built-in pipeline on error or quota limit.',
      },
    },
    engineering: {
      eyebrow: 'ENGINEERING & RELEASES',
      title: 'Cross-Platform Releases, Architecture & Community Fixes',
      desc: 'Beyond features, PaperRead invests in Electron & Docker builds, CI automation, test coverage, and verifiable community issue resolutions.',
      archLabel: 'System Architecture',
      archLayers: [
        { title: 'Client Layer', items: ['Electron Desktop', 'Docker Browser Edition'] },
        { title: 'Application & Tasks', items: ['Python Backend · MinerU Engine', 'Async Research / Analysis Jobs'] },
        { title: 'Data & Integrations', items: ['SQLite · JSON · Markdown', 'OpenAlex · Flexible AI'] },
      ],
      milestonesLabel: 'Major Release Milestones',
      milestones: [
        {
          badge: 'Current',
          version: 'v1.5.4',
          highlights: [
            'Auto-cropped figures & right-dock reference',
            'MinerU PDF parser (Cloud / Local self-hosted)',
            'Single-table reparse & custom translation prompts',
          ],
          current: true,
        },
        {
          version: 'v1.5.3',
          highlights: ['Zotero one-way sync', 'Unified task monitor modal', 'Full English UI & adaptive output'],
        },
        {
          version: 'v1.5.2',
          highlights: ['Stickers & freehand editing', 'Multi-tab bar & split windows', 'Deep audit & interactive mindmap'],
        },
        {
          version: 'v1.5.1',
          highlights: ['Nested folders & Zotero import', 'Mouse ink & mobile HTML export'],
        },
        {
          version: 'v1.5.0',
          highlights: ['Interactive reading path map', 'Quick Peek drawer & background jobs'],
        },
        {
          version: 'v1.4.2 – v1.4.6',
          highlights: [
            'Research workspace & OpenAlex discovery launch',
            'AI Smart Annotations, Docker & Linux AppImage',
          ],
        },
      ],
      issuesTitle: 'Verifiable Community Issue Fixes',
      issues: [
        {
          id: 'ISSUE #6 · Closed / Resolved',
          status: 'Linux / Firefox',
          title: 'Fixed Navigation Panel Buttons on Linux Firefox',
          desc: 'Docker users on Linux Firefox reported PDF, Notes, and Ask AI panels failing to open. Resolved by explicitly loading pdf-panel.js and fixing initialization.',
          url: 'https://github.com/YuriyLin/PaperRead/issues/6',
        },
        {
          id: 'ISSUE #7 · Closed / Resolved',
          status: 'macOS DMG',
          title: 'Fixed OpenAlex SSL Connection in macOS DMG',
          desc: 'Using SSL certificate clues from community feedback, search requests were unified onto http.urlopen with proper trusted certificate handling.',
          url: 'https://github.com/YuriyLin/PaperRead/issues/7',
        },
      ],
      contribute: {
        eyebrow: 'OPEN SOURCE CONTRIBUTION · CONTRIBUTING.MD',
        title: 'Issues & Pull Requests Are Warmly Welcome',
        desc: 'PaperRead evolves openly on GitHub. Whether you are reporting cross-platform bugs, proposing features, adding test coverage, or refining i18n, follow the CONTRIBUTING.md conventions below to get started.',
        issueFormatTitle: 'Issue Reporting Format (Built-In Templates)',
        issueFormatItems: [
          'Include your environment and setup mode (Windows / macOS / Linux desktop or Docker edition, plus Python / Node versions).',
          'Describe reproduction steps, observed behavior, and expected result—even partial clues are welcome.',
          'Attach screenshots, console logs, or error tracebacks for UI regressions or network/AI errors.',
        ],
        prRulesTitle: 'Pull Request & Code Conventions',
        prRulesItems: [
          'Keep one PR focused on a single purpose with a clear why/what summary and screenshots for UI changes.',
          'Add regression or feature tests under tests/; GitHub Actions validates every PR across Windows, macOS, and Linux.',
          'Do not edit CHANGELOG.md or bump version numbers (maintainers update them at release time).',
          'Wrap Chinese UI strings in PR.t("...") (frontend) or tr("...") (backend) and add English keys in easyread/web/i18n/en.json.',
        ],
        devCmdTitle: 'Local Dev & Validation Commands (Python 3.10+ · Node.js 22+ for Electron)',
        ctaIssue: 'Open an Issue',
        ctaContributing: 'Read CONTRIBUTING.md',
        ctaPr: 'Browse Pull Requests',
      },
    },
    install: {
      eyebrow: 'INSTALLATION & QUICK START',
      title: 'Cross-Platform Desktop & Self-Hosted Docker Setup',
      descPrefix:
        'Latest stable release: v1.5.4. Available for Windows, macOS, Linux, and Docker with built-in update notifications.',
      detectedPrefix: 'Detected OS:',
      copyBtn: 'Copy Command',
      copiedBtn: 'Copied',
      tabs: {
        windows: 'Windows (x64)',
        macos: 'macOS (Apple Silicon)',
        linux: 'Linux (x64)',
        docker: 'Docker Browser Edition (Self-Hosted)',
      },
    },
    privacy: {
      eyebrow: 'DATA & PRIVACY',
      title: 'Transparent Local Storage & Open Directory Structure',
      desc: 'Click any file in the local directory tree to inspect how PaperRead stores your papers, annotations, and notes.',
      treeLabel: 'Local Workspace Directory',
      previewHint: 'Click a file on the left to inspect its open format',
      points: [
        {
          title: 'Open JSON, Markdown & SQLite Storage',
          desc: 'No proprietary lock-in. Metadata, ink coordinates, stickers, and notes live in readable files on your drive.',
        },
        {
          title: 'Git-Friendly & Cloud-Drive Ready',
          desc: 'Track ~/PaperRead (or C:\\Users\\<username>\\PaperRead) with Git or sync via iCloud, Dropbox, or Syncthing.',
        },
        {
          title: 'Minimal & Transparent Network Calls',
          desc: 'Data is only sent when you explicitly run online literature search or invoke a cloud AI model.',
        },
      ],
    },
    footer: {
      tagline:
        'A local-first personal research workspace from literature discovery to knowledge synthesis. Contributions and issues are welcome on GitHub.',
      docsHeading: 'Documentation',
      communityHeading: 'Project & Community',
      licenseNote: 'Open-sourced under the MIT License · Built upon the EasyRead project',
      creditsNote: 'Sticker Assets: Lucide (ISC) · Feather (MIT) · Mega Doodles Pack (CC BY-SA 4.0)',
      links: {
        guide: 'User Guide',
        design: 'System Design',
        format: 'Data Format',
        api: 'API Docs',
        changelog: 'CHANGELOG',
        contributing: 'CONTRIBUTING',
        issues: 'Issues',
      },
    },
  },
};
