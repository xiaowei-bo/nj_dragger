<template>
    <el-main class="app-edit">
        <div
            id="mobileView"
            class="mobile-view"
            draggable
            @click.stop="$emit('update:focusEditPage', true)"
            @drop="handleDrop"
            @dragover="handleDragOver"
        >
            <Draggable v-model="curPageData.elements">
                <NjElementBox
                    v-for="(item, index) in curPageData.elements"
                    :key="item.uuid"
                    :style="item.styleInfo"
                    :class="{'active': item.uuid === editingComponent.uuid}"
                    @clickElement="setEditingComponent(item)"
                    @deleteElement="deleteElement(index)"
                >
                    <component :is="item.name" class="nj-element" :item="item" />
                </NjElementBox>
            </Draggable>
        </div>
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
        }
    },
    data() {
        return {
            configList,
            dragIndex: 0,
            enterIndex: 0
        };
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
            curPageData.elements.push(item);
            this.setEditingComponent(item);
            this.$emit("update:curPageData", curPageData);
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
        }
    },
    created() {
    },
    async mounted() {
        await this.$nextTick();
        document.onkeydown = e => {
            const hasCtrl = e.metaKey || e.ctrlKey;
            console.log(e);
            switch (e.code) {
                case "Backspace":
                    hasCtrl && this.deleteElement();
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
    .mobile-view{
        width: 375px;
        height: 667px;
        margin: 5px auto;
        border: 1px solid #dcdfe6;
        overflow: auto;
        box-sizing: content-box;
        .nj-element{
            user-select: none;
        }
    }
}
</style>
