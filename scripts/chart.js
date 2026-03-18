import { baseNames, tabScale, metricDefs } from "./data.js";

export function createSeed(tabKey) {
	const factor = tabScale[tabKey] ?? 1;

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

export function renderChart(tabKey) {
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

export function initTabs() {
	const tabs = document.querySelectorAll("#rankTabs button");
	if (tabs.length === 0) {
		return;
	}

	tabs.forEach((tab) => {
		tab.addEventListener("click", () => {
			tabs.forEach((t) => {
				t.classList.remove("is-active");
				t.style.background = "#ccc";
				t.style.color = "#333";
				t.style.border = "1px solid #bbb";
			});

			tab.classList.add("is-active");
			tab.style.background = "#f6a523";
			tab.style.color = "#fff";
			tab.style.border = "1px solid #e59d16";

			renderChart(tab.dataset.tab ?? "current");
		});
	});
}