<template>
    <el-main class="app-edit">
        <div class="mobile-view" @drop="handleDrop" @dragover="handleDragOver">
            <VueDraggableResize
                v-for="(item, index) in curPageData.elements"
                :key="item.uuid"
                class="vdr"
                class-name-handle="my-handle-class"
                class-name-dragging="my-dragging-class"
                parent=".mobile-view"
                :snap="true"
                :snap-tolerance="5"
                :z-index="item.styleInfo.zIndex"
                :is-conflict-check="item.styleInfo.position === 'relative'"
                :draggable="item.dragInfo.isDraggable"
                :lock-aspect-ratio="item.dragInfo.lockAspectRatio"
                :x="item.dragInfo.x"
                :y="item.dragInfo.y"
                :w="item.dragInfo.w"
                :h="item.dragInfo.h"
                @activated="onActivated(item, index)"
                @resizing="(left, top, width, height) => { onResize(left, top, width, height, item, index) }"
                @dragging="(left, top) => { onDrag(left, top, item, index) }"
            >
                <component :is="item.name" :item="item" />
            </VueDraggableResize>
        </div>
    </el-main>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { deepClone } from "@/utils/index.js";
import configList from "@/plugins/config.js";
export default {
    props: {
        editingComponent: {
            type: Object,
            default: () => ({})
        },
        curPageData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            configList
        };
    },
    methods: {
        // start 页面接收组件拖拽进页面方法
        handleDragOver(e) {
            e.preventDefault();
        },
        handleDrop(e) {
            console.log("dropData 接收：", e.dataTransfer.getData("index"));
            const key = e.dataTransfer.getData("index");
            const item = deepClone(this.configList[key]);
            console.log("a1", this.configList[key]);
            console.log("a2", item);
            item.uuid = uuidv4();
            item.dragInfo.y = Math.floor(Math.random() * 667);
            const curPageData = this.curPageData;
            this.setEditingComponent(item);
            curPageData.elements.push(item);
            this.$emit("update:curPageData", curPageData);
            console.log(this.curPageData);
        },
        // end
        // start 设置当前操作组件数据
        setEditingComponent(item) {
            console.log("当前操作项：", item);
            this.$emit("update:editingComponent", item);
        },
        // end
        // start 页面内拖拽组件方法
        onActivated(item) {
            this.setEditingComponent(item);
        },
        onDeactivated() {
            // this.setEditingComponent({});
        },
        onResize(left, top, width, height, item) {
            item.dragInfo = {
                x: left,
                y: top,
                w: width,
                h: height
            };
            this.setEditingComponent(item);
        },
        onDrag(left, top, item) {
            item.dragInfo.x = left;
            item.dragInfo.y = top;
            this.setEditingComponent(item);
        }
        // end
    },
    created() {
        const a = {
            name: "666",
            fun: () => {
                return "fff";
            },
            obj: {
                vv: ""
            },
            arr: ["ff", "gg", { dd: "fswww" }],
            bool: true
        };
        console.log("a", a);
        console.log("deepClone a", deepClone(a));
    }
};
</script>

<style lang="scss">
.app-edit{
    width: calc(100% - 600px);
    height: 100%;
    .mobile-view{
        width: 375px;
        height: 667px;
        margin: 5px auto;
        border: 1px solid #dcdfe6;
        .vdr{
            cursor: move;
        }
        .par-box{
            width: 100%;
            height: 100%;
        }
        .my-dragging-class {
            border-color: black;
        }
        .my-handle-class {
            position: absolute;
            border: 2px solid black;
            box-sizing: border-box;
            -webkit-transition: all 300ms linear;
            -ms-transition: all 300ms linear;
            transition: all 300ms linear;
        }
        .my-handle-class-tl {
            cursor: nwse-resize;
            border-right-color: transparent;
            border-bottom-color: transparent;
        }
        .my-handle-class-tr {
            cursor: nesw-resize;
            border-left-color: transparent;
            border-bottom-color: transparent;
        }
        .my-handle-class-bl {
            cursor: nesw-resize;
            border-right-color: transparent;
            border-top-color: transparent;
        }
        .my-handle-class-br {
            cursor: nwse-resize;
            border-left-color: transparent;
            border-top-color: transparent;
        }
        .my-handle-class-ml,
        .my-handle-class-mr{
            cursor: ew-resize;
        }
        .my-handle-class-tm,
        .my-handle-class-bm {
            cursor: ns-resize;
        }
    }
}
</style>
