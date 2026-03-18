import { appState } from "./state.js";
import { aiPdfPreview, mainPdfPreviewMap } from "./config.js";

export function initPdfDemo() {
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
		const isAiMode = appState.currentPdfMode === "ai";
		const aiPanelTitle = document.getElementById("aiPanelTitle");
		const aiBrandLabel = document.getElementById("aiSelectedBrand");

		if (tabField) {
			tabField.textContent = isAiMode
				? aiPanelTitle?.textContent ?? "AIサマリ"
				: appState.currentDashboardTitle;
		}

		if (brandField) {
			brandField.textContent = isAiMode
				? aiBrandLabel?.textContent ?? "未選択"
				: appState.aiCurrentSelectedBrand || "未選択";
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
				const basePreview = mainPdfPreviewMap[appState.currentTabKey] ?? mainPdfPreviewMap.trendRanking;
				previewData = { ...mainPdfPreviewMap.trendRanking, ...basePreview };

				if (previewData.preview === "deepdive" && !appState.aiCurrentSelectedBrand) {
					previewData = mainPdfPreviewMap.trendRanking;
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
			appState.currentPdfMode = trigger.dataset.pdfTrigger ?? "main";
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