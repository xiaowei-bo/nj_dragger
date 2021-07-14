<template>
    <el-aside class="app-left-aside clearfix" width="300px">
        <el-menu :default-active="activeType" class="app-left-aside-menu fl" @select="menuSelect">
            <el-menu-item index="ELEMENTS">
                <i class="iconfont icon-zujian"></i>
            </el-menu-item>
            <el-menu-item index="PAGES">
                <i class="iconfont icon-page"></i>
            </el-menu-item>
        </el-menu>
        <div class="app-left-aside-content fl">
            <div v-show="activeType === 'ELEMENTS'" class="component-wrapper">
                <ul class="element-list" @dragstart="handleDragStart">
                    <li
                        v-for="(value, key) in configList"
                        :key="key"
                        class="element-item"
                        draggable
                        :data-index="key"
                    >
                        <i class="iconfont" :class="value.icon"></i>
                    </li>
                </ul>
            </div>
            <div v-show="activeType === 'PAGES'" class="page-wrapper">
                <Draggable v-model="activityData.pages" class="page-list">
                    <div
                        v-for="(item, index) in activityData.pages"
                        :key="index"
                        class="page-item"
                        draggable
                        :data-index="index"
                        :class="{'editing': curPageData.uuid === item.uuid}"
                        @click="$emit('update:curPageData', item)"
                    >
                        <p class="page-title">{{ item.uuid }}</p>
                    </div>
                </Draggable>
                <div class="page-item add-page" @click="addPage">
                    <p class="add-page">+</p>
                </div>
            </div>
        </div>
    </el-aside>
</template>

<script>
import configList from "@/plugins/config.js";
import Draggable from "vuedraggable";
import { page as pageConfig } from "@/config/json_scheme.js";
import { v4 as uuidv4 } from "uuid";
import { deepClone } from "@/utils/index.js";
export default {
    components: { Draggable },
    props: {
        activityData: {
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
            activeType: "ELEMENTS",
            configList
        };
    },
    created() {
        const activeType = sessionStorage.getItem("activeType");
        this.activeType = activeType || this.activeType;
        this.initData();
    },
    methods: {
        handleDragStart(e) {
            e.dataTransfer.setData("index", e.target.dataset.index);
        },
        menuSelect(type) {
            sessionStorage.setItem("activeType", type);
            this.activeType = type;
        },
        addPage() {
            const item = deepClone(pageConfig);
            const activityData = this.activityData;
            item.uuid = uuidv4();
            activityData.pages.push(item);
            this.$emit("update:curPageData", item);
        },
        initData() {
            const activityData = this.activityData;
            if (activityData.pages.length === 0) {
                const item = deepClone(pageConfig);
                item.uuid = uuidv4();
                activityData.pages.push(item);
                this.$emit("update:curPageData", item);
            } else {
                this.$emit("update:curPageData", activityData.pages[0]);
            }
            this.activityData.pages = activityData.pages;
            this.$emit("update:activityData", activityData);
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
        .element-list{
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            padding-left: 0;
            .element-item{
                width: 50px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                cursor: move;
            }
        }
        .page-list{
            padding: 10px;
        }
        .page-item{
            width: 130px;
            height: 180px;
            margin: 0 auto 16px;
            text-align: center;
            padding: 15px;
            box-sizing: border-box;
            border: 1px solid #dcdfe6;
            border-radius: 5px;
            cursor: move;
            &.editing{
                border: 1px solid #000;
            }
            &.add-page{
                cursor: default;
            }
        }
        .add-page{
            line-height: 150px;
        }
    }
}
</style>
