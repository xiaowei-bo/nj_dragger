<template>
    <el-main class="app-edit">
        <div class="tool-box clearfix">
            <el-dropdown class="cont cont1 fl" @command="handlerCommandMobileType">
                <p>
                    {{ viewTypeMap[curViewType].desc }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </p>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        v-for="(value, key) in viewTypeMap"
                        :key="key"
                        :command="value.code"
                    >
                        {{ value.desc }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <p class="cont cont2 fl">{{ viewTypeMap[curViewType].width }} x {{ viewTypeMap[curViewType].height }}</p>
            <el-dropdown class="cont cont3 fr" @command="handlerCommandScale">
                <p>
                    {{ mobileViewScale * 100 + "%" }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </p>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        v-for="(item, index) in scaleArr"
                        :key="index"
                        :command="item"
                    >
                        {{ item * 100 + "%" }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div
            v-if="curViewType === 'IPHONEX_ZJ'"
            class="mobile-view-box iphone-x-zj"
            :style="{ transform: `scale(${mobileViewScale})`}"
        >
            <img src="../../../assets/iphone-x.png" class="iphone-x-img" alt="" />
            <div
                id="mobileView"
                class="mobile-view"
                :style="pageStyle"
                :draggable="false"
                @drop="handleDrop"
                @dragover="handleDragOver"
            >
                <Draggable
                    v-model="curPageData.elements"
                    class="dragger-box"
                    handle=".move"
                    filter=".unmove"
                    :animation="400"
                >
                    <NjElementBox
                        v-for="(item, index) in curPageData.elements"
                        :id="item.uuid"
                        :key="item.uuid"
                        :style="item.styleInfo"
                        :style-info.sync="item.styleInfo"
                        :component-resizing.sync="componentResizing"
                        :target-id="item.uuid"
                        :class="[
                            {'active': item.uuid === editingComponent.uuid},
                            item.animate,
                            'animated',
                            {'move': !componentResizing}
                        ]"
                        @click.native="setEditingComponent(item)"
                        @deleteElement="deleteElement(index)"
                        @updateEditingStyleInfo="updateEditingStyleInfo"
                    >
                        <component :is="item.name" class="nj-element" :item="item" />
                    </NjElementBox>
                </Draggable>
            </div>
        </div>
        <div
            v-else
            class="mobile-view-box"
            :style="{
                transform: `scale(${mobileViewScale})`,
                width: `${viewTypeMap[curViewType].width}px`,
                height: `${viewTypeMap[curViewType].height}px`
            }"
        >
            <div
                id="mobileView"
                class="mobile-view"
                :style="pageStyle"
                :draggable="false"
                @drop="handleDrop"
                @dragover="handleDragOver"
            >
                <Draggable
                    v-model="curPageData.elements"
                    class="dragger-box"
                    handle=".move"
                    filter=".unmove"
                    :animation="400"
                >
                    <NjElementBox
                        v-for="item in curPageData.elements"
                        :id="item.uuid"
                        :key="item.uuid"
                        :style="item.styleInfo"
                        :style-info.sync="item.styleInfo"
                        :target-id="item.uuid"
                        :component-resizing.sync="componentResizing"
                        :class="[
                            {'active': item.uuid === editingComponent.uuid},
                            item.animate,
                            'animated',
                            {'move': !componentResizing}
                        ]"
                        @click.native="setEditingComponent(item)"
                        @updateEditingComponent="updateEditingComponent"
                    >
                        <component :is="item.name" class="nj-element" :item="item" />
                    </NjElementBox>
                </Draggable>
            </div>
        </div>
        <div class="rubbish-box">垃圾桶</div>
    </el-main>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { deepClone } from "@/utils/index.js";
import configList from "@/plugins/config.js";
import NjElementBox from "./components/NjElementBox.vue";
import Draggable from "vuedraggable";
export default {
    components: { NjElementBox, Draggable },
    props: {
        editingComponent: {
            type: Object,
            default: () => ({})
        },
        elementClipBoard: {
            type: Object,
            default: () => ({})
        },
        curPageData: {
            type: Object,
            default: () => ({})
        },
        focusEditPage: {
            type: Boolean,
            default: false
        },
        curViewType: {
            type: String,
            default: ""
        },
        mobileViewScale: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            configList,
            dragIndex: 0,
            enterIndex: 0,
            viewTypeMap: {
                "IPHONE6/7/8": {
                    code: "IPHONE6/7/8",
                    desc: "iphone6/7/8",
                    width: 375,
                    height: 667
                },
                "IPHONEX": {
                    code: "IPHONEX",
                    desc: "iphoneX",
                    width: 375,
                    height: 812
                },
                "IPAD": {
                    code: "IPAD",
                    desc: "iPad",
                    width: 768,
                    height: 1024
                },
                "IPHONEX_ZJ": {
                    code: "IPHONEX_ZJ",
                    desc: "iphoneX 真机",
                    width: 375,
                    height: 812
                }
            },
            scaleArr: [0.5, 0.7, 0.8, 0.9, 1, 1.2],
            componentResizing: false
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
        // start 页面接收组件拖拽进页面方法
        handleDragOver(e) {
            e.preventDefault();
        },
        handleDrop(e) {
            const key = e.dataTransfer.getData("index");
            if (!key) return;
            const item = deepClone(this.configList[key]);
            item.uuid = uuidv4();
            const curPageData = this.curPageData;
            item.configCode = key;
            curPageData.elements.push(item);
            this.setEditingComponent(item);
            this.$emit("update:curPageData", curPageData);
            this.$nextTick(() => {
                const el = document.getElementById(item.uuid);
                el.scrollIntoView({
                    block: "start",
                    behavior: "smooth"
                });
            });
        },
        // end
        setEditingComponent(item) {
            this.$emit("update:editingComponent", item);
        },
        deleteElement() {
            if (!Object.keys(this.editingComponent).length) return;
            const uuid = this.editingComponent.uuid;
            const curPageData = this.curPageData;
            const index = curPageData.elements.findIndex(i => i.uuid === uuid);
            curPageData.elements.splice(index, 1);
            this.$emit("update:curPageData", curPageData);
        },
        copyElement() {
            if (!Object.keys(this.editingComponent).length) return;
            const item = deepClone(this.editingComponent);
            this.$emit("update:elementClipBoard", item);
        },
        pasteElement() {
            if (!Object.keys(this.elementClipBoard).length) return;
            const uuid = this.editingComponent.uuid;
            const item = deepClone(this.elementClipBoard);
            item.uuid = uuidv4();
            const curPageData = this.curPageData;
            if (!uuid) {
                curPageData.elements.push(item);
            } else {
                const index = curPageData.elements.findIndex(i => i.uuid === uuid);
                curPageData.elements.splice(index + 1, 0, item);
            }
            this.setEditingComponent(item);
            this.$emit("update:curPageData", curPageData);
        },
        handlerCommandMobileType(viewType) {
            if (this.curViewType === viewType) return;
            this.$emit("update:curViewType", viewType);
            this.$emit("setEditInfoToLocal");
        },
        handlerCommandScale(i) {
            if (this.mobileViewScale === i) return;
            this.$emit("update:mobileViewScale", i);
            this.$emit("setEditInfoToLocal");
        },
        updateEditingComponent(styleInfo) {
            const component = this.editingComponent;
            component.styleInfo.width = styleInfo.width;
            component.styleInfo.height = styleInfo.height;
            component.styleMap.width.value = styleInfo.width;
            component.styleMap.height.value = styleInfo.height;
            this.setEditingComponent(deepClone(component));
        }
    },
    async mounted() {
        await this.$nextTick();
        document.onkeydown = e => {
            const hasCtrl = e.metaKey || e.ctrlKey;
            const customKey = ["Backspace", "KeyS", "KeyC", "KeyV"];
            if (hasCtrl && customKey.includes(e.code)) {
                e.preventDefault();
            }
            switch (e.code) {
                case "Backspace":
                    hasCtrl && this.deleteElement();
                    break;
                case "KeyS":
                    hasCtrl && this.$emit("saveActivity");
                    break;
                case "KeyC":
                    hasCtrl && this.copyElement();
                    break;
                case "KeyV":
                    hasCtrl && this.pasteElement();
                    break;
            }
        };
    }
};
</script>

<style lang="scss">
.app-edit{
    width: calc(100% - 700px);
    height: 100%;
    background-color: #f7f7f7;
    padding: 0;
    position: relative;
    .tool-box{
        width: 230px;
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        border: 1px solid #dcdfe6;
        position: absolute;
        left: 10px;
        top: 10px;
        .cont{
            font-size: 12px;
            .el-icon-arrow-down{
                margin-left: 0;
            }
            p{
                font-size: 12px;
            }
            &.cont1{
                width: 43%;
                padding-left: 8px;
                cursor: pointer;
            }
            &.cont2{
                width: 30%;
                text-align: center;
            }
            &.cont3{
                width: 27%;
                padding-right: 8px;
                text-align: right;
                cursor: pointer;
            }
        }
    }
    .rubbish-box{
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
        color: inherit;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        position: absolute;
        bottom: 10px;
        left: 10px;
    }
    .mobile-view-box{
        position: relative;
        z-index: 1;
        pointer-events: none;
        margin: 80px auto;
    }
    .iphone-x-zj{
        width: 430px;
        height: 867px;
        margin: 30px auto 0;
        padding: 20px 26px 0;
        border-radius: 70px;
        position: relative;
        overflow: hidden;
        .mobile-view{
            height: 812px;
            margin: 0;
            border-radius: 35px;
        }
        .iphone-x-img{
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            pointer-events: none;
        }
    }
    .mobile-view{
        width: 100%;
        height: 100%;
        border: 1px solid #dcdfe6;
        overflow: auto;
        border-radius: 5px;
        pointer-events: auto;
        box-sizing: content-box;
        .dragger-box{
            height: 100%;
        }
        .nj-element{
            user-select: none;
        }
    }
}
</style>
