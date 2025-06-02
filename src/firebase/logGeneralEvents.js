import { logEvent } from "firebase/analytics";
import { useEffect, useRef } from "react"
import { useLocation, useNavigationType } from "react-router-dom"
import { logSimpleEvent } from "./logSimpleEvents";

import { analytics } from "../config/firebase"

const logLogin = (method) => {
    logEvent(analytics, "login", { method });
};

const logPurchase = ({ value, currency, items }) => {
    logEvent(analytics, "purchase", {
        value,
        currency,
        items,
    });
};

const logOnboardingAbandon = (step) => {
    logEvent(analytics, "onboarding_abandon", { step });
};

const useTrackNavigation = () => {
    const location = useLocation();
    const navigationType = useNavigationType(); // PUSH, POP, REPLACE
    const previousPath = useRef(null);

    useEffect(() => {
        const currentPath = location.pathname + location.search;

        console.log("Se envio trakeo")
        // Enviar evento a Analytics
        logSimpleEvent("page_navigation", {
            from: previousPath.current,
            to: currentPath,
            type: navigationType,
            timestamp: Date.now()
        });

        // Actualizar la referencia
        previousPath.current = currentPath;
    }, [location, navigationType]);
};

// Export por defecto agrupado
export {
    useTrackNavigation,
    logLogin,
    logPurchase,
    logOnboardingAbandon
};