export function initAiAgent() {
	const layer = document.getElementById("aiAgentLayer");
	const panel = document.getElementById("aiAgentPanel");
	const backdrop = document.getElementById("aiAgentBackdrop");
	const expandBtn = document.getElementById("aiAgentToggle"); // ◀
	const shrinkBtn = document.getElementById("aiAgentCollapse"); // ▶
	const closeBtn = document.getElementById("aiAgentClose");

	if (!layer || !panel || !backdrop || !expandBtn || !shrinkBtn || !closeBtn) {
		return;
	}

	/** @type {"full" | "compact" | "min"} */
	let viewMode = "min";
	let canDock = false;

	const getMainColumn = () => document.querySelector(".main-column");

	const getAvailableWidth = () => {
		const mainColumn = getMainColumn();
		if (!mainColumn) {
			return 0;
		}

		const mainRight = mainColumn.getBoundingClientRect().right;
		return Math.floor(window.innerWidth - mainRight);
	};

	const evaluateDockability = () => {
		if (window.innerWidth <= 980) {
			canDock = false;
			return;
		}

		canDock = getAvailableWidth() >= 300;
	};

	const getDefaultMode = () => {
		return canDock ? "compact" : "min";
	};

	const applyCompactWidth = () => {
		const availableWidth = getAvailableWidth();

		if (availableWidth >= 300) {
			panel.style.width = `${availableWidth}px`;
			return;
		}

		panel.style.removeProperty("width");
	};

	const normalizeMode = () => {
		if (!canDock && viewMode === "compact") {
			viewMode = "min";
		}

		if (viewMode !== "full" && viewMode !== "compact" && viewMode !== "min") {
			viewMode = getDefaultMode();
		}
	};

	const openLayer = () => {
		layer.classList.add("is-open");
		layer.setAttribute("aria-hidden", "false");
	};

	const renderPanel = () => {
		panel.classList.remove("is-full", "is-compact", "is-min");
		panel.style.removeProperty("width");

		if (viewMode === "full") {
			panel.classList.add("is-full");
			panel.style.width = "900px";
			return;
		}

		if (viewMode === "compact") {
			panel.classList.add("is-compact");
			applyCompactWidth();
			return;
		}

		panel.classList.add("is-min");
	};

	const renderButtons = () => {
		const expandIcon = expandBtn.querySelector(".ai-agent-handle-toggle-icon");
		if (expandIcon) {
			expandIcon.textContent = "◀";
		}
		shrinkBtn.textContent = "▶";

		const isFull = viewMode === "full";
		const isCompact = viewMode === "compact";
		const isMin = viewMode === "min";

		expandBtn.classList.add("is-hidden");
		shrinkBtn.classList.add("is-hidden");

		expandBtn.disabled = true;
		shrinkBtn.disabled = true;

		expandBtn.setAttribute("aria-disabled", "true");
		shrinkBtn.setAttribute("aria-disabled", "true");

		if (isFull) {
			shrinkBtn.classList.remove("is-hidden");
			shrinkBtn.disabled = false;
			shrinkBtn.setAttribute("aria-disabled", "false");
			return;
		}

		if (isCompact) {
			expandBtn.classList.remove("is-hidden");
			shrinkBtn.classList.remove("is-hidden");

			expandBtn.disabled = false;
			shrinkBtn.disabled = false;

			expandBtn.setAttribute("aria-disabled", "false");
			shrinkBtn.setAttribute("aria-disabled", "false");
			return;
		}

		if (isMin) {
			expandBtn.classList.remove("is-hidden");
			expandBtn.disabled = false;
			expandBtn.setAttribute("aria-disabled", "false");
		}
	};

	const render = () => {
		normalizeMode();
		renderPanel();
		renderButtons();
		openLayer();
	};

	const expandPanel = () => {
		if (viewMode === "min") {
			viewMode = canDock ? "compact" : "full";
			return;
		}

		if (viewMode === "compact") {
			viewMode = "full";
		}
	};

	const shrinkPanel = () => {
		if (viewMode === "full") {
			viewMode = canDock ? "compact" : "min";
			return;
		}

		if (viewMode === "compact") {
			viewMode = "min";
		}
	};

	const closePanel = () => {
		viewMode = "min";
	};

	const handleResize = () => {
		const prevCanDock = canDock;
		evaluateDockability();

		if (prevCanDock !== canDock) {
			if (canDock) {
				// ② -> ①
				if (viewMode === "min") {
					viewMode = "compact";
				}
			} else {
				// ① -> ②
				if (viewMode === "compact") {
					viewMode = "min";
				}
			}
		}

		render();
	};

	expandBtn.addEventListener("click", () => {
		expandPanel();
		render();
	});

	shrinkBtn.addEventListener("click", () => {
		shrinkPanel();
		render();
	});

	closeBtn.addEventListener("click", () => {
		closePanel();
		render();
	});

	backdrop.addEventListener("click", () => {
		closePanel();
		render();
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			closePanel();
			render();
		}
	});

	window.addEventListener("resize", handleResize);

	evaluateDockability();
	viewMode = getDefaultMode();
	render();
}
