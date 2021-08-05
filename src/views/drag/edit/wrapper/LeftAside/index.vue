<template>
    <el-aside class="app-left-aside clearfix" :class="{'close': !asideIsOpen}">
        <el-menu :default-active="activeType" class="app-left-aside-menu fl" @select="menuSelect">
            <el-menu-item index="ELEMENTS">
                <i class="iconfont icon-zujian"></i>
                <p class="desc">组件</p>
            </el-menu-item>
            <el-menu-item index="PAGES">
                <i class="iconfont icon-page"></i>
                <p class="desc">页面</p>
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
                        <p>
                            <i class="iconfont" :class="value.icon"></i>
                        </p>
                        <p class="mini">{{ value.desc }}</p>
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
                        :style="handlerStyle(item.commonStyle)"
                        :data-index="index"
                        :class="{'editing': curPageData.uuid === item.uuid}"
                        @click="setCurPageData(item, index)"
                    >
                        <p class="page-title">{{ item.name || `页面${index+1}` }}</p>
                        <p class="el-icon-document-copy" @click="copyText(item.uuid)">
                            copy uuid
                        </p>
                    </div>
                </Draggable>
                <div class="page-item add-page" @click="addPage">
                    <p class="add-page">
                        <i class="iconfont icon-hao"></i>
                    </p>
                </div>
            </div>
        </div>
        <div class="switch-btn el-icon-arrow-left" @click="switchAsideStatus"></div>
    </el-aside>
</template>

<script>
import configList from "@/plugins/config.js";
import Draggable from "vuedraggable";
import { page as pageConfig } from "@/config/json_scheme.js";
import { v4 as uuidv4 } from "uuid";
import { deepClone, copyText } from "@/utils/index.js";
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
        },
        asideIsOpen: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            activeType: "ELEMENTS",
            configList,
            copyText
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
        switchAsideStatus() {
            this.$emit("update:asideIsOpen", !this.asideIsOpen);
            this.$emit("setEditInfoToLocal");
            this.menuSelect("ELEMENTS");
        },
        addPage() {
            const item = deepClone(pageConfig);
            const activityData = this.activityData;
            item.uuid = uuidv4();
            activityData.pages.push(item);
            const index = activityData.pages.length - 1;
            this.setCurPageData(item, index);
        },
        initData() {
            const activityData = this.activityData;
            if (activityData.pages.length === 0) {
                const item = deepClone(pageConfig);
                item.uuid = uuidv4();
                activityData.pages.push(item);
                this.setCurPageData(item, 0);
            } else {
                this.setCurPageData(activityData.pages[0], 0);
            }
            this.activityData.pages = activityData.pages;
            this.$emit("update:activityData", activityData);
        },
        handlerStyle(commonStyle) {
            const style = deepClone(commonStyle);
            for (const k in commonStyle) {
                if (k === "background-image") {
                    style[k] = `url(${commonStyle[k]})`;
                }
            }
            return style;
        },
        setCurPageData(item, index) {
            item.index = index;
            this.$emit("update:curPageData", item);
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
    width: 300px !important;
    height: 100%;
    border-right: 1px solid #dcdfe6;
    position: relative;
    overflow: initial;
    transition: width .3s;
    &.close{
        width: 90px !important;
        .app-left-aside-menu{
            width: 0;
            overflow: hidden;
            border: none;
        }
        .app-left-aside-content{
            width: 88px;
        }
        .switch-btn{
            transform: rotate(180deg);
        }
    }
    .switch-btn{
        width: 16px;
        height: 24px;
        border-radius: 3px;
        border: 1px solid #dcdfe6;
        color: #d8deea;
        position: absolute;
        top: calc(50% - 12px);
        right: -8px;
        line-height: 24px;
        text-align: center;
        background-color: #fff;
        cursor: pointer;
        z-index: 1;
    }
    .app-left-aside-menu{
        width: 69px;
        height: 100%;
        box-sizing: border-box;
        transition: width .3s;
        .el-menu-item, .el-submenu__title{
            line-height: 1.5 !important;
            height: auto !important;
            text-align: center !important;
            padding: 10px 0 !important;
            .desc{
                font-size: 12px;
            }
        }
        .is-active .desc{
            color: inherit;
        }
    }
    .app-left-aside-content{
        width: 230px;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        .element-list{
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            padding-left: 0;
            .element-item{
                width: 40px;
                height: 40px;
                text-align: center;
                cursor: move;
                font-size: 12px;
                padding: 5px;
                border: 1px solid #f1f1f1;
                border-radius: 5px;
                margin: 0 0 18px 18px;
                .mini{
                    padding-top: 5px;
                }
                >p{
                    font-size: 12px;
                }
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
            &:hover{
                border: 1px dashed #409EFF;
            }
            &.editing{
                border: 1px solid #409EFF;
                color: #409EFF;
                > p{
                    color: #409EFF;
                }
            }
            &.add-page{
                cursor: pointer;
                &:hover{
                    > p{
                        color: #409EFF;
                    }
                }
            }
        }
        .add-page{
            line-height: 150px;
        }
    }
}
.el-icon-document-copy{
    cursor: pointer;
}
</style>
