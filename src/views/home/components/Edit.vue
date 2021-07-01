<template>
    <el-main class="app-edit">
        <div class="mobile-view" @drop="handleDrop" @dragover="handleDragOver">
            <VueDraggableResize
                v-for="(item, index) in componentList"
                :key="index"
                class="vdr"
                class-name-handle="my-handle-class"
                class-name-dragging="my-dragging-class"
                parent=".mobile-view"
                :snap="true"
                :snap-tolerance="5"
                :z-index="item.styleInfo.zIndex"
                :is-conflict-check="item.styleInfo.position === 'relative'"
                :draggable="item.isDraggable"
                :lock-aspect-ratio="item.lockAspectRatio"
                :x="item.dragInfo.x"
                :y="item.dragInfo.y"
                :w="item.dragInfo.w"
                :h="item.dragInfo.h"
                @activated="onActivated(item, index)"
                @deactivated="onDeactivated"
                @resizing="(left, top, width, height) => { onResize(left, top, width, height, item, index) }"
                @dragging="(left, top) => { onDrag(left, top, item, index) }"
            >
                {{ item.name }}
            </VueDraggableResize>
        </div>
    </el-main>
</template>

<script>
export default {
    props: {
        editingComponent: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            componentList: []
        };
    },
    methods: {
        // start 页面接收组件拖拽进页面方法
        handleDragOver(e) {
            e.preventDefault();
        },
        handleDrop(e) {
            console.log("dropData", e.dataTransfer.getData("index"));
            const index = e.dataTransfer.getData("index");
            const item = this.componentList[index];
            this.componentList.push(item);
            console.log(this.componentList);
        },
        // end
        // start 设置当前操作组件数据
        setEditingComponent(item, index) {
            const editingComponent = {
                item,
                index
            };
            this.$emit("update:editingComponent", editingComponent);
        },
        // end
        // start 页面内拖拽组件方法
        onActivated(item, index) {
            this.setEditingComponent(item, index);
        },
        onDeactivated() {
            this.setEditingComponent({}, 0);
        },
        onResize(left, top, width, height, item, index) {
            item.dragInfo = {
                x: left,
                y: top,
                w: width,
                h: height
            };
            this.setEditingComponent(item, index);
        },
        onDrag(left, top, item, index) {
            item.dragInfo.x = left;
            item.dragInfo.y = top;
            this.setEditingComponent(item, index);
        }
        // end
    },
    created() {

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
        margin: 70px auto;
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
