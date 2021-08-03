import { toastTip } from "./components/Toast/index.js";
import { getUrlParams, urlWithObj } from "@/utils";
import { runJsCode } from "./utils";
const handlerEvent = async (eventInfo) => {
    const el = document.getElementById(eventInfo.uuid);
    const hammer = new Hammer(el);
    let actionHandler = () => {};
    switch (eventInfo.action) {
        case "toast":
            actionHandler = () => {
                const text = eventInfo.text;
                const time = eventInfo.time;
                toastTip({
                    text,
                    time
                });
            };
            break;
        case "jumpLink":
            actionHandler = () => {
                const url = eventInfo.url;
                location.href = url;
            };
            break;
        case "jumpPage":
            actionHandler = () => {
                const urlParams = getUrlParams();
                const pageId = eventInfo.targetUuid;
                const resParams = {
                    ...urlParams,
                    pageId
                };
                const url = urlWithObj(`${location.origin}/view`, resParams);
                location.href = url;
            };
            break;
        case "runCode":
            actionHandler = () => {
                const code = eventInfo.jsCode;
                runJsCode(code);
            };
            break;
    }
    switch (eventInfo.trigger) {
        case "click":
            el.addEventListener("click", actionHandler);
            break;
        case "load":
            actionHandler();
            break;
        case "longPress":
            hammer.on("press", () => {
                actionHandler();
            });
            break;
    }
}

const handlerEventData = (curPageData) => {
    const elements = curPageData.elements;
    for (const { events, uuid } of elements) {
        if (events && events.length) {
            for (const { trigger, action, configMap } of events) {
                const filterInfo = {
                    trigger,
                    action,
                    uuid
                };
                for (const k in configMap) {
                    if (!configMap[k].when || configMap[k].when(action)) {
                        filterInfo[configMap[k].key] = configMap[k].value;
                    }
                }
                handlerEvent(filterInfo);
            }
        }
    }
}

export default handlerEventData;