<template>
    <div
        class="nj-element-box"
        @keyup.delete="$emit('deleteElement')"
    >
        <slot></slot>
        <i class="lt" @mousedown="(e) => { handlerMousedown(e, 'lt')}" @mouseout="resetFlag" @mouseover="setFlag"></i>
        <!-- <i class="lm iconfont"></i> -->
        <i class="lb" @mousedown="(e) => { handlerMousedown(e, 'lb')}" @mouseout="resetFlag" @mouseover="setFlag"></i>
        <i class="rt" @mousedown="(e) => { handlerMousedown(e, 'rt')}" @mouseout="resetFlag" @mouseover="setFlag"></i>
        <!-- <i class="rm iconfont"></i> -->
        <i class="rb" @mousedown="(e) => { handlerMousedown(e, 'rb')}" @mouseout="resetFlag" @mouseover="setFlag"></i>
        <!-- <i class="mt iconfont"></i> -->
        <!-- <i class="mb iconfont"></i> -->
        <span class="mask"></span>
    </div>
</template>

<script>
import { throttle } from "@/utils";
const refreshRate = 60; // 刷新率为 60Hz 比较流畅
const _throttleHandler = throttle(1000 / refreshRate);
export default {
    props: {
        styleInfo: {
            type: Object,
            default: () => ({})
        },
        componentResizing: {
            type: Boolean,
            default: false
        },
        targetId: {
            type: String,
            default: ""
        }
    },
    methods: {
        setFlag() {
            this.$emit("update:componentResizing", true);
        },
        resetFlag() {
            this.$emit("update:componentResizing", false);
        },
        handlerMousedown(ev, type) {
            const startX = ev.x;
            const startY = ev.y;
            const targetEl = document.getElementById(this.targetId);
            const originW = targetEl.offsetWidth;
            const originH = targetEl.offsetHeight;
            const leftToPar = this.styleInfo["margin-left"] === "auto" ? 0 : (this.styleInfo["margin-left"] || 0);
            document.onmousemove = (e) => {
                e.preventDefault();
                _throttleHandler(() => {
                    this.resizeFun({ e, type, startX, startY, originW, originH, leftToPar });
                });
            };
            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        resizeFun({ e, type, startX, startY, originW, originH, leftToPar }) {
            let targetW, targetH;
            const moveX = e.x - startX;
            const moveY = e.y - startY;
            switch (type) {
                case "lt":
                    targetW = originW - moveX;
                    targetH = originH - moveY;
                    break;
                case "lb":
                    targetW = originW - moveX;
                    targetH = originH + moveY;
                    break;
                case "rt":
                    targetW = originW + moveX;
                    targetH = originH - moveY;
                    break;
                case "rb":
                    targetW = originW + moveX;
                    targetH = originH + moveY;
                    break;
            }
            if (leftToPar + targetW > 375) return;
            const styleInfo = this.styleInfo;
            styleInfo.width = targetW + "px";
            styleInfo.height = targetH + "px";
            this.$emit("update:styleInfo", styleInfo);
        }
    },
    created() {

    }
};
</script>

<style lang="scss" scoped>
.nj-element-box{
    position: relative;
    cursor: move;
    .mask{
        display: block;
        width: 100%;
        height: 100%;
        background-color: transparent;
        position: absolute;
        top: 0;
        left: 0;
    }
    &:hover{
        border: 1px dashed rgb(116, 111, 111);
    }
    &.active{
        border: 1px dashed #000;
        i{
            display: block;
            width: 10px;
            height: 10px;
            border: 2px solid #000;
            position: absolute;
            font-weight: bold;
        }
        .lt{
            left: -1px;
            top: -1px;
            border-right-color: transparent;
            border-bottom-color: transparent;
            cursor: nwse-resize;
        }
        .lb{
            left: -1px;
            bottom: -1px;
            border-right-color: transparent;
            border-top-color: transparent;
            cursor: nesw-resize;
        }
        .rt{
            right: -1px;
            top: -1px;
            border-left-color: transparent;
            border-bottom-color: transparent;
            cursor: nesw-resize;
        }
        .rb{
            right: -1px;
            bottom: -1px;
            border-left-color: transparent;
            border-top-color: transparent;
            cursor: nwse-resize;
        }
    }
}
</style>
