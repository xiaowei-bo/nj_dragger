<template>
    <el-aside class="app-left-aside clearfix" width="300px">
        <el-menu default-active="1" class="app-left-aside-menu fl" @select="menuSelect">
            <el-menu-item index="1">
                <i class="iconfont icon-zujian"></i>
            </el-menu-item>
            <el-menu-item index="2">
                <i class="iconfont icon-page"></i>
            </el-menu-item>
        </el-menu>
        <div class="app-left-aside-content fl">
            <div v-show="+wrapperIndex === 1" class="component-wrapper">
                <ul class="wrapper" @dragstart="handleDragStart">
                    <li
                        v-for="(value, key) in configList"
                        :key="key"
                        class="wrapper-item"
                        draggable
                        :data-index="key"
                    >
                        <i class="iconfont" :class="value.icon"></i>
                    </li>
                </ul>
            </div>
            <div v-show="+wrapperIndex === 2" class="page-wrapper">页面</div>
        </div>
    </el-aside>
</template>

<script>
import configList from "@/plugins/config.js";
export default {
    data() {
        return {
            wrapperIndex: 1,
            configList
        };
    },
    created() {
        console.log("configList", configList);
    },
    methods: {
        handleDragStart(e) {
            console.log("dragData 接收", e.target.dataset.index);
            e.dataTransfer.setData("index", e.target.dataset.index);
        },
        menuSelect(i) {
            this.wrapperIndex = i;
        }
    }
};
</script>

<style lang="scss" scoped>
    .content{
        width: 100px;
        height: 200px;
        background-color: #eee;
    }
.app-left-aside{
    width: 300px;
    height: 100%;
    border-right: 1px solid #dcdfe6;
    .app-left-aside-menu{
        width: 70px;
        height: 100%;
        box-sizing: border-box;
    }
    .app-left-aside-content{
        width: calc(100% - 70px);
        box-sizing: border-box;
        .wrapper{
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            padding-left: 0;
            .wrapper-item{
                width: 50px;
                height: 50px;
                line-height: 50px;
                text-align: center;
            }
        }
    }
}
</style>
