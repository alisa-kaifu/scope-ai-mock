const baseNames = [
  "アニメIP総合",
  "映画ブランドA",
  "バラエティ番組B",
  "音楽フェスC",
  "配信サービスD",
  "タレント企画E",
  "ドラマ枠F",
  "スポーツ企画G",
  "ニュース特番H",
  "ゲームIP I",
  "地域イベントJ",
  "教育番組K",
  "映画ブランドL",
  "アニメタイトルM",
  "シリーズN",
  "Web番組O",
  "YouTube企画P",
  "短尺動画Q",
  "コミックIP R",
  "映画ブランドS",
  "海外ドラマT",
  "ライブ配信U",
  "ドキュメンタリーV",
  "週末特番W",
  "アイドル企画X",
  "映画ブランドY"
];

const tabScale = {
  current: 1.0,
  prev: 0.85,
  media: 1.12
};

const metricDefs = [
  { key: "reach", title: "総接触数（万人）", color: "#ee9a3a" },
  { key: "search", title: "指名検索数（万人）", color: "#5f97d3" },
  { key: "mentions", title: "トピック掲載数（件）", color: "#66b95d" },
  { key: "sns", title: "SNS反応量（件）", color: "#df6464" }
];

let aiCurrentSelectedBrand = "";

const tabConfigMap = {
  trendRanking: {
    targetId: "tabBodyTrendRanking",
    title: "トレンド：ランキング",
    subtitle: "当月値でランキング。各指標の上位ブランドを比較する画面です。",
    aiTitle: "AIサマリ「トレンド：ランキング」"
  },
  trendHit: {
    targetId: "tabBodyOshiHitAnalysis",
    title: "トレンド：推しヒット分析",
    subtitle: "推しヒット分析：急上昇トレンドと注目ブランドを確認します。",
    aiTitle: "AIサマリ「トレンド：推しヒット分析」"
  },
  marketChange: {
    targetId: "tabBodyMarketChange",
    title: "トレンド：市場変化",
    subtitle: "市場変化：市場全体の変化、伸長/縮小傾向を確認します。",
    aiTitle: "AIサマリ「トレンド：市場変化」"
  },
  deepDiveIndividual: {
    targetId: "tabBodyFukabori",
    title: "深堀りする：個別分析",
    subtitle: "個別分析：選択したブランドの深掘りレポートを表示します。",
    aiTitle: "AIサマリ「深堀りする：個別分析」"
  },
  deepDiveComparison: {
    targetId: "tabBodyFukabori",
    title: "深掘りする：比較分析",
    subtitle: "比較分析：ブランド比較の視点を表示します。",
    aiTitle: "AIサマリ「深掘りする：比較分析」"
  },
  discover: {
    targetId: "tabBodyHakken",
    title: "発見する",
    subtitle: "発見する：気になるブランドを見つけるヒントを提供します。",
    aiTitle: "AIサマリ「発見する」"
  },
  search: {
    targetId: "tabBodySagasu",
    title: "探す",
    subtitle: "探す：条件を設定してブランドを検索します。",
    aiTitle: "AIサマリ「探す」"
  },
};

let currentDashboardTitle = tabConfigMap.trendRanking.title;
let currentTabKey = "trendRanking";
let currentPdfMode = "main";

const mainPdfPreviewMap = {
  trendRanking: { preview: "ranking", caption: "「トレンド：ランキング」PDF" },
  trendHit: { preview: "hit", caption: "「トレンド：推しヒット分析」PDF" },
  marketChange: { preview: "market", caption: "「トレンド：市場変化」PDF" },
  deepDiveIndividual: { preview: "deepdive", caption: "「深掘りする：個別分析」PDF" },
  deepDiveComparison: { preview: "deepdive", caption: "「深掘りする：比較分析」PDF" },
  discover: { preview: "discover", caption: "「発見する」PDF" },
  search: { preview: "search", caption: "「探す」PDF" }
};

const aiPdfPreview = { preview: "ai", caption: "分析AIエージェント PDF（プレビュー）" };

function createSeed(tabKey) {
  const factor = tabScale[tabKey];
  return baseNames.map((name, i) => {
    const reach = Math.round((260 - i * 7 + (i % 4) * 11) * factor);
    const search = Math.round((180 - i * 5 + (i % 3) * 8) * factor);
    const mentions = Math.round((120 - i * 3 + (i % 5) * 7) * factor);
    const sns = Math.round((740 - i * 20 + (i % 6) * 33) * factor);

    return {
      name,
      reach: Math.max(reach, 7),
      search: Math.max(search, 5),
      mentions: Math.max(mentions, 3),
      sns: Math.max(sns, 20)
    };
  });
}

function renderChart(tabKey) {
  const grid = document.getElementById("chartGrid");
  if (!grid) {
    return;
  }
  const data = createSeed(tabKey);
  grid.innerHTML = "";

  for (const metric of metricDefs) {
    const max = Math.max(...data.map((d) => d[metric.key]));
    const col = document.createElement("section");
    col.className = "metric-col";
    col.innerHTML = `<h3 class="metric-head">${metric.title}</h3>`;

    const list = document.createElement("ol");
    list.className = "metric-list";

    for (const row of data) {
      const item = document.createElement("li");
      item.className = "metric-item";
      const ratio = (row[metric.key] / max) * 100;
      item.innerHTML = `
        <span class="media-name">${row.name}</span>
        <span class="bar-wrap">
          <span class="bar" style="width:${ratio}%; background:${metric.color};"></span>
        </span>
        <span class="metric-value">${row[metric.key]}</span>
      `;
      list.appendChild(item);
    }

    col.appendChild(list);
    grid.appendChild(col);
  }
}

function initTabs() {
  const tabs = document.querySelectorAll("#rankTabs button");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      renderChart(tab.dataset.tab);
    });
  });
}

function initAiDrawer() {
  const fab = document.getElementById("aiFab");
  const layer = document.getElementById("aiLayer");
  const drawer = document.getElementById("aiDrawer");
  const backdrop = document.getElementById("aiBackdrop");
  const toggleHandle = document.getElementById("aiDrawerToggle");
  const collapseHandle = document.getElementById("aiDrawerCollapse");
  const closeBtn = document.getElementById("aiDrawerClose");

  if (!fab || !layer || !drawer || !backdrop || !toggleHandle || !collapseHandle || !closeBtn) {
    return;
  }

  let canDock = true;
  let isMinimized = false;

  const updateHandleStates = () => {
    const isFull = drawer.classList.contains("is-full");
    const isCompact = drawer.classList.contains("is-compact");
    toggleHandle.setAttribute("aria-pressed", String(isFull));
    toggleHandle.textContent = isMinimized ? "◀" : isFull ? "▶" : "◀";
    toggleHandle.classList.toggle("is-disabled", !canDock && !isFull && !isMinimized && !isCompact);
    collapseHandle.classList.toggle("is-visible", !isFull && !isMinimized && canDock);
    collapseHandle.classList.toggle("is-disabled", !canDock);
  };

  const setDockAvailability = (dockable) => {
    canDock = dockable;
    toggleHandle.disabled = false;
    toggleHandle.setAttribute("aria-disabled", "false");
    collapseHandle.disabled = !dockable;
    collapseHandle.setAttribute("aria-disabled", String(!dockable));
    if (!dockable) {
      collapseHandle.classList.remove("is-visible");
    }
    updateHandleStates();
  };

  const applyDockedWidth = () => {
    if (window.innerWidth <= 980) {
      setDockAvailability(false);
      drawer.style.removeProperty("width");
      return false;
    }
    const mainColumn = document.querySelector(".main-column");
    if (!mainColumn) {
      setDockAvailability(false);
      drawer.style.removeProperty("width");
      return false;
    }
    const mainRight = mainColumn.getBoundingClientRect().right;
    const available = Math.floor(window.innerWidth - mainRight);
    const dockable = available >= 300;
    setDockAvailability(dockable);
    if (!dockable) {
      drawer.style.removeProperty("width");
      return false;
    }
    if (drawer.classList.contains("is-compact") || drawer.classList.contains("is-min")) {
      drawer.style.removeProperty("width");
      return true;
    }
    drawer.style.width = `${available}px`;
    return true;
  };

  const setExpanded = (expanded) => {
    if (!canDock && !expanded) {
      setMinimized(true);
      return;
    }
    if (expanded) {
      isMinimized = false;
      drawer.classList.remove("is-min");
      drawer.classList.remove("is-compact");
    } else {
      drawer.classList.remove("is-full");
      drawer.classList.remove("is-min");
      drawer.classList.add("is-compact");
    }
    drawer.classList.toggle("is-full", expanded);
    drawer.style.removeProperty("width");
    updateHandleStates();
  };

  const setMinimized = (minimized) => {
    if (minimized) {
      isMinimized = true;
      drawer.classList.remove("is-full");
      drawer.classList.remove("is-compact");
      drawer.classList.add("is-min");
      updateHandleStates();
      return;
    }
    isMinimized = false;
    drawer.classList.remove("is-min");
    setExpanded(true);
  };

  const setOpen = (open) => {
    layer.classList.toggle("is-open", open);
    layer.setAttribute("aria-hidden", String(!open));
    fab.setAttribute("aria-expanded", String(open));
    if (!open) {
      isMinimized = false;
      drawer.classList.remove("is-min");
      drawer.classList.remove("is-compact");
      drawer.classList.remove("is-full");
      drawer.style.removeProperty("width");
    } else if (!drawer.classList.contains("is-full")) {
      setExpanded(true);
    } else if (!canDock) {
      setExpanded(true);
    }
    updateHandleStates();
  };

  fab.addEventListener("click", () => {
    const nextOpen = !layer.classList.contains("is-open");
    setOpen(nextOpen);
  });

  closeBtn.addEventListener("click", () => setOpen(false));
  backdrop.addEventListener("click", () => setOpen(false));
  toggleHandle.addEventListener("click", () => {
    if (isMinimized) {
      setMinimized(false);
      return;
    }
    if (!canDock) {
      setMinimized(true);
      return;
    }
    const nextExpanded = drawer.classList.contains("is-full") ? false : true;
    setExpanded(nextExpanded);
  });

  collapseHandle.addEventListener("click", () => {
    if (isMinimized) {
      setMinimized(false);
      return;
    }
    setMinimized(true);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && layer.classList.contains("is-open")) {
      setOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    applyDockedWidth();
    if (isMinimized && !canDock) {
      setMinimized(false);
      setExpanded(true);
    }
  });

  applyDockedWidth();
  updateHandleStates();
}

function initAiMockContent() {
  const summaryActions = document.getElementById("aiSummaryActions");
  const summaryOutput = document.getElementById("aiSummaryOutput");
  const panelLoading = document.getElementById("aiPanelLoading");
  const aiSelectedBrandRow = document.getElementById("aiSelectedBrandRow");
  const aiSelectedBrand = document.getElementById("aiSelectedBrand");
  const dataCoverageRow = document.getElementById("aiDataCoverageRow");

  if (!summaryActions || !summaryOutput) {
    return;
  }

  let isSummaryReady = true;
  let activeSummaryKey = "trend_highlight";
  const waitingText = "エンタメブランドを選択し、レポート出力ボタンを押すとサマリが表示されます";


  const summaryMap = {
    overview:
      "<h3>全体トレンド</h3><p>推しファン人数、支出金額がダウントレンドor横ばいorアップトレンド</p>",
    trend_highlight:
      `<div class="columnBox_w">
<p>&nbsp;</p>
<h1>2026年1月の「推しエンタメブランド トレンド」</h1>
<h4>「トレンド：ランキング」の推しファン人数ランキングの動向を、生成AIを用いてサマライズしました。<br>2026年1月17日調査分データを基にしています。数値の定義などは本ページ下部の注記を参照ください。</h4>
本機能は、生成AIが出力しています。その性質上、データや言及内容には間違いがある可能性があります。引用元の「トレンド：ランキング」データと併せてご覧ください。出力結果について、当社は要約の正確性や品質を保証しません。詳しくは、本ページ下部の注意事項をお読みください。本機能は予告なく変更、中止する可能性があります。

<p>&nbsp;</p>
<h2>エグゼクティブサマリ</h2>
<p>
推しファン人数ランキングTop20の顔ぶれに大きな変動はありませんでした。
<br>急上昇ランキングにはドラマ作品が多数ランクイン。女性の支持がランキングの変動を牽引した。
<br>人数ベースの急上昇1位は「<b>じゃあ、あんたが作ってみろよ</b>」、
<br>比率ベースの急上昇1位は「<b>ちょっとだけエスパー</b>」、ドラマ以外では「<b>カードファイト!! ヴァンガード</b>」でした。
</p>

<span id="feature02">&nbsp;</span>
<h2>今月のランキング変動とその支持層：今月の急上昇ラインキングTop5</h2>

<p>
</p><h4>【総合】ドラマ作品が急上昇ランキングを席巻。女性層の高い支持が変動を牽引</h4>
1位：<b>「じゃあ、あんたが作ってみろよ」</b>（ドラマ・映画・配信）30万人増。女性50-60代で1位の高い支持が影響。
<br>2位：<b>「良いこと悪いこと」</b>（ドラマ・映画・配信）23万人増。女性30-40代で1位の高い支持が影響。
<br>3位：<b>「呪術廻戦」</b>（アニメ・マンガ・本）21万人増。女性10-20代で1位の高い支持が影響。
<br>4位：<b>「ザ・ロイヤルファミリー」</b>（ドラマ・映画・配信）19万人増。女性50-60代で2位の高い支持が影響。
<br>5位：<b>「ちょっとだけエスパー」</b>（ドラマ・映画・配信）14万人増。女性50-60代で4位の高い支持が影響。
<p></p>
<p>
比率ベースでは<b>「ちょっとだけエスパー」</b>が1位（+1263%）、<b>「ひらやすみ」</b>が2位（+786%）、<b>「イクサガミ」</b>が3位（+509%）。
</p>

<span id="feature03">&nbsp;</span>
<h2>今月のランキング変動とその支持層：代表メディア大分類別Top3</h2>

<p>
</p><h4>【アニメ・マンガ・本】女性の幅広い年代で高い支持が急上昇を牽引</h4>
1位（+21万人）：<b>「呪術廻戦」</b>女性10-20代で1位の高い支持が影響。
<br>2位（+6万人）：<b>「転生したらスライムだった件」</b>男性50-60代で11位の高い支持が影響。
<br>3位（+5万人）：<b>「ハローキティ(サンリオ)」</b>女性30-40代で4位の高い支持が影響。
<br><br>比率ベースでは<b>「ちょっとだけエスパー」</b>が1位（+1263%）。
<p></p>

<p>
</p><h4>【ドラマ・映画・配信】女性50-60代の高い支持が急上昇を牽引</h4>
1位（+30万人）：<b>「じゃあ、あんたが作ってみろよ」</b>女性50-60代で1位の高い支持。
<br>2位（+23万人）：<b>「良いこと悪いこと」</b>女性30-40代で1位の高い支持。
<br>3位（+19万人）：<b>「ザ・ロイヤルファミリー」</b>女性50-60代で2位の高い支持。
<br><br>比率ベースでは<b>「ちょっとだけエスパー」</b>が1位（+1263%）。
<p></p>

<p>
</p><h4>【タレント・音楽・ネット動画など】女性10-20代の支持が急上昇を牽引</h4>
1位（+6万人）：<b>「M!LK」</b>女性10-20代で4位の高い支持。
<br>2位（+5万人）：<b>「ホロライブプロダクション」</b>男性30-40代で8位の高い支持。
<br>3位（+5万人）：<b>「明石家さんま」</b>回答者全体で13位の高い支持。
<br><br>比率ベースでは<b>「M!LK」</b>が1位（+275%）。
<p></p>

<p>
</p><h4>【ゲーム】男性の幅広い年代で高い支持が急上昇を牽引</h4>
1位（+5万人）：<b>「競馬」</b>男性30-40代で1位の高い支持。
<br>2位（+4万人）：<b>「アイドルマスター」</b>男性10-20代で8位の高い支持。
<br>3位（+3万人）：<b>「カードファイト!! ヴァンガード」</b>男性30-40代で12位の高い支持。
<br><br>比率ベースで<b>「カードファイト!! ヴァンガード」</b>が1位（+307%）。
<p></p>

<span id="feature04">&nbsp;</span>
<h3>今月のランキング変動とその支持層：性年代別Top3</h3>

<p>
</p><h4>【女性10-20代】アニメ・マンガ・本作品が急上昇を牽引</h4>
1位（+8万人）：<b>「呪術廻戦」</b>（アニメ・漫画・本）
<br>2位（+7万人）：<b>「転生したらスライムだった件」</b>（ドラマ・映画・配信）
<br>3位（+4万人）：<b>「じゃあ、あんたが作ってみろよ」</b>（ドラマ・映画・配信）
<br><br>比率ベースでは<b>「じゃあ、あんたが作ってみろよ」</b>が1位（+706%）。
<p></p>

<p>
</p><h4>【男性10-20代】アニメ・マンガ・本作品が急上昇を牽引</h4>
1位（+3万人）：<b>「呪術廻戦」</b>（アニメ・マンガ・本）
<br>2位（+3万人）：<b>「僕のヒーローアカデミア」</b>（アニメ・マンガ・本）
<br>3位（+万人）：<b>「遊戯王シリーズ」</b>（ゲーム）
<br><br>比率ベースでは<b>「ちょっとだけエスパー」</b>が1位（+1263%）。
<p></p>

<p>
</p><h4>【女性30-40代】ドラマ・映画・配信作品が急上昇を牽引</h4>
1位（+6万人）：<b>「良いこと悪いこと」</b>ドラマ・映画・配信
<br>2位（+5万人）：<b>「じゃあ、あんたが作ってみろよ」</b>ドラマ・映画・配信
<br>3位（+5万人）：<b>「ちょっとだけエスパー」</b>ドラマ・映画・配信
<br><br>比率ベースでは<b>「じゃあ、あんたが作ってみろよ」</b>が1位（+1000%）。
<p></p>

<p>
</p><h4>【男性30-40代】スポーツその他作品が急上昇を牽引</h4>
1位（+3万人）：<b>「競馬」</b>スポーツその他
<br>2位（+3万人）：<b>「アイドルマスター」</b>アニメ・マンガ・本
<br>3位（+2万人）：<b>「カードファイト!! ヴァンガード」</b>ゲーム
<br><br>比率ベースでは<b>「競馬」</b>が1位（+262%）。
<p></p>

<p>
</p><h4>【女性50-60代】ドラマ・映画・配信作品が急上昇を牽引</h4>
1位（+12万人）：<b>「じゃあ、あんたが作ってみろよ」</b>（ドラマ・映画・配信）
<br>2位（+8万人）：<b>「ザ・ロイヤルファミリー」</b>（ドラマ・映画・配信）
<br>3位（+5万人）：<b>「呪術廻戦」</b>（アニメ・マンガ・本）
<br><br>比率ベースでは<b>「じゃあ、あんたが作ってみろよ」</b>が1位（+1258%）。
<p></p>

<span id="feature05">&nbsp;</span>
<h2>まとめ</h2>

<p>
今月のエンタメ市場は、ドラマ・映画・配信作品の急激な台頭が最大の特徴となった。特に<b>「じゃあ、あんたが作ってみろよ」「良いこと悪いこと」「ザ・ロイヤルファミリー」</b>といった作品が、女性50-60代を中心とした幅広い女性層から圧倒的な支持を獲得している。これは従来のアニメ・マンガ中心の急上昇トレンドとは大きく異なる動向である。
<br><br>
一方で、アニメ・マンガ分野では<b>「呪術廻戦」</b>が女性10-20代を中心に大幅な人数増を記録し、依然として若年層における強固な人気基盤を維持している。また、タレント・音楽分野では<b>「M!LK」</b>が女性10-20代から高い支持を集めるなど、若年女性層の嗜好の多様化も見て取れる。
<br><br>
比率ベースでの急上昇では<b>「ちょっとだけエスパー」</b>が1263%という驚異的な伸び率を記録し、新規コンテンツの爆発的な成長可能性を示している。今月の動向は、中高年女性層がエンタメ消費の新たな牽引役として台頭していることを明確に示しており、今後のコンテンツ戦略において重要な示唆を提供している。
</p>

<div class="Disclaimer_bottom">
<h4>※注意事項</h4>
本機能は生成AIによって生成しているため、性質上、誤りを含む可能性があります。当社は正確性・最新性等を保証しません。「トレンド：ランキング」のデータを併せてご覧いただき、データの確認をお願いいたします。
<br>本機能は契約者のみに提供しておりますので、要約の社外への転載・複製・再配信等はお控えください。
<br>利用にあたっては関連法令およびサービスの規約が適用されます。本機能は、Amazon Web Services, Inc.（AWS）「Amazon Bedrock」を通じ、Anthropic社のClaudeを活用しています。
<br>本機能は試験提供であり、予告なく変更・停止する場合があります。


<h4>※数値の考え方</h4>
・（）内のジャンル名は、代表メディア大分類を記載しています。
<br>・（⚪︎万人増）は、前月から最新月の、エンタメブランド全体での推しファン人数の増分を示します。
<br>・（⚪︎%）は、最新月データと過去１年間の平均値との比較を示します。
<br>・比率ランキングの算出については、以下の考え方を適用しています。
</div>
</div>
`,
    hit_overview:
      "<p>推しヒットの主要指標を示します。</p>",
    hit_highlight:
      "<p>急上昇トピックを抽出しました。</p>",
    market_overview:
      "<p>市場全体の変化傾向をまとめます。</p>",
    market_highlight:
      "<p>直近の市場動向のポイントを提示します。</p>",
    kobetsu_overview: `
      <h3>全体トレンド</h3>
      <p>推しファン人数、支出金額がダウントレンドor横ばいorアップトレンド</p>
      <br>
      <h3>エンタメブランドの市場規模とポテンシャル</h3>
      <h4>推しファン人数の多さが特徴。支出単価拡張ポテンシャルあり</h4>
        <li>支出金額計は46億円。推しファン人数が月100万人、平均月当り一人当り支出金額は約4500円。</li>
        <li>全体ランキングでは推しファン人数が2位、平均月当り一人当り支出金額が20位、支出金額計は1位で、推しファン人数の多さが特徴的。（代表メディア大分類内）</li>
        <li>平均月当たり一人当り最大許容支出金額は約7300円と、現在の実際の支出金額と比べて約3000円の開きがあり、市場規模はより拡張できるポテンシャルがあると考えられる。</li>
      <br>
      <h3>推しファンの属性</h3>
      <h4>女性若年中心、都市型のファン層</h4>
        <li>推しファンの平均年齢は約40歳。女性が95%と大半を占め、30代・40代を中心に女性20代以上の幅広い年代に支持が広いのが特徴。（同ジャンル平均値：）。</li>
        <li>居住地域は南関東が31％と控えめで、全国型。（同ジャンル平均値：）。</li>
      <br>
      <h3>推しファンの消費動向</h3>
      <h4>ファン歴は長め、バラエティがフック。支出0のライト層と高支出コア層を双方抑える</h4>
        <li>平均ファン歴は3.4年と長め（同ジャンル平均値：）。</li>
        <li>支出金額は0円層が50％と半数近くを占める一方、1〜3万円層・5千円〜1万円層とそれぞれ約10％を占めるなど、ライト層を抱えながらも高支出層割合も高いことが特徴。（同ジャンル平均値：）</li>
      <p>好きなメディアは「タレント」「音楽」「バラエティ番組」がTop3で、音楽に加えて、バラエティタレントとしての要素も高く評価されている。エンタメ要素でも「それSnowManにやらせてください」が圧倒的に高い。</p>
      <p>他に好きなエンタメブランドとしては、SixTONES、</p>
    `,
    kobetsu_highlight:
      "<p>最新レポートでの重要ポイントを示します。</p>",
    compare_overview:
      "<p>各ブランドを比較した特徴をまとめます。</p>",
    compare_highlight:
      "<p>最も注目すべき差分をピックアップします。</p>",
    highlight:
      "<p>最新調査回の注目点をまとめます。</p>"
  };

const aiButtonSchemes = {
  "トレンド：ランキング": [
    { summary: "trend_highlight", label: "最新調査回のハイライト" }
  ],
  "トレンド：推しヒット分析": [
    { summary: "hit_overview", label: "推しヒット概要" },
    { summary: "hit_highlight", label: "注目トレンド" }
  ],
  "トレンド：市場変化": [
    { summary: "market_overview", label: "市場変化概要" },
    { summary: "market_highlight", label: "市場変化ハイライト" }
  ],
  "深堀りする：個別分析": [
    { summary: "kobetsu_overview", label: "概要サマリ" },
    { summary: "kobetsu_highlight", label: "最新調査回のハイライト" }
  ],
  "深堀りする：比較分析": [
    { summary: "compare_overview", label: "比較概要" },
    { summary: "compare_highlight", label: "比較ハイライト" }
  ],
  デフォルト: [
    { summary: "overview", label: "概要サマリ" },
    { summary: "highlight", label: "最新調査回のハイライト" }
  ]
};

  const updateDataCoverageVisibility = () => {
    if (!dataCoverageRow) {
      return;
    }
    const brandRowVisible = aiSelectedBrandRow && aiSelectedBrandRow.style.display !== "none";
    const shouldShow = brandRowVisible && activeSummaryKey.includes("overview");
    dataCoverageRow.style.display = shouldShow ? "flex" : "none";
  };

  const renderSummaryText = () => {
    if (!isSummaryReady) {
      summaryOutput.textContent = waitingText;
      return;
    }
    if (activeSummaryKey === "kobetsu_overview" && !aiCurrentSelectedBrand) {
      summaryOutput.textContent = "エンタメブランドを選択してください。";
      return;
    }
    summaryOutput.innerHTML = summaryMap[activeSummaryKey] ?? summaryMap.overview;
    updateDataCoverageVisibility();
  };

  const renderActionButtonsForTab = (tabName) => {
    const normalizedTabName = tabName.replace(/掘|堀/g, "掘").trim();
    const buttons =
      aiButtonSchemes[tabName] ||
      aiButtonSchemes[normalizedTabName] ||
      aiButtonSchemes["デフォルト"];
    summaryActions.innerHTML = buttons
      .map(
        (btn, idx) =>
          `<button type="button" class="${idx === 0 ? "is-active" : ""}" data-summary="${btn.summary}">${btn.label}</button>`
      )
      .join("");

    activeSummaryKey = buttons[0]?.summary ?? activeSummaryKey;
    if (!isSummaryReady) {
      isSummaryReady = true;
    }
    renderSummaryText();
    updateDataCoverageVisibility();

    const renderedButtons = summaryActions.querySelectorAll("button");
    renderedButtons.forEach((button) => {
        button.addEventListener("click", () => {
          renderedButtons.forEach((b) => b.classList.remove("is-active"));
          button.classList.add("is-active");
          activeSummaryKey = button.dataset.summary ?? "overview";
          renderSummaryText();
          updateDataCoverageVisibility();
        });
      });
  };

  document.addEventListener("ai-tab-changed", (event) => {
    const tabName = event.detail?.tabName ?? "デフォルト";
    renderActionButtonsForTab(tabName);
  });

  document.addEventListener("ai-summary-ready", () => {
    isSummaryReady = true;
    if (panelLoading) {
      panelLoading.classList.add("is-hidden");
    }
    renderSummaryText();
  });

  const updateSelectedBrandVisibility = (tabName) => {
    const show = tabName.includes("個別分析") || tabName.includes("比較分析");
    if (aiSelectedBrandRow) {
      aiSelectedBrandRow.style.display = show ? "flex" : "none";
    }
    updateDataCoverageVisibility();
  };

  document.addEventListener("ai-tab-changed", (event) => {
    const tabName = event.detail?.tabName ?? "デフォルト";
    if (tabName.includes("ランキング")) {
      activeSummaryKey = "trend_highlight";
      renderSummaryText();
    }
    updateSelectedBrandVisibility(tabName);
    updateDataCoverageVisibility();
  });

  document.addEventListener("ai-brand-changed", () => {
    renderSummaryText();
    updateDataCoverageVisibility();
  });

  document.addEventListener("deep-dive-tab-entered", () => {
    document.dispatchEvent(new CustomEvent("reset-brand-selection"));
  });

  document.addEventListener("ai-summary-loading", () => {
    if (panelLoading) {
      panelLoading.classList.remove("is-hidden");
    }
  });

  renderActionButtonsForTab("トレンド：ランキング");
}

function setTabBodyVisibilityById(targetId = "") {
  const tabs = ["tabBodyTrendRanking", "tabBodyOshiHitAnalysis", "tabBodyMarketChange", "tabBodyFukabori","tabBodyHakken","tabBodySagasu","baseDetailView"];
  tabs.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add("is-hidden");
    }
  });

  const target = targetId || tabConfigMap.default.targetId;
  document.getElementById(target)?.classList.remove("is-hidden");
}

function updateDashboardForTab(tabKey = "default") {
  const dashboardTitle = document.getElementById("dashboardTitle");
  const dashboardSubtitle = document.getElementById("dashboardSubtitle");
  const aiPanelTitle = document.getElementById("aiPanelTitle");

  const config = tabConfigMap[tabKey] ?? tabConfigMap.default;
  currentDashboardTitle = config.title;
  currentTabKey = tabKey;
  if (dashboardTitle) {
    dashboardTitle.textContent = config.title;
  }
  if (dashboardSubtitle) {
    dashboardSubtitle.textContent = config.subtitle;
  }
  if (aiPanelTitle) {
    aiPanelTitle.textContent = config.aiTitle;
  }
  setTabBodyVisibilityById(config.targetId);
}

function initTopTabAiControl() {
  const baseTopTabs = document.querySelectorAll(".base-top-tabs button");
  if (baseTopTabs.length === 0) {
    return;
  }

  baseTopTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      baseTopTabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      const tabName = tab.textContent.trim();
      const tabKey = tab.dataset.tabKey ?? "default";
      updateDashboardForTab(tabKey);
      document.dispatchEvent(new CustomEvent("ai-tab-changed", { detail: { tabName } }));
      if (tabKey === "deepDiveIndividual" || tabKey === "deepDiveComparison") {
        document.dispatchEvent(new CustomEvent("deep-dive-tab-entered"));
      }
    });
  });
  const activeTab = Array.from(baseTopTabs).find((t) => t.classList.contains("is-active"));
  const initialTabName = activeTab ? activeTab.textContent.trim() : "トレンド：ランキング";
  const initialTabKey = activeTab?.dataset.tabKey ?? "trendRanking";
  updateDashboardForTab(initialTabKey);
  document.dispatchEvent(new CustomEvent("ai-tab-changed", { detail: { tabName: initialTabName } }));
  if (initialTabKey === "deepDiveIndividual" || initialTabKey === "deepDiveComparison") {
    document.dispatchEvent(new CustomEvent("deep-dive-tab-entered"));
  }
}

function initMainDashboardFlow() {
  const tableRows = document.querySelectorAll(".base-brand-table tbody tr");
  const selectedBrandValue = document.getElementById("selectedBrandValue");
  const reportExportBtn = document.getElementById("reportExportBtn");
  const dashboardView = document.getElementById("baseDashboardView");
  const detailView = document.getElementById("baseDetailView");
  const loadingOverlay = document.getElementById("baseLoadingOverlay");
  const aiFab = document.getElementById("aiFab");
  const aiFabLabel = document.getElementById("aiFabLabel");
  const aiFabSpinner = document.getElementById("aiFabSpinner");

  if (
    tableRows.length === 0 ||
    !selectedBrandValue ||
    !reportExportBtn ||
    !dashboardView ||
    !detailView ||
    !loadingOverlay
  ) {
    return;
  }

  let selectedBrandName = "";
  let isProcessing = false;

  const setSelectedBrand = (name) => {
    selectedBrandName = name;
    aiCurrentSelectedBrand = name;
    document.dispatchEvent(new CustomEvent("ai-brand-changed", { detail: { name } }));
    selectedBrandValue.innerHTML = "";
    const aiSelectedBrand = document.getElementById("aiSelectedBrand");

    if (!name) {
      selectedBrandValue.textContent = "作品を選択してください。";
      if (aiSelectedBrand) {
        aiSelectedBrand.textContent = "未選択";
      }
      return;
    }

    const pill = document.createElement("span");
    pill.className = "base-selected-pill";
    pill.textContent = name;
    selectedBrandValue.appendChild(pill);

    if (aiSelectedBrand) {
      aiSelectedBrand.textContent = name;
    }
  };

  tableRows.forEach((row) => {
    row.addEventListener("click", () => {
      if (isProcessing) {
        return;
      }
      tableRows.forEach((target) => target.classList.remove("is-selected"));
      row.classList.add("is-selected");
      const name = row.querySelector("td")?.textContent?.trim() ?? "";
      setSelectedBrand(name);
    });
  });

  document.addEventListener("reset-brand-selection", () => {
    tableRows.forEach((target) => target.classList.remove("is-selected"));
    setSelectedBrand("");
    dashboardView.classList.remove("is-hidden");
    detailView.classList.add("is-hidden");
  });

  reportExportBtn.addEventListener("click", () => {
    if (isProcessing) {
      return;
    }

    if (!selectedBrandName) {
      selectedBrandValue.textContent = "先にエンタメブランドを選択してください。";
      return;
    }

    isProcessing = true;
    reportExportBtn.disabled = true;
    reportExportBtn.textContent = "レポート出力中…";
    loadingOverlay.classList.remove("is-hidden");

    if (aiFab && aiFabLabel && aiFabSpinner) {
      aiFab.disabled = true;
      aiFab.classList.add("is-loading");
      aiFabLabel.textContent = "サマリ中…";
      aiFabSpinner.classList.remove("is-hidden");
    }
    document.dispatchEvent(new CustomEvent("ai-summary-loading"));

    window.setTimeout(() => {
      loadingOverlay.classList.add("is-hidden");
      dashboardView.classList.add("is-hidden");
      detailView.classList.remove("is-hidden");
    document.dispatchEvent(new CustomEvent("ai-summary-ready"));

    if (aiFab && aiFabLabel && aiFabSpinner) {
      aiFab.disabled = false;
      aiFab.classList.remove("is-loading");
        aiFabLabel.textContent = "AIサマリ生成完了";
        aiFabSpinner.classList.add("is-hidden");
      }
    }, 5000);
  });
}

function initPdfDemo() {
  const overlay = document.getElementById("pdfDemoOverlay");
  const backdrop = document.getElementById("pdfDemoBackdrop");
  const closeBtn = document.getElementById("pdfDemoClose");
  const tabField = document.getElementById("pdfDemoTab");
  const brandField = document.getElementById("pdfDemoBrand");
  const previewPage = document.getElementById("pdfDemoPreviewPage");
  const previewCaption = document.getElementById("pdfDemoPreviewCaption");
  const aiReportSection = document.getElementById("pdfDemoAiReportsSection");
  const aiReportList = document.getElementById("pdfDemoAiReports");
  const triggers = document.querySelectorAll("[data-pdf-trigger]");

  if (!overlay || !backdrop || !closeBtn || triggers.length === 0) {
    return;
  }

  const applyContent = () => {
    const isAiMode = currentPdfMode === "ai";
    const aiPanelTitle = document.getElementById("aiPanelTitle");
    const aiBrandLabel = document.getElementById("aiSelectedBrand");

    if (tabField) {
      tabField.textContent = isAiMode
        ? aiPanelTitle?.textContent ?? "AIサマリ"
        : currentDashboardTitle;
    }
    if (brandField) {
      brandField.textContent = isAiMode
        ? aiBrandLabel?.textContent ?? "未選択"
        : aiCurrentSelectedBrand || "未選択";
    }
    if (aiReportSection && aiReportList) {
      if (isAiMode) {
        aiReportSection.style.display = "block";
        const activeButton =
          document.querySelector("#aiSummaryActions button.is-active") ??
          document.querySelector("#aiSummaryActions button");
        aiReportList.innerHTML = activeButton
          ? `<ul><li>${activeButton.textContent}</li></ul>`
          : "<p>AIサマリは最新トピックに応じて構成されます。</p>";
      } else {
        aiReportSection.style.display = "none";
        aiReportList.innerHTML = "";
      }
    }

    if (previewPage) {
      let previewData;
      if (isAiMode) {
        previewData = aiPdfPreview;
      } else {
        const basePreview = mainPdfPreviewMap[currentTabKey] ?? mainPdfPreviewMap.default;
        previewData = { ...mainPdfPreviewMap.default, ...basePreview };
        if (previewData.preview === "deepdive" && !aiCurrentSelectedBrand) {
          previewData = mainPdfPreviewMap.default;
        }
      }
      previewPage.setAttribute("data-preview", previewData.preview);
      if (previewCaption) {
        previewCaption.textContent = previewData.caption;
      }
    }
  };

  const setOpen = (open) => {
    overlay.classList.toggle("is-open", open);
    overlay.setAttribute("aria-hidden", String(!open));
    if (open) {
      applyContent();
    }
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      currentPdfMode = trigger.dataset.pdfTrigger ?? "main";
      setOpen(true);
    });
  });
  closeBtn.addEventListener("click", () => setOpen(false));
  backdrop.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) {
      setOpen(false);
    }
  });
}

initTabs();
initAiDrawer();
initAiMockContent();
initTopTabAiControl();
initMainDashboardFlow();
renderChart("current");
initPdfDemo();
