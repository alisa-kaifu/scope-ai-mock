export const DEFAULT_TAB_KEY = "trendRanking";

export const tabConfigMap = {
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
		title: "深堀りする：比較分析",
		subtitle: "比較分析：ブランド比較の視点を表示します。",
		aiTitle: "AIサマリ「深堀りする：比較分析」"
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
	}
};

export const mainPdfPreviewMap = {
	trendRanking: { preview: "ranking", caption: "「トレンド：ランキング」PDF" },
	trendHit: { preview: "hit", caption: "「トレンド：推しヒット分析」PDF" },
	marketChange: { preview: "market", caption: "「トレンド：市場変化」PDF" },
	deepDiveIndividual: { preview: "deepdive", caption: "「深堀りする：個別分析」PDF" },
	deepDiveComparison: { preview: "deepdive", caption: "「深堀りする：比較分析」PDF" },
	discover: { preview: "discover", caption: "「発見する」PDF" },
	search: { preview: "search", caption: "「探す」PDF" }
};

export const aiPdfPreview = {
	preview: "ai",
	caption: "分析AIエージェント PDF（プレビュー）"
};

export const summaryMap = {
	overview:
		"<h3>全体トレンド</h3><p>推しファン人数、支出金額がダウントレンドor横ばいorアップトレンド</p>",
	trend_highlight:
		`
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>2026年2月の「推しエンタメブランド トレンド」</title>
  <style>
    :root {
      --bg: #f3f3f3;
      --card: #ffffff;
      --text: #2f2f2f;
      --muted: #666666;
      --line: #e58a2c;
      --soft: #efefef;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.9;
    }

    .page {
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
      padding: clamp(16px, 4vw, 32px);
    }

    h1 {
      margin: 0 0 18px;
      font-size: 36px;
      line-height: 1.25;
      font-weight: 800;
      letter-spacing: 0.01em;
    }

    .lead {
      font-size: 18px;
      font-weight: 700;
      line-height: 1.6;
      margin: 0 0 26px;
    }

    .notice {
      border-top: 2px solid var(--line);
      border-bottom: 2px solid var(--line);
      padding: 18px 16px;
      margin: 22px 0 54px;
      font-size: 10px;
      color: #555;
      background: rgba(255,255,255,0.25);
    }

    .section-title {
      background: #ececec;
      border-left: 4px solid var(--line);
      padding: 18px 22px;
      font-size: 28px;
      font-weight: 800;
      margin: 0 0 28px;
    }

    .sub-title {
      background: #ececec;
      border-left: 4px solid var(--line);
      padding: 18px 22px;
      font-size: 26px;
      font-weight: 800;
      margin: 56px 0 26px;
    }

    .block {
      margin-bottom: 34px;
      font-size: 19px;
    }

    .block p {
      margin: 0 0 16px;
    }

    .summary-lead {
      font-size: 20px;
      font-weight: 800;
      margin: 0 0 22px;
    }

    .rank-list {
      margin: 0 0 22px;
      padding-left: 0;
      list-style: none;
    }

    .rank-list li {
      margin: 0 0 8px;
      font-size: 18px;
    }

    .category {
      margin: 34px 0;
    }

    .category h3 {
      font-size: 22px;
      margin: 0 0 10px;
      font-weight: 800;
    }

    .note-box {
      margin-top: 48px;
      padding-top: 24px;
      border-top: 1px solid #d8d8d8;
      font-size: 15px;
      color: #4e4e4e;
    }

    .note-box h4 {
      font-size: 18px;
      margin: 0 0 10px;
    }

    strong { font-weight: 800; }

    @media (max-width: 900px) {
      .page {
        padding: 22px 20px 48px;
      }
      h1 {
        font-size: 34px;
      }
      .lead {
        font-size: 18px;
      }
      .section-title,
      .sub-title {
        font-size: 22px;
      }
      .block,
      .rank-list li {
        font-size: 16px;
      }
    }
  </style>
</head>
<body>
  <main class="page">
    <h1>2026年2月の「推しエンタメブランド トレンド」</h1>
    <p class="lead">「トレンド：ランキング」の推しファン人数ランキングの動向を、生成AIを用いてサマライズしました。<br>2026年2月14日調査分データを基にしています。数値の定義などは本ページ下部の注記を参照ください。</p>

    <div class="notice">
      本機能は、生成AIが出力しています。その性質上、データの言及内容には間違いがある可能性があります。引用元の「トレンド：ランキング」データと併せてご覧ください。当社は出力の正確性や品質を保証しません。詳しくは、本ページ下部の注意事項をお読みください。
    </div>

    <section class="block">
      <div class="section-title">ハイライト</div>
      <p>推しファン人数ランキングTop20に新たなランクインしたエンタメブランドは、<strong>「リブート (テレビドラマ)」</strong>（ドラマ・映画・配信／圏外→20位）でした。</p>
      <p>逆にランクダウンしたエンタメブランドは、<strong>「Netflix」</strong>（ドラマ・映画・配信／13位→圏外）、<strong>「SPY×FAMILY」</strong>（アニメ・マンガ・本／19位→圏外）、<strong>「ばけばけ」</strong>（ドラマ・映画・配信／20位→圏外）でした。</p>
      <p>急上昇ランキングはドラマ作品が上位を占め、特に <strong>「リブート (テレビドラマ)」</strong> が大幅な増加を見せました。人数ベースの急上昇1位は <strong>「リブート (テレビドラマ)」</strong>（ドラマ・映画・配信）、比率ベースの急上昇1位も <strong>「リブート (テレビドラマ)」</strong>（ドラマ・映画・配信）でした。</p>
    </section>

    <section class="block">
      <div class="sub-title">ランキング変動とその支持層：急上昇ランキングTop5</div>
      <p class="summary-lead">【総合】ドラマ作品が急上昇ランキングを席巻し、女性層の高い支持が変動を牽引</p>
      <ul class="rank-list">
        <li>1位： <strong>「リブート (テレビドラマ)」</strong>（ドラマ・映画・配信）+37万人増。女性30-40代で1位、女性50-60代で1位の高い支持。</li>
        <li>2位： <strong>「教場」</strong>（ドラマ・映画・配信）+20万人増。女性50-60代で2位の高い支持。</li>
        <li>3位： <strong>「オリンピック」</strong>（スポーツその他）+16万人増。女性50-60代で3位、男性50-60代で2位の高い支持。</li>
        <li>4位： <strong>「葬送のフリーレン」</strong>（アニメ・マンガ・本）+13万人増。男性50-60代で1位の高い支持。</li>
        <li>5位： <strong>「【推しの子】」</strong>（アニメ・マンガ・本）+13万人増。女性50-60代で5位、男性30-40代で2位の高い支持。</li>
      </ul>
      <p>比率ベースでは、1位 <strong>「リブート (テレビドラマ)」</strong>（ドラマ・映画・配信）+3597%、2位 <strong>「オリンピック」</strong>（スポーツその他）+1514%、3位 <strong>「教場」</strong>（ドラマ・映画・配信）+1511%。</p>
    </section>

    <section class="block">
      <div class="sub-title">ランキング変動とその支持層：代表メディア大分類別Top3</div>

      <div class="category">
        <h3>【アニメ・マンガ・本】男性10-20代の支持が変動を牽引</h3>
        <p>1位：「葬送のフリーレン」＋13万人増。男性50-60代で1位の高い支持。<br>
        2位：「【推しの子】」＋13万人増。女性50-60代で1位の高い支持。<br>
        3位：「メダリスト」＋10万人増。女性10-20代で3位の高い支持。</p>
        <p>比率ベースでは「超かぐや姫!」が1位（+685%）。</p>
      </div>

      <div class="category">
        <h3>【キャラクター・テーマパーク】女性30-40代の支持が変動を牽引</h3>
        <p>1位：「mofusand(モフサンド)」＋7万人増。女性30-40代で1位の高い支持。<br>
        2位：「リラックマ」＋3万人増。男性50-60代で1位の高い支持。<br>
        3位：「リロ・アンド・スティッチ」＋2万人増。女性30-40代で2位の高い支持。</p>
        <p>比率ベースでは「パペットスンスン」が1位（+229%）。</p>
      </div>

      <div class="category">
        <h3>【ゲーム】男性30-40代の支持が変動を牽引</h3>
        <p>1位：「ドラゴンクエスト」＋9万人増。男性30-40代で1位の高い支持。<br>
        2位：「原神」＋6万人増。女性30-40代で2位の高い支持。<br>
        3位：「アークナイツ」＋5万人増。男性10-20代で2位の高い支持。</p>
        <p>比率ベースでは「トリッカル・もちもちほっぺ大作戦」が1位（+258%）。</p>
      </div>

      <div class="category">
        <h3>【スポーツその他】女性50-60代の支持が変動を牽引</h3>
        <p>1位：「オリンピック」＋16万人増。女性50-60代で1位の高い支持。<br>
        2位：「メジャーリーグベースボール(MLB)」＋4万人増。男性50-60代で2位の高い支持。<br>
        3位：「羽生結弦」＋3万人増。女性50-60代で2位の高い支持。</p>
        <p>比率ベースでは「オリンピック」が1位（+1514%）。</p>
      </div>

      <div class="category">
        <h3>【タレント・音楽・ネット動画など】女性10-20代の支持が変動を牽引</h3>
        <p>1位：「櫻坂46」＋7万人増。女性の幅広い年代で高い支持。<br>
        2位：「M!LK」＋7万人増。女性10-20代で1位の高い支持。<br>
        3位：「back number」＋6万人増。男性10-20代で3位の高い支持。</p>
        <p>比率ベースでは「M!LK」が1位（+475%）。</p>
      </div>
    </section>

    <section class="block">
      <div class="sub-title">ランキング変動とその支持層：性年代別Top3</div>

      <div class="category">
        <h3>【女性10-20代】タレント・音楽・ネット動画などが急上昇を牽引</h3>
        <p>1位：「M!LK」+4万人増<br>2位：「リブート (テレビドラマ)」+3万人増<br>3位：「SixTONES」+3万人増</p>
        <p>比率ベースでは「リブート (テレビドラマ)」が1位（+431%）。</p>
      </div>

      <div class="category">
        <h3>【女性30-40代】幅広いメディアがランクイン</h3>
        <p>1位：「リブート (テレビドラマ)」+12万人増<br>2位：「ポケットモンスター(ポケモン)」+5万人増<br>3位：「mofusand(モフサンド)」+4万人増</p>
        <p>比率ベースでは「リブート (テレビドラマ)」が1位（+1314%）。</p>
      </div>

      <div class="category">
        <h3>【女性50-60代】ドラマ・映画・配信が急上昇を牽引</h3>
        <p>1位：「リブート (テレビドラマ)」+9万人増<br>2位：「教場」+5万人増<br>3位：「オリンピック」+5万人増</p>
        <p>比率ベースでは「リブート (テレビドラマ)」が1位（+1004%）。</p>
      </div>

      <div class="category">
        <h3>【男性10-20代】アニメ・マンガ・本が急上昇を牽引</h3>
        <p>1位：「呪術廻戦」+11万人増<br>2位：「ドラゴンボール」+7万人増<br>3位：「YouTube」+6万人増</p>
        <p>比率ベースでは「教場」が1位（+592%）。</p>
      </div>

      <div class="category">
        <h3>【男性30-40代】幅広いメディアがランクイン</h3>
        <p>1位：「リブート (テレビドラマ)」+6万人増<br>2位：「【推しの子】」+5万人増<br>3位：「ドラゴンクエスト」+4万人増</p>
        <p>比率ベースでは「リブート (テレビドラマ)」が1位（+685%）。</p>
      </div>

      <div class="category">
        <h3>【男性50-60代】アニメ・マンガ・本が急上昇を牽引</h3>
        <p>1位：「葬送のフリーレン」+11万人増<br>2位：「オリンピック」+5万人増<br>3位：「リブート (テレビドラマ)」+4万人増</p>
        <p>比率ベースでは「豊臣兄弟!」が1位（+615%）。</p>
      </div>
    </section>

    <section class="block">
      <div class="sub-title">まとめ</div>
      <p>2026年2月のエンタメ市場は、スポーツイベントとドラマコンテンツが牽引する急激な変化を見せている。特に <strong>「オリンピック」</strong>（スポーツその他）が接触日数で306万日の大幅増加を記録し、過去12回平均の4倍超という圧倒的な伸びを示したことは、国際的なスポーツイベントの強力な集客力を物語っている。</p>
      <p>ドラマ・映画・配信分野では <strong>「リブート (テレビドラマ)」</strong> と <strong>「教場」</strong> が推しファン人数で大幅な増加を見せ、特に前者は過去12回平均の36倍という異例の急上昇を記録した。これらの作品が短期間で強固なファンベースを構築していることが確認できる。</p>
      <p>一方で、タレント・音楽分野では <strong>「嵐」</strong> が支出金額で15,545万円の増加を記録し、エンタメブランド価値でも1,674GEMの大幅上昇を見せている。<strong>「SixTONES」</strong> も同様に高い成長を示しており、アイドルグループの経済的影響力の大きさが改めて浮き彫りになった。</p>
      <p>ゲーム分野では <strong>「ドラゴンクエスト」</strong> が複数指標で上位にランクインし、長寿IPの継続的な訴求力を証明している。アニメ・マンガ分野でも <strong>「呪術廻戦」</strong> や <strong>「NARUTO」</strong> など定番作品が安定した成長を維持しており、コンテンツの多様化と同時に、確立されたIPの底堅い人気が市場を支えている構造が見て取れる。</p>
    </section>

    <section class="note-box">
      <h4>※注意事項</h4>
      <p>本機能は、生成AIが出力しています。その性質上、データの言及内容には間違いがある可能性があります。引用元の「トレンド：ランキング」データと併せてご覧いただき、データの確認をお願いいたします。当社は出力の正確性や品質を保証せず、本機能を閲覧・利用することで利用者に生じた損害について当社は一切責任を負いません。</p>
      <p>本機能は契約者のみに提供しておりますので、社外への転載・複製・再配信などはお控えください。</p>
      <p>本機能は予告なく変更・停止する場合があります。</p>

      <h4>※数値の考え方</h4>
      <p>・（）内のジャンル名は、代表メディア大分類を記載しています。<br>
      ・（⚪︎万人増）は、前月から最新月の、エンタメブランド全体での推しファン人数の増分を示します。<br>
      ・（⚪︎%）は、最新月データと過去1年間の平均値との比較を示します。<br>
      ・比率ランキングの算出については、以下の考え方を適用しています。</p>
    </section>
  </main>
</body>
</html>

</div>`,
	hit_overview: "<p>推しヒットの主要指標を示します。</p>",
	hit_highlight: "<p>急上昇トピックを抽出しました。</p>",
	market_overview: "<p>市場全体の変化傾向をまとめます。</p>",
	market_highlight: "<p>直近の市場動向のポイントを提示します。</p>",
	kobetsu_overview: `
		<h3>全体トレンド</h3>
		<p>推しファン人数、支出金額がダウントレンドor横ばいorアップトレンド</p>
		<br>
		<h3>エンタメブランドの市場規模とポテンシャル</h3>
		<h4>推しファン人数の多さが特徴。支出単価拡張ポテンシャルあり</h4>
		<li>支出金額計は46億円。推しファン人数が月100万人、平均月当り一人当り支出金額は約4500円。</li>
		<li>全体ランキングでは推しファン人数が2位、平均月当り一人当り支出金額が20位、支出金額計は1位で、推しファン人数の多さが特徴的。</li>
		<li>平均月当たり一人当り最大許容支出金額は約7300円と、現在の実際の支出金額と比べて約3000円の開きがあり、市場規模はより拡張できるポテンシャルがあると考えられる。</li>
		<br>
		<h3>推しファンの属性</h3>
		<h4>推しファン人数の多さが特徴。支出単価拡張ポテンシャルあり</h4>
		<br>推しファンの平均年齢は約40歳。
		<br>女性が95%と大半を占め、30代・40代を中心に女性20代以上の幅広い年代に支持が広いのが特徴。（同ジャンル平均値：）。
		<br>居住地域は南関東が31％と控えめで、全国型。（同ジャンル平均値：）。
		<br>
		<h3>推しファンの消費動向</h3>
		<h4>ファン歴は長め、バラエティがフック。支出0のライト層と高支出コア層を双方抑える</h4>
		<br>平均ファン歴は3.4年と長め（同ジャンル平均値：）。
		<br>支出金額は0円層が50％と半数近くを占める一方、1〜3万円層・5千円〜1万円層とそれぞれ約10％を占めるなど、ライト層を抱えながらも高支出層割合も高いことが特徴。（同ジャンル平均値：）
		<br>好きなメディアは「タレント」「音楽」「バラエティ番組」がTop3で、音楽に加えて、バラエティタレントとしての要素も高く評価されている。エンタメ要素でも「それSnowManにやらせてください」が圧倒的に高い。

	`,
	kobetsu_highlight: "<p>最新レポートでの重要ポイントを示します。</p>",
	compare_overview: "<p>各ブランドを比較した特徴をまとめます。</p>",
	compare_highlight: "<p>最も注目すべき差分をピックアップします。</p>",
	highlight: "<p>最新調査回の注目点をまとめます。</p>"
};

export const aiButtonSchemes = {
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
	"深掘りする：個別分析": [
		{ summary: "kobetsu_overview", label: "概要サマリ" },
		{ summary: "kobetsu_highlight", label: "最新調査回のハイライト" }
	],
	"深堀りする：比較分析": [
		{ summary: "compare_overview", label: "比較概要" },
		{ summary: "compare_highlight", label: "比較ハイライト" }
	],
	"深掘りする：比較分析": [
		{ summary: "compare_overview", label: "比較概要" },
		{ summary: "compare_highlight", label: "比較ハイライト" }
	],
	"発見する": [
		{ summary: "overview", label: "概要サマリ" },
		{ summary: "highlight", label: "最新調査回のハイライト" }
	],
	"探す": [
		{ summary: "overview", label: "概要サマリ" },
		{ summary: "highlight", label: "最新調査回のハイライト" }
	],
	デフォルト: [
		{ summary: "overview", label: "概要サマリ" },
		{ summary: "highlight", label: "最新調査回のハイライト" }
	]
};
