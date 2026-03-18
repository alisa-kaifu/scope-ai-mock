import { DEFAULT_TAB_KEY, tabConfigMap } from "./config.js";

export const appState = {
	currentDashboardTitle: tabConfigMap[DEFAULT_TAB_KEY].title,
	currentTabKey: DEFAULT_TAB_KEY,
	currentPdfMode: "main",
	aiCurrentSelectedBrand: "",
	activeSummaryKey: "trend_highlight"
};