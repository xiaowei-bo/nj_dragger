---
theme: mk-cute
highlight: arduino-light
---
#### 1、前言
***
以深度学习为目的，我们来一起实现一个 H5页面可视化编辑器/可视化配置平台 (nocode)      
项目技术栈:
- 前端 Vue + VueRouter + Vuex + Scss + ElementUI   
- 服务端 Egg + MySQL + Sequelize
- 其他 VueCli + Eslint + husky
平台地址：[可视化配置平台](https://ixuexi.plus/)    
h5页面：[可视化配置平台产出Demo页面](https://ixuexi.plus/view?id=90)    
前端代码地址：[git仓库](https://github.com/killWeb/nj_dragger)   
服务端代码地址：[git仓库](https://github.com/killWeb/egg-project) 
#### 2、思路及架构图
***
![思路.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb5baabf1a87480eba8c6cf9a985f082~tplv-k3u1fbpfcp-watermark.image)

![架构图.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ac3b73463c74332ae924af0039fe7c0~tplv-k3u1fbpfcp-watermark.image?)
#### 3、效果图
***
![效果图.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17a5892b7c32403389cad99c87fd8095~tplv-k3u1fbpfcp-watermark.image)
#### 4、功能清单
***
- 组件展示区拖拽至画布区生成页面元素
- 画布内拖拽调整页面组件展示顺序
- 画布中组件选中态时，拖拽边角可快捷改变组件宽高
- 快捷键保存活动及复制、粘贴、删除组件
- 导入导出实时 JSON数据
- 画布可调整机型尺寸及缩放
- 组件样式自定义配置及实时预览
- 组件事件自定义配置，且支持执行js代码行为
- 组件进场动画配置及预览
- 真机预览，画布缩放
#### 5、代码目录结构说明
***
```
|----.husky                                     - githook 代码提交前检测
|----public
    |----index.html                             - b端入口html
    |----view.html                              - h5入口html
|----server                                     - node服务
|----sh         
    |----build.sh                               - 构建脚本
    |----deploy.sh                              - 部署脚本
|----src
    |----api                                    - 接口管理
    |----components                             - b端公共组件
    |----config
        |----animate.js                         - 动画配置文件
        |----event.js                           - 时间配置文件
        |----json_scheme.js                     - 整体数据结构
        |----style.js                           - 样式配置文件
    |----directives                             - 公共指令
    |----plugins                                - 组件库
    |----router                                 - 路由管理
    |----store                                  - 公共状态管理
    |----style                                  - 公共样式
    |----utils                                  - 公共js方法
    |----views          
        |----drag                               - 可视化配置平台
            |----edit                           - 编辑器
                |----wrapper/Edit               - 画布区
                |----wrapper/Header             - 顶部操作区
                |----wrapper/LeftAside          - 页面及组件展示区
                |----wrapper/RightAside         - 组件及页面表单配置区
            |----list                           - 活动列表页
            |----h5                             - h5页面
        |----auto                               - 可视化构建部署
        |----doc                                - 文档
    |----App.vue                                - 入口vue实例
    |----main.js                                - 入口js文件
    |----permission.js                          - 路由守卫
|----vue.config.js                              - vue/cli配置
```
#### 6、数据结构说明
首先我们需要定义好所有的数据结构，比如一个活动，一个页面，一个组件，一个基础事件，一个样式，一个基础进场动画等等
##### 一个活动数据
```
const activity = {
    title: "", // 标题
    description: "", // 描述
    coverImage: "", // 封面图
    author: "", // 作者
    pages: [] // 多页页面
};
```
##### 一个页面数据
```
const page = {
    name: "", // 页面标题
    elements: [], // 页面元素
    commonStyle: { // 页面样式配置
        "background-color": "",
        "background-image": "",
        "background-size": "cover"
    },
    config: {} // 其他配置
};
```
##### 一个组件数据
```
const element = {
    name: "", // 组件名
    desc: "", // 组件描述
    icon: "", // 组件icon
    animate: "", // 组件入场动画
    events: [], // 事件配置数据，每个图层可以添加多个事件
    configMap: {}, // 组件配置信息
    styleInfo: {} // 样式信息
};
```
##### 一个配置的动态表单数据
```
{
    key: "", // 配置key值
    value: "", // 配置value值
    valueType: "", // 值类型
    formType: "", // 配置对应表单类型
    placeholder: "", // 占位内容
    tip: "", // 问号提示内容
    when: (configMap) => { // 何时展示该配置项，入参为组件所有配置项，以供组件配置间联动展示逻辑
        return true;
    },
    label: "" // 表单label
}
```
##### 样式数据
```
const commonStyleConfig = { // 可添加所有的css属性进来，但没有必要
    "display": {
        key: "display",
        value: "block",
        valueMap: [{
            value: "block",
            desc: "块元素"
        }, {
            value: "inline-block",
            desc: "行内块元素"
        }],
        valueType: "enum",
        formType: "select",
        placeholder: "",
        tip: "请选择元素类型",
        label: "元素类型"
    }
};
```
##### 事件数据
```
const trigger = {
    key: "trigger",
    value: "click",
    valueMap: [{
        value: "click",
        desc: "点击"
    }, {
        value: "longPress",
        desc: "长按"
    }, {
        value: "load",
        desc: "加载"
    }],
    valueType: "enum",
    formType: "select",
    placeholder: "请选择事件触发方式",
    tip: "请选择事件触发方式",
    label: "触发方式"
};
const action = {
    key: "action",
    value: "toast",
    valueMap: [{
        value: "toast",
        desc: "toast提示"
    }, {
        value: "jumpLink",
        desc: "跳转外链"
    }],
    valueType: "enum",
    formType: "select",
    placeholder: "请选择事件触发行为",
    tip: "请选择事件触发行为",
    label: "触发行为"
};
const configMap = {
    text: {
        key: "text",
        value: "toast提示",
        valueType: "string",
        formType: "input",
        placeholder: "请输入toast提示文案",
        tip: "请输入toast提示文案",
        label: "提示文案",
        when: (actionType) => {
            return actionType === "toast";
        }
    }
};
```
##### 入场动画数据
```
const animateMap = [
    {
        value: "bounceInLeft",
        desc: "由左飞入"
    }, {
        value: "bounceInRight",
        desc: "由右飞入"
    }, {
        value: "bounceInDown",
        desc: "由上飞入"
    }, {
        value: "bounceInUp",
        desc: "由下飞入"
    }, {
        value: "bounceIn",
        desc: "由小变大"
    }, {
        value: "rubberBand",
        desc: "拉伸"
    }, {
        value: "fadeIn",
        desc: "淡入"
    }, {
        value: "fadeInDown",
        desc: "由上淡入"
    }, {
        value: "fadeInLeft",
        desc: "由左淡入"
    }, {
        value: "fadeInRight",
        desc: "由右淡入"
    }, {
        value: "fadeInUp",
        desc: "由下淡入"
    }, {
        value: "flipInX",
        desc: "纵向翻转"
    }, {
        value: "flipInY",
        desc: "横向翻转"
    }, {
        value: "rollIn",
        desc: "左旋飞入"
    }, {
        value: "flip",
        desc: "翻转入场"
    }
];
```
#### 7、部分重要功能代码
##### 页面编辑区
编辑器以 vue 动态组件 component 遍历铺排实现而成
```
<NjElementBox
    v-for="(item, index) in curPageData.elements"
    :id="item.uuid"
    :key="item.uuid"
    :style="item.styleInfo"
    :style-info.sync="item.styleInfo"
    :component-resizing.sync="componentResizing"
    :target-id="item.uuid"
    :class="[
        {'active': item.uuid === editingComponent.uuid},
        item.animate,
        'animated',
        {'move': !componentResizing}
    ]"
    @click.native="setEditingComponent(item)"
    @deleteElement="deleteElement(index)"
    @updateEditingStyleInfo="updateEditingStyleInfo"
>
    <component :is="item.name" class="nj-element" :item="item" />
</NjElementBox>
```
##### 组件宽高快捷缩放
主要利用 mousedown 及 mousemove 事件的监听，获取鼠标实时位置，计算移动轨迹从而改变组件的宽高属性
```
<div class="nj-element-box">
    <slot></slot>
    <i class="lt" @mousedown="(e) => { handlerMousedown(e, 'lt')}" @mouseout="resetFlag" @mouseover="setFlag"></i>
    <i class="lm" @mousedown="(e) => { handlerMousedown(e, 'lm')}" @mouseout="resetFlag" @mouseover="setFlag"></i>
    <i class="lb" @mousedown="(e) => { handlerMousedown(e, 'lb')}" @mouseout="resetFlag" @mouseover="setFlag"></i>
    <i class="rt" @mousedown="(e) => { handlerMousedown(e, 'rt')}" @mouseout="resetFlag" @mouseover="setFlag"></i>
    <i class="rm" @mousedown="(e) => { handlerMousedown(e, 'rm')}" @mouseout="resetFlag" @mouseover="setFlag"></i>
    <i class="rb" @mousedown="(e) => { handlerMousedown(e, 'rb')}" @mouseout="resetFlag" @mouseover="setFlag"></i>
    <i class="mt" @mousedown="(e) => { handlerMousedown(e, 'mt')}" @mouseout="resetFlag" @mouseover="setFlag"></i>
    <i class="mb" @mousedown="(e) => { handlerMousedown(e, 'mb')}" @mouseout="resetFlag" @mouseover="setFlag"></i>
    <span class="mask"></span>
</div>

handlerMousedown(ev, type) {
    const startX = ev.x;
    const startY = ev.y;
    const targetEl = document.getElementById(this.targetId);
    const originW = targetEl.offsetWidth;
    const originH = targetEl.offsetHeight;
    const leftToPar = (!this.styleInfo["margin-left"] || this.styleInfo["margin-left"] === "auto") ? 0 : (+(this.styleInfo["margin-left"].replace("px", "").replace("%", "")) || 0);
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
        case "lm":
            targetW = originW - moveX;
            targetH = originH;
            break;
        case "rm":
            targetW = originW + moveX;
            targetH = originH;
            break;
        case "mt":
            targetW = originW;
            targetH = originH - moveY;
            break;
        case "mb":
            targetW = originW;
            targetH = originH + moveY;
            break;
    }
    if (leftToPar + targetW > 375) {
        targetW = 375;
    }
    const styleInfo = this.styleInfo;
    styleInfo.width = targetW + "px";
    styleInfo.height = targetH + "px";
    this.$emit("update:styleInfo", styleInfo);
    this.$emit("updateEditingComponent", styleInfo);
}
```
##### 组件列表区到页面编辑区拖拽功能
主要利用h5原生drag属性，e.dataTransfer 的 setData 和 getData 方法用来值传递组件 code，再从通用配置中查找对应组件数据填入，最终达到组件拖拽的效果
```
// 源：组件列表展示区
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
handleDragStart(e) {
    e.dataTransfer.setData("index", e.target.dataset.index);
}

// 目标
<div
    id="mobileView"
    class="mobile-view"
    :style="pageStyle"
    :draggable="false"
    @drop="handleDrop"
    @dragover="handleDragOver"
>
</div>
handleDragOver(e) {
    e.preventDefault();
},
handleDrop(e) {
    const key = e.dataTransfer.getData("index");
    if (!key) return;
    const item = deepClone(this.configList[key]);
    item.uuid = uuidv4();
    const curPageData = this.curPageData;
    item.configCode = key;
    curPageData.elements.push(item);
},
```
##### 页面编辑区内拖拽
使用 vuedraggable 组件实现
```
<Draggable
    v-model="curPageData.elements"
    class="dragger-box"
    handle=".move"
    filter=".unmove"
    :animation="400"
>
    <NjElementBox
        v-for="item in curPageData.elements"
        :id="item.uuid"
        :key="item.uuid"
        :style="item.styleInfo"
        :style-info.sync="item.styleInfo"
        :target-id="item.uuid"
        :component-resizing.sync="componentResizing"
        :class="[
            {'active': item.uuid === editingComponent.uuid},
            item.animate,
            'animated',
            {'move': !componentResizing}
        ]"
        @click.native="setEditingComponent(item)"
        @updateEditingComponent="updateEditingComponent"
    >
        <component :is="item.name" class="nj-element" :item="item" />
    </NjElementBox>
</Draggable>
```
##### 组件配置动态表单
```
<el-form-item
    v-if="!item.when || item.when(editingComponent.configMap)"
    class="right-form-item"
    :label="item.label"
>
    <el-input
        v-if="item.formType === 'input'"
        v-model="item.value"
        v-setDisableKeycode
        :placeholder="item.placeholder"
    />
    <el-input
        v-if="item.formType === 'textarea'"
        v-model="item.value"
        v-setDisableKeycode
        :autosize="{ minRows: 2, maxRows: 8}"
        :placeholder="item.placeholder"
        type="textarea"
    />
    <el-select
        v-if="item.formType === 'select'"
        v-model="item.value"
    >
        <el-option
            v-for="i in item.valueMap"
            :key="i.value"
            :label="i.desc"
            :value="i.value"
        />
    </el-select>
    <el-upload
        v-if="item.formType === 'upload'"
        action="/"
        class="avatar-uploader"
        :show-file-list="false"
        :on-success="(res, file) => { handleSuccess(res, file, item) }"
        :before-upload="(file) => { beforeUpload(file, item) }"
    >
        <img v-if="item.value" :src="item.value" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-tooltip
        v-if="item.formType !== 'upload' && item.tip"
        effect="dark"
        :content="item.tip"
        placement="top"
    >
        <i class="el-icon-info"></i>
    </el-tooltip>
</el-form-item>
```
##### 组件事件注册处理
```
const handlerEvent = async (eventInfo) => {
    const el = document.getElementById(eventInfo.uuid);
    const hammer = new Hammer(el);
    let actionHandler = () => {};
    switch (eventInfo.action) {
        case "toast":
            actionHandler = () => {
                const text = eventInfo.text;
                const time = eventInfo.time;
                toastTip({
                    text,
                    time
                });
            };
            break;
        case "jumpLink":
            actionHandler = () => {
                const url = eventInfo.url;
                location.href = url;
            };
            break;
        case "jumpPage":
            actionHandler = () => {
                const urlParams = getUrlParams();
                const pageId = eventInfo.targetUuid;
                const resParams = {
                    ...urlParams,
                    pageId
                };
                const url = urlWithObj(`${location.origin}/view`, resParams);
                location.href = url;
            };
            break;
        case "runCode":
            actionHandler = () => {
                const code = eventInfo.jsCode;
                runJsCode(code);
            };
            break;
    }
    switch (eventInfo.trigger) {
        case "click":
            el.addEventListener("click", actionHandler);
            break;
        case "load":
            actionHandler();
            break;
        case "longPress":
            hammer.on("press", () => {
                actionHandler();
            });
            break;
    }
};

const handlerEventData = (curPageData) => {
    const elements = curPageData.elements;
    for (const { events, uuid } of elements) {
        if (events && events.length) {
            for (const { trigger, action, configMap } of events) {
                const filterInfo = {
                    trigger,
                    action,
                    uuid
                };
                for (const k in configMap) {
                    if (!configMap[k].when || configMap[k].when(action)) {
                        filterInfo[configMap[k].key] = configMap[k].value;
                    }
                }
                handlerEvent(filterInfo);
            }
        }
    }
};

export default handlerEventData;
```
##### 组件数据加工车间
```
/**
 * @description 为数据增添表单项供平台使用
 * @param {*} activityData
 * @returns
 */
export function setConfigMap(activityData) {
    if (!activityData || !activityData.pages || !activityData.pages.length) return activityData;
    activityData.pages.forEach(i => {
        i.elements && i.elements.length && i.elements.forEach(j => {
            // 组件基础配置处理
            const midMap = deepClone(configList[j.configCode].configMap);
            for (const k in j.configInfo) {
                midMap[k].value = j.configInfo[k];
            }
            j.configMap = midMap;
            j.configInfo && delete j.configInfo;

            // 组件样式配置处理
            const styleMap = {};
            for (const k in j.styleInfo) {
                const curMap = deepClone(commonStyleConfigMap[k]);
                styleMap[k] = curMap;
                styleMap[k].value = j.styleInfo[k];
            }
            j.styleMap = styleMap;
            // j.styleInfo && delete j.styleInfo;

            // 组件事件配置处理
            j.events && j.events.forEach(x => {
                const midXMap = deepClone(eventMap);
                for (const k in x.configInfo) {
                    midXMap[k].value = x.configInfo[k];
                }
                x.configMap = midXMap;
                x.configInfo && delete x.configInfo;
            });
        });
    });
    return activityData;
}

/**
 * @description 为数据去掉表单项减少数据量，为前端提供更清晰的数据
 * @param {*} activityData
 * @returns
 */
export function removeConfigMap(activityData) {
    if (!activityData || !activityData.pages || !activityData.pages.length) return activityData;
    activityData.pages.forEach(i => {
        i.elements.forEach(j => {
            // 组件基础配置处理
            const midInfo = {};
            for (const k in j.configMap) {
                midInfo[k] = j.configMap[k].value;
            }
            j.configInfo = midInfo;
            j.configMap && delete j.configMap;

            // 组件样式配置处理
            // const styleInfo = {};
            // for (const k in j.styleMap) {
            //     styleInfo[k] = j.styleMap[k].value;
            // }
            // j.styleInfo = styleInfo;
            j.styleMap && delete j.styleMap;

            // 组件事件配置处理
            j.events && j.events.forEach(x => {
                const midXInfo = {};
                for (const k in x.configMap) {
                    midXInfo[k] = x.configMap[k].value;
                }
                x.configInfo = midXInfo;
                x.configMap && delete x.configMap;
            });
        });
    });
    return activityData;
}
```
##### 快捷键操作
全局监听 onkeydown 事件来实现活动保存，组件删除复制粘贴等功能
遇到一个坑的就是，全局监听之后会使输入框本身的复制粘贴等和此处发生混淆错乱，解决方式，自定义指令配合状态标识处理
```
document.onkeydown = e => {
    if (this.disableKeycode) return;
    const hasCtrl = e.metaKey || e.ctrlKey;
    switch (e.code) {
        case "Backspace":
            e.preventDefault();
            this.deleteElement();
            break;
        case "KeyS":
            e.preventDefault();
            hasCtrl && this.$emit("saveActivity");
            break;
        case "KeyC":
            e.preventDefault();
            hasCtrl && this.copyElement();
            break;
        case "KeyV":
            e.preventDefault();
            hasCtrl && this.pasteElement();
            break;
    }
};

Vue.directive("setDisableKeycode", {
    inserted: function(elPar) {
        const elInput = elPar.getElementsByTagName("input") && elPar.getElementsByTagName("input")[0];
        const elTextarea = elPar.getElementsByTagName("textarea") && elPar.getElementsByTagName("textarea")[0];
        const el = elInput || elTextarea;
        el.onfocus = () => {
            store.dispatch("setDisableKeycode", true);
        };
        el.onblur = () => {
            store.dispatch("setDisableKeycode", false);
        };
    }
});
```
#### 8、组件库设计
参考 elementUI 设计，可支持按需引入、全量引入及CDN引入方式
```
|----plugins
    |----Button
        |----config.js          - 组件配置
        |----index.js           - 单组件导出
        |----index.vue          - 组件实例
    |----Image
    |----index.js               - 整体组件导出

index.js >>

import Text from "./Text/index.vue";
import Button from "./Button/index.vue";
import Image from "./Image/index.vue";
import Video from "./Video/index.vue";
import Iframe from "./Iframe/index.vue";

const components = [
    Text,
    Button,
    Image,
    Video,
    Iframe
];

const install = function(Vue) {
    if (install.installed) return;
    install.installed = true;
    components.map(component => Vue.component(component.name, component));
};

if (window && window.Vue) {
    // CDN 方式引入
    install(window.Vue);
}

export default {
    install,
    Text,
    Button,
    Image,
    Video,
    Iframe
};
```
按钮组件示例
config.js
```
export default {
    name: "NjButton", // 组件名
    desc: "按钮",
    icon: "icon-anniu",
    animate: "", // 图层的动画,可以支持多个动画
    events: [], // 事件配置数据，每个图层可以添加多个事件
    configMap: { // 组件配置信息
        btnText: {
            key: "btnText",
            value: "按钮",
            valueType: "string",
            formType: "input",
            placeholder: "请输入按钮文案",
            tip: "请输入按钮文案",
            label: "按钮文案"
        }
    },
    styleInfo: { // 样式
        "display": "block",
        "position": "relative",
        "z-index": "0",
        "text-align": "center",
        "line-height": "40px",
        "background-color": "#409eff",
        "border-top-left-radius": "40px",
        "border-top-right-radius": "40px",
        "border-bottom-left-radius": "40px",
        "border-bottom-right-radius": "40px",
        "color": "#ffffff",
        "font-size": "16px",
        "width": "300px",
        "height": "40px",
        "margin-left": "auto",
        "margin-right": "auto",
        "margin-top": "0",
        "margin-bottom": "0",
        "border-width": "0px",
        "border-style": "solid",
        "border-color": "#999"
    }
};
```
index.js
```
import Component from "./index";
Component.install = Vue => {
    Vue.component(Component.name, Component);
};
export default Component;
```
index.vue
```
<template>
    <div class="nj-btn">{{ btnText }}</div>
</template>

<script>
export default {
    name: "NjButton",
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        btnText() {
            return this.item.configMap.btnText.value;
        }
    }
};
</script>

<style lang="scss" scoped>
.nj-btn{
    font-size: inherit;
    color: inherit;
    font-weight: inherit;
}

</style>
```
#### 9、后端服务
后端服务本期不作为重点，只起到了一个作用，就是 CURD，但后期有优化空间，比如随着活动页面及页面组件的不断增多，JSON字符串会无限变大，直至字段存储爆表，优化方向，活动页面拆分，以表关联的方式降低字段存储压力
```
|----app
    |----controller
    |----model
    |----router
    |----service
|----config
    |----config.default.js
    |----plugin.js
        - egg-cors
        - egg-sequelize
|----sh
    |----deploy.sh
```
