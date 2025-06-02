import { logEvent } from "firebase/analytics";
import { analytics } from "../config/firebase";

const logSimpleEvent = (eventName, eventParams = {}) => {
    try {
        logEvent(analytics, eventName, eventParams);
    } catch (error) {
        console.log(error);
    }
};

export {
    logSimpleEvent
}