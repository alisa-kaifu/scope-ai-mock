export function initAiAgent() {
	const layer = document.getElementById("aiAgentLayer");
	const panel = document.getElementById("aiAgentPanel");
	const backdrop = document.getElementById("aiAgentBackdrop");
	const expandBtn = document.getElementById("aiAgentToggle"); // ◀
	const shrinkBtn = document.getElementById("aiAgentCollapse"); // ▶
	const closeBtn = document.getElementById("aiAgentClose");
	const handleStack = document.querySelector(".ai-agent-handle-stack");

	if (!layer || !panel || !backdrop || !expandBtn || !shrinkBtn || !closeBtn || !handleStack) {
		return;
	}

	/** @type {"full" | "compact" | "min"} */
	let viewMode = "min";
	let canDock = false;
	let handlePositionPct = 60;
	let dragStartPct = handlePositionPct;
	let dragStartY = 0;
	let isDraggingHandle = false;
	let dragPointerId = null;
	let dragHasMoved = false;
	let suppressNextHandleClick = false;

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
		handleStack.style.setProperty("--ai-handle-top", `${handlePositionPct}%`);

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

	const clampHandlePosition = (pct) => Math.min(85, Math.max(20, pct));

	const applyHandlePosition = () => {
		handleStack.style.setProperty("--ai-handle-top", `${handlePositionPct}%`);
	};

	const handleDragMove = (event) => {
		if (dragPointerId === null || event.pointerId !== dragPointerId) {
			return;
		}

		const deltaY = event.clientY - dragStartY;
		if (!dragHasMoved && Math.abs(deltaY) < 5) {
			return;
		}

		if (!dragHasMoved) {
			dragHasMoved = true;
			isDraggingHandle = true;
			handleStack.classList.add("is-dragging");
		}

		event.preventDefault();
		const deltaPct = (deltaY / window.innerHeight) * 100;
		handlePositionPct = clampHandlePosition(dragStartPct + deltaPct);
		handleStack.style.setProperty("--ai-handle-top", `${handlePositionPct}%`);
	};

	const stopHandleDrag = (event) => {
		if (dragPointerId === null) {
			return;
		}

		if (event?.pointerId !== undefined && event.pointerId !== dragPointerId) {
			return;
		}

		window.removeEventListener("pointermove", handleDragMove);
		window.removeEventListener("pointerup", stopHandleDrag);
		window.removeEventListener("pointercancel", stopHandleDrag);

		if (isDraggingHandle) {
			suppressNextHandleClick = true;
		}

		dragPointerId = null;
		dragHasMoved = false;
		if (isDraggingHandle) {
			isDraggingHandle = false;
			handleStack.classList.remove("is-dragging");
		}
	};

	const startHandleDrag = (event) => {
		if (event.button !== undefined && event.button !== 0 && event.pointerType === "mouse") {
			return;
		}

		dragPointerId = event.pointerId ?? 0;
		dragStartY = event.clientY;
		dragStartPct = handlePositionPct;
		dragHasMoved = false;
		isDraggingHandle = false;

		window.addEventListener("pointermove", handleDragMove);
		window.addEventListener("pointerup", stopHandleDrag);
		window.addEventListener("pointercancel", stopHandleDrag);
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
	handleStack.addEventListener("pointerdown", startHandleDrag);
	handleStack.addEventListener("click", (event) => {
		if (!suppressNextHandleClick) {
			return;
		}
		event.preventDefault();
		event.stopImmediatePropagation();
		suppressNextHandleClick = false;
	});
	window.addEventListener("blur", stopHandleDrag);

	evaluateDockability();
	viewMode = getDefaultMode();
	render();
}
