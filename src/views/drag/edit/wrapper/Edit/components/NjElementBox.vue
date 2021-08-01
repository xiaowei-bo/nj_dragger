<template>
    <div
        class="nj-element-box"
        @keyup.delete="$emit('deleteElement')"
    >
        <slot></slot>
        <i class="lt"></i>
        <!-- <i class="lm iconfont"></i> -->
        <i class="lb"></i>
        <i class="rt"></i>
        <!-- <i class="rm iconfont"></i> -->
        <i class="rb"></i>
        <!-- <i class="mt iconfont"></i> -->
        <!-- <i class="mb iconfont"></i> -->
        <span class="mask"></span>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    methods: {

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
