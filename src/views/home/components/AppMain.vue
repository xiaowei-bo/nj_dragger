<template>
    <el-main class="app-main">
        <div class="mobile-view">
            <VueDraggableResize
                v-for="(item, index) in componentList"
                :key="index"
                class="vdr"
                class-name-handle="my-handle-class"
                class-name-dragging="my-dragging-class"
                :snap="true"
                :snap-tolerance="5"
                :parent="true"
                :z-index="item.styleInfo.zIndex"
                :is-conflict-check="item.styleInfo.position === 'relative'"
                :draggable="item.isDraggable"
                :lock-aspect-ratio="item.lockAspectRatio"
                :x="item.dragInfo.x"
                :y="item.dragInfo.y"
                :w="item.dragInfo.w"
                :h="item.dragInfo.h"
                :on-drag-start="() => { setEditingComponent(item, index) }"
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
            componentList: [{
                name: "Image",
                icon: "el-icon-picture",
                configInfo: {
                    isDraggable: true,
                    lockAspectRatio: true
                },
                styleInfo: {
                    position: "relative",
                    zIndex: "0"
                },
                dragInfo: {
                    x: 0,
                    y: 0,
                    w: 100,
                    h: 100
                }
            }, {
                name: "Link",
                icon: "el-icon-link",
                configInfo: {
                    isDraggable: true,
                    lockAspectRatio: false
                },
                styleInfo: {
                    position: "relative",
                    zIndex: "0"
                },
                dragInfo: {
                    x: 0,
                    y: 100,
                    w: 375,
                    h: 100
                }
            }, {
                name: "Copy",
                icon: "el-icon-connection",
                configInfo: {
                    isDraggable: true,
                    lockAspectRatio: false
                },
                styleInfo: {
                    position: "absolute",
                    zIndex: "0"
                },
                dragInfo: {
                    x: 0,
                    y: 200,
                    w: 100,
                    h: 100
                }
            }, {
                name: "Product",
                icon: "el-icon-shopping-cart-full",
                configInfo: {
                    isDraggable: true,
                    lockAspectRatio: false
                },
                styleInfo: {
                    position: "relative",
                    zIndex: "0"
                },
                dragInfo: {
                    x: 0,
                    y: 300,
                    w: 100,
                    h: 100
                }
            }]
        };
    },
    methods: {
        setEditingComponent(item, index) {
            const editingComponent = {
                item,
                index
            };
            this.$emit("update:editingComponent", editingComponent);
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
    },
    created() {

    }
};
</script>

<style lang="scss">
.app-main{
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
