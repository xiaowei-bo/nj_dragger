<template>
    <div class="h5" :style="pageStyle">
        <div
            v-for="item in curPageData.elements"
            :key="item.uuid"
            :style="item.styleInfo"
            class="animated"
            :class="item.animate"
        >
            <component
                :is="item.name"
                :id="item.uuid"
                class="nj-element"
                :item="item"
            />
        </div>
    </div>
</template>

<script>
import { getActivityDetail } from "@/api/drag";
import { getUrlParams, urlWithObj } from "@/utils";
import { setConfigMap } from "../common/handlerData";
import { toastTip } from "./components/Toast/index.js";
export default {
    data() {
        return {
            curPageData: {}
        };
    },
    computed: {
        pageStyle() {
            const style = this.curPageData.commonStyle;
            for (const k in this.curPageData.commonStyle) {
                if (k === "background-image" && this.curPageData.commonStyle[k] && !this.curPageData.commonStyle[k].includes("url(")) {
                    style[k] = `url(${this.curPageData.commonStyle[k]})`;
                }
            }
            return style;
        }
    },
    methods: {
        async getPageData() {
            const { id, pageId } = getUrlParams();
            if (!id) return;
            const data = await getActivityDetail(id);
            const jsonData = data.jsonData && JSON.parse(data.jsonData) || {};
            const pages = setConfigMap(jsonData).pages;
            if (pageId) {
                this.curPageData = pages.find(i => i.uuid === pageId);
            } else {
                this.curPageData = pages[0];
            }
            console.log("curPageData", this.curPageData);
            const name = this.curPageData.name;
            document.title = name;
            this.handlerEventData(this.curPageData);
        },
        handlerEventData(curPageData) {
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
                        this.handlerEvent(filterInfo);
                    }
                }
            }
        },
        async handlerEvent(eventInfo) {
            await this.$nextTick();
            const el = document.getElementById(eventInfo.uuid);
            const hammer = new Hammer(el);
            let actionHandler = () => {};
            switch (eventInfo.action) {
                case "toast":
                    actionHandler = () => {
                        const text = eventInfo.text;
                        const time = eventInfo.time;
                        console.log("text", text);
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
    },
    created() {
        this.getPageData();
    }
};
</script>

<style lang="scss">
html,body{
    height: 100%;
}
.h5{
    height: 100%;
}
</style>
