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
import { getUrlParams } from "@/utils";
import { setConfigMap } from "../common/handlerData";
import handlerEventData from "./handlerEvent";
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
}
</style>
