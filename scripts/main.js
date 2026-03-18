import { initTabs, renderChart } from "./chart.js";
import { initAiAgent } from "./ai-agent.js";
import { initAiMockContent } from "./ai-summary.js";
import { initTopTabAiControl, initMainDashboardFlow } from "./dashboard.js";
import { initPdfDemo } from "./pdf-demo.js";

const bootstrapApp = () => {
	initTabs();
	initAiAgent();
	initAiMockContent();
	initTopTabAiControl();
	initMainDashboardFlow();
	renderChart("current");
	initPdfDemo();
};

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", bootstrapApp);
} else {
	bootstrapApp();
}
