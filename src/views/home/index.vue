<template>
    <div v-if="initSon" class="app">
        <el-header height="60px" :style="{'padding':0}">
            <Header
                :activity-data="activityData"
                @importJsonData="importJsonData"
            />
        </el-header>
        <el-container class="app-container">
            <LeftAside
                ref="leftAside"
                :activity-data.sync="activityData"
                :cur-page-data.sync="curPageData"
            />
            <Edit
                ref="edit"
                :cur-page-data.sync="curPageData"
                :editing-component.sync="editingComponent"
                :element-clip-board.sync="elementClipBoard"
            />
            <RightAside
                :activity-data="activityData"
                :cur-page-data.sync="curPageData"
                :editing-component.sync="editingComponent"
            />
        </el-container>
    </div>
</template>
<script>
import LeftAside from "./wrapper/LeftAside";
import RightAside from "./wrapper/RightAside";
import Header from "./wrapper/Header";
import Edit from "./wrapper/Edit";
import { activity as activityConfig } from "@/config/json_scheme";
import { deepClone } from "@/utils";
export default {
    components: {
        LeftAside,
        RightAside,
        Edit,
        Header
    },
    data() {
        return {
            initSon: false,
            activityData: {},
            curPageData: {},
            editingComponent: {}, // 当前操作中组件
            elementClipBoard: {} // 粘贴板
        };
    },
    methods: {
        getActivityData() {
            return new Promise(resolve => {
                // 模拟后端请求数据
                const res = {
                    success: true,
                    data: `{"title":"平台第一个活动","description":"这是一大段活动描述","coverImage":"http://static.runoob.com/images/demo/demo2.jpg","author":"yibo.wei","pages":[{"name":"新的页面1","elements":[{"name":"NjImage","desc":"图片组件","icon":"icon-tupian","animations":[],"events":[],"configMap":{"srcType":{"key":"srcType","value":"srcByInput","valueMap":[{"value":"srcByInput","desc":"填写链接"},{"value":"srcByUpload","desc":"上传图片"}],"valueType":"enum","formType":"select","placeholder":"","tip":"","label":"上传方式"},"srcByInput":{"key":"srcByInput","value":"http://static.runoob.com/images/demo/demo2.jpg","valueType":"string","formType":"input","placeholder":"请输入图片链接","tip":"请输入图片链接","label":"图片链接"},"srcByUpload":{"key":"srcByUpload","value":"","valueType":"string","formType":"upload","placeholder":"","tip":"请上传图片","label":"图片链接"}},"styleInfo":{"position":"relative","z-index":"0","width":"100%","margin-left":"auto","margin-right":"auto","margin-top":"0","margin-bottom":"0"},"uuid":"c38f2b62-ad65-4d1c-9c7d-88f482fea465","configCode":"ImageConfig"},{"name":"NjText","desc":"文本组件","icon":"icon-wenben","animations":[],"events":[],"configMap":{"text":{"key":"text","value":"这是一段文案测试一些些鸡尾酒诶发我我欧冠和我哥欧i污染后果我物品共计婆婆家坡及配件 我让寄给我欧珀今晚破解高品位我价格配惹我家婆家人破解外婆家平稳溶解婆家人破解破位将破解网盘偶见。","valueType":"string","formType":"input","placeholder":"","tip":"请输入文本文案","label":"文本文案"}},"styleInfo":{"position":"relative","z-index":"0","width":"100%","line-height":"1.7","padding-left":"12px","padding-right":"12px","padding-top":"12px","padding-bottom":"0","text-indent":"30px"},"uuid":"89847581-f521-4fbc-9a9b-56b879bfb10c","configCode":"TextConfig"},{"name":"NjText","desc":"文本组件","icon":"icon-wenben","animations":[],"events":[],"configMap":{"text":{"key":"text","value":"这是第二段文案我手里更好欧i我刚我欧文日给我宁欧i鞥欧i日欧冠呢欧诺个噢诶内容in诶org我哦IG噢诶欧冠我噢噢IGIE欧冠我噢诶欧冠呢日哦我偶尔个我哦日欧冠我欧恩如果我欧恩日哦内欧冠你哦","valueType":"string","formType":"input","placeholder":"","tip":"请输入文本文案","label":"文本文案"}},"styleInfo":{"position":"relative","z-index":"0","width":"100%","line-height":"1.7","padding-left":"12px","padding-right":"12px","padding-top":"12px","padding-bottom":"12px","text-indent":"30px"},"uuid":"114d4864-9af0-447f-a3a0-3ddd44eeec2e","configCode":"TextConfig"},{"name":"NjButton","desc":"按钮组件","icon":"icon-anniu","animations":[],"events":[],"configMap":{"btnText":{"key":"btnText","value":"这就是个按钮","valueType":"string","formType":"input","placeholder":"","tip":"请输入按钮文案","label":"按钮文案"}},"styleInfo":{"position":"relative","z-index":"0","text-align":"center","line-height":"40px","background-color":"#409eff","border-top-left-radius":"40px","border-top-right-radius":"40px","border-bottom-left-radius":"40px","border-bottom-right-radius":"40px","color":"#ffffff","font-size":"16px","width":"300px","height":"40px","margin-left":"auto","margin-right":"auto","margin-top":"100px","margin-bottom":"0"},"uuid":"9307ce03-6214-4525-b8b5-13f9cf1fdb58","configCode":"ButtonConfig"}],"commonStyle":{"background-color":"#fff","background-image":"url(https://pic.qqtn.com/up/2019-9/15690311636958128.jpg)","background-size":"cover"},"config":{},"uuid":"ac295e46-e46e-4dc2-afe0-f1e0a2e5b718","index":0},{"name":"页面2","elements":[],"commonStyle":{"background-color":"#fff","background-image":"","background-size":"cover"},"config":{},"uuid":"1ab164ac-dce9-43e7-9979-693c5fe95c8d","index":1}],"shareConfig":{}}`
                };
                resolve(res && res.data);
            });
        },
        async initData() {
            const loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.3)"
            });
            const activityData = await this.getActivityData();
            if (activityData) {
                this.activityData = JSON.parse(activityData);
            } else {
                this.activityData = deepClone(activityConfig);
                this.activityData.author = "yibo.wei";
            }
            this.initSon = true;
            loading.close();
        },
        importJsonData(jsonData) {
            this.activityData = deepClone(jsonData);
            this.activityData.author = "yibo.wei";
        }
    },
    created() {
        this.initData();
    }
};
</script>

<style lang="scss" scoped>
.app{
    height: 100%;
}
.app-container{
    width: 100%;
    height: calc(100% - 60px);
}
</style>
