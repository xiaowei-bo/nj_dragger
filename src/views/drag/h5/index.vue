<template>
    <div class="h5" :style="px2vw(pageStyle)">
        <div
            v-for="item in curPageData.elements"
            :key="item.uuid"
            :style="px2vw(item.styleInfo)"
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
import { getUrlParams } from "@/utils";
import { setConfigMap } from "../common/handlerData";
import handlerEventData from "./handlerEvent";
let designWidth = 375;
const precision = 5;
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
        px2vw(options) {
            const style = {};
            if (!options) return style;
            for (const k in options) {
                const v = options[k];
                if (v.includes("px")) {
                    const num = +(v.split("px")[0]);
                    if (num !== 0) {
                        const newNum = +((num / designWidth).toFixed(precision + 2)) * 100;
                        style[k] = `${newNum}vw`;
                    } else {
                        style[k] = v;
                    }
                } else {
                    style[k] = v;
                }
            }
            return style;
        },
        async getPageData() {
            const { id, pageId } = getUrlParams();
            if (!id) return;
            const data = await getActivityDetail(id);
            const jsonData = data.jsonData && JSON.parse(data.jsonData) || {};
            const pages = setConfigMap(jsonData).pages;
            designWidth = data.designWidth;
            if (pageId) {
                this.curPageData = pages.find(i => i.uuid === pageId);
            } else {
                this.curPageData = pages[0];
            }
            const name = this.curPageData.name;
            document.title = name;
            await this.$nextTick();
            handlerEventData(this.curPageData);
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
    overflow: auto;
}
</style>
