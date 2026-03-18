import { appState } from "./state.js";
import { aiButtonSchemes, summaryMap } from "./config.js";

export function initAiMockContent() {
	const summaryActions = document.getElementById("aiSummaryActions");
	const summaryOutput = document.getElementById("aiSummaryOutput");
	const panelLoading = document.getElementById("aiPanelLoading");
	const aiSelectedBrandRow = document.getElementById("aiSelectedBrandRow");
	const dataCoverageRow = document.getElementById("aiDataCoverageRow");

	if (!summaryActions || !summaryOutput) {
		return;
	}

	let isSummaryReady = true;
	const waitingText = "エンタメブランドを選択し、レポート出力ボタンを押すとサマリが表示されます";

	const updateDataCoverageVisibility = () => {
		if (!dataCoverageRow) {
			return;
		}

		const brandRowVisible = aiSelectedBrandRow && aiSelectedBrandRow.style.display !== "none";
		const shouldShow = brandRowVisible && appState.activeSummaryKey.includes("overview");
		dataCoverageRow.style.display = shouldShow ? "flex" : "none";
	};

	const renderSummaryText = () => {
		if (!isSummaryReady) {
			summaryOutput.textContent = waitingText;
			return;
		}

		if (appState.activeSummaryKey === "kobetsu_overview" && !appState.aiCurrentSelectedBrand) {
			summaryOutput.textContent = "エンタメブランドを選択してください。";
			return;
		}

		summaryOutput.innerHTML = summaryMap[appState.activeSummaryKey] ?? summaryMap.overview;
		updateDataCoverageVisibility();
	};

	const renderActionButtonsForTab = (tabName) => {
		const normalizedTabName = tabName.replace(/掘|堀/g, "掘").trim();
		const buttons =
			aiButtonSchemes[tabName] ||
			aiButtonSchemes[normalizedTabName] ||
			aiButtonSchemes["デフォルト"];

		summaryActions.innerHTML = buttons
			.map((btn, idx) => {
				return `<button type="button" class="${idx === 0 ? "is-active" : ""}" data-summary="${btn.summary}">${btn.label}</button>`;
			})
			.join("");

		appState.activeSummaryKey = buttons[0]?.summary ?? appState.activeSummaryKey;

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
				appState.activeSummaryKey = button.dataset.summary ?? "overview";
				renderSummaryText();
				updateDataCoverageVisibility();
			});
		});
	};

	const updateSelectedBrandVisibility = (tabName) => {
		const show = tabName.includes("個別分析") || tabName.includes("比較分析");
		if (aiSelectedBrandRow) {
			aiSelectedBrandRow.style.display = show ? "flex" : "none";
		}
		updateDataCoverageVisibility();
	};

	document.addEventListener("ai-tab-changed", (event) => {
		const tabName = event.detail?.tabName ?? "デフォルト";
		renderActionButtonsForTab(tabName);

		if (tabName.includes("ランキング")) {
			appState.activeSummaryKey = "trend_highlight";
			renderSummaryText();
		}

		updateSelectedBrandVisibility(tabName);
		updateDataCoverageVisibility();
	});

	document.addEventListener("ai-summary-ready", () => {
		isSummaryReady = true;
		if (panelLoading) {
			panelLoading.classList.add("is-hidden");
		}
		renderSummaryText();
	});

	document.addEventListener("ai-brand-changed", () => {
		renderSummaryText();
		updateDataCoverageVisibility();
	});

	document.addEventListener("deep-dive-tab-entered", () => {
		document.dispatchEvent(new CustomEvent("reset-brand-selection"));
	});

	document.addEventListener("ai-summary-loading", () => {
		isSummaryReady = false;
		if (panelLoading) {
			panelLoading.classList.remove("is-hidden");
		}
		renderSummaryText();
	});

	renderActionButtonsForTab("深堀りする：個別分析");
	updateSelectedBrandVisibility("深堀りする：個別分析");
	renderSummaryText();
}