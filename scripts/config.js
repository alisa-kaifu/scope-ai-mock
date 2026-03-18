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
		<h4>推しファン人数の多さが特徴。支出単価拡張ポテンシャルあり</h4>
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