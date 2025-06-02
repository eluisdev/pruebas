// src/analytics/windowEventHandlers.js
import logSimpleEvent from "./logSimpleEvents";

// Funciones individuales

const onBeforeUnload = () => {
    window.addEventListener("beforeunload", () => {
        logSimpleEvent("beforeunload", { reason: "window close or reload" });
    });
};

const onVisibilityChange = () => {
    document.addEventListener("visibilitychange", () => {
        const state = document.visibilityState;
        logSimpleEvent("tab_visibility_change", { state });
    });
};

const onWindowBlur = () => {
    window.addEventListener("blur", () => {
        logSimpleEvent("window_blur");
    });
};

const onWindowFocus = () => {
    window.addEventListener("focus", () => {
        logSimpleEvent("window_focus");
    });
};


// Exportación por defecto del agrupador
export {
    onBeforeUnload,
    onVisibilityChange,
    onWindowBlur,
    onWindowFocus,
};