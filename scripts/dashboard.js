import { appState } from "./state.js";
import { DEFAULT_TAB_KEY, tabConfigMap } from "./config.js";

export function setTabBodyVisibilityById(targetId = "") {
	console.log("[dashboard] setTabBodyVisibilityById:start", { targetId });

	const tabs = [
		"tabBodyTrendRanking",
		"tabBodyOshiHitAnalysis",
		"tabBodyMarketChange",
		"tabBodyFukabori",
		"tabBodyHakken",
		"tabBodySagasu"
	];

	tabs.forEach((id) => {
		const el = document.getElementById(id);
		console.log("[dashboard] hiding tab body", {
			id,
			found: !!el
		});

		if (el) {
			el.classList.add("is-hidden");
		}
	});

	const detailView = document.getElementById("baseDetailView");
	console.log("[dashboard] detail view", {
		found: !!detailView
	});
	if (detailView) {
		detailView.classList.add("is-hidden");
	}

	const dashboardView = document.getElementById("baseDashboardView");
	console.log("[dashboard] dashboard view", {
		found: !!dashboardView
	});
	if (dashboardView) {
		dashboardView.classList.remove("is-hidden");
	}

	const fallbackConfig = tabConfigMap[DEFAULT_TAB_KEY];
	const target = targetId || fallbackConfig.targetId;
	const targetEl = document.getElementById(target);

	console.log("[dashboard] target tab body", {
		target,
		found: !!targetEl
	});

	targetEl?.classList.remove("is-hidden");

	console.log("[dashboard] setTabBodyVisibilityById:end", {
		target,
		targetHidden: targetEl ? targetEl.classList.contains("is-hidden") : "not-found"
	});
}

export function updateDashboardForTab(tabKey = DEFAULT_TAB_KEY) {
	console.log("[dashboard] updateDashboardForTab:start", { tabKey });

	const aiPanelTitle = document.getElementById("aiPanelTitle");
	const config = tabConfigMap[tabKey] ?? tabConfigMap[DEFAULT_TAB_KEY];

	console.log("[dashboard] resolved config", {
		tabKey,
		config
	});

	appState.currentDashboardTitle = config.title;
	appState.currentTabKey = tabKey;

	if (aiPanelTitle) {
		aiPanelTitle.textContent = config.aiTitle;
	}

	setTabBodyVisibilityById(config.targetId);

	console.log("[dashboard] updateDashboardForTab:end", {
		currentDashboardTitle: appState.currentDashboardTitle,
		currentTabKey: appState.currentTabKey
	});
}

export function initTopTabAiControl() {
	console.log("[dashboard] initTopTabAiControl:start");

	const baseTopTabs = document.querySelectorAll(".base-top-tabs button");

	console.log("[dashboard] baseTopTabs found", {
		count: baseTopTabs.length,
		tabs: Array.from(baseTopTabs).map((tab) => ({
			text: tab.textContent?.trim(),
			tabKey: tab.dataset.tabKey,
			tabTarget: tab.dataset.tabTarget,
			className: tab.className
		}))
	});

	if (baseTopTabs.length === 0) {
		console.warn("[dashboard] no .base-top-tabs buttons found");
		return;
	}

	baseTopTabs.forEach((tab, index) => {
		console.log("[dashboard] binding click listener", {
			index,
			text: tab.textContent?.trim(),
			tabKey: tab.dataset.tabKey
		});

		tab.addEventListener("click", () => {
			console.log("[dashboard] tab clicked", {
				text: tab.textContent?.trim(),
				tabKey: tab.dataset.tabKey,
				beforeClassName: tab.className
			});

			baseTopTabs.forEach((t) => t.classList.remove("is-active"));
			tab.classList.add("is-active");

			const tabName = tab.textContent.trim();
			const tabKey = tab.dataset.tabKey ?? DEFAULT_TAB_KEY;

			console.log("[dashboard] tab click resolved", {
				tabName,
				tabKey,
				existsInConfig: !!tabConfigMap[tabKey]
			});

			updateDashboardForTab(tabKey);

			document.dispatchEvent(
				new CustomEvent("ai-tab-changed", {
					detail: { tabName }
				})
			);

			if (tabKey === "deepDiveIndividual" || tabKey === "deepDiveComparison") {
				console.log("[dashboard] deep dive tab entered", { tabKey });
				document.dispatchEvent(new CustomEvent("deep-dive-tab-entered"));
			}

			console.log("[dashboard] tab click complete", {
				activeTabs: Array.from(baseTopTabs)
					.filter((t) => t.classList.contains("is-active"))
					.map((t) => t.textContent?.trim())
			});
		});
	});

	const activeTab = Array.from(baseTopTabs).find((t) => t.classList.contains("is-active"));
	const initialTabName = activeTab ? activeTab.textContent.trim() : "トレンド：ランキング";
	const initialTabKey = activeTab?.dataset.tabKey ?? DEFAULT_TAB_KEY;

	console.log("[dashboard] initial tab resolved", {
		initialTabName,
		initialTabKey,
		activeTabFound: !!activeTab
	});

	updateDashboardForTab(initialTabKey);

	document.dispatchEvent(
		new CustomEvent("ai-tab-changed", {
			detail: { tabName: initialTabName }
		})
	);

	if (initialTabKey === "deepDiveIndividual" || initialTabKey === "deepDiveComparison") {
		console.log("[dashboard] initial deep dive tab entered", { initialTabKey });
		document.dispatchEvent(new CustomEvent("deep-dive-tab-entered"));
	}

	console.log("[dashboard] initTopTabAiControl:end");
}

export function initMainDashboardFlow() {
	console.log("[dashboard] initMainDashboardFlow:start");

	const tableRows = document.querySelectorAll(".base-brand-table tbody tr");
	const selectedBrandValue = document.getElementById("selectedBrandValue");
	const reportExportBtn = document.getElementById("reportExportBtn");
	const dashboardView = document.getElementById("baseDashboardView");
	const detailView = document.getElementById("baseDetailView");
	const loadingOverlay = document.getElementById("baseLoadingOverlay");
	const aiFab = document.getElementById("aiAgentFab");
	const aiFabLabel = document.getElementById("aiAgentFabLabel");
	const aiFabSpinner = document.getElementById("aiAgentFabSpinner");

	console.log("[dashboard] initMainDashboardFlow:dom-check", {
		tableRows: tableRows.length,
		selectedBrandValue: !!selectedBrandValue,
		reportExportBtn: !!reportExportBtn,
		dashboardView: !!dashboardView,
		detailView: !!detailView,
		loadingOverlay: !!loadingOverlay,
		aiFab: !!aiFab,
		aiFabLabel: !!aiFabLabel,
		aiFabSpinner: !!aiFabSpinner
	});

	if (
		tableRows.length === 0 ||
		!selectedBrandValue ||
		!reportExportBtn ||
		!dashboardView ||
		!detailView ||
		!loadingOverlay
	) {
		console.warn("[dashboard] initMainDashboardFlow aborted because required DOM is missing");
		return;
	}

	let selectedBrandName = "";
	let isProcessing = false;

	const setSelectedBrand = (name) => {
		console.log("[dashboard] setSelectedBrand", { name });

		selectedBrandName = name;
		appState.aiCurrentSelectedBrand = name;

		document.dispatchEvent(
			new CustomEvent("ai-brand-changed", {
				detail: { name }
			})
		);

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

	tableRows.forEach((row, index) => {
		row.addEventListener("click", () => {
			console.log("[dashboard] table row clicked", {
				index,
				isProcessing
			});

			if (isProcessing) {
				return;
			}

			tableRows.forEach((target) => target.classList.remove("is-selected"));
			row.classList.add("is-selected");

			const name = row.querySelector("td")?.textContent?.trim() ?? "";
			console.log("[dashboard] extracted brand name", { name });

			setSelectedBrand(name);
		});
	});

	document.addEventListener("reset-brand-selection", () => {
		console.log("[dashboard] reset-brand-selection received");

		tableRows.forEach((target) => target.classList.remove("is-selected"));
		setSelectedBrand("");
		dashboardView.classList.remove("is-hidden");
		detailView.classList.add("is-hidden");
	});

	reportExportBtn.addEventListener("click", () => {
		console.log("[dashboard] reportExportBtn clicked", {
			isProcessing,
			selectedBrandName
		});

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
			console.log("[dashboard] report export timeout complete");

			loadingOverlay.classList.add("is-hidden");
			dashboardView.classList.add("is-hidden");
			detailView.classList.remove("is-hidden");

			document.dispatchEvent(new CustomEvent("ai-summary-ready"));

			if (aiFab && aiFabLabel && aiFabSpinner) {
				aiFab.disabled = false;
				aiFab.classList.remove("is-loading");
				aiFabLabel.textContent = "AI機能";
				aiFabSpinner.classList.add("is-hidden");
			}

			isProcessing = false;
			reportExportBtn.disabled = false;
			reportExportBtn.textContent = "レポート出力";
		}, 5000);
	});

	console.log("[dashboard] initMainDashboardFlow:end");
}