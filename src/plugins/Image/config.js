export default {
    name: "NjImage", // 组件名
    desc: "图片组件",
    icon: "icon-tupian",
    animations: [], // 图层的动画,可以支持多个动画
    events: [], // 事件配置数据，每个图层可以添加多个事件
    configMap: { // 组件配置信息
        srcType: {
            key: "srcType",
            value: "srcByInput",
            valueMap: [{
                value: "srcByInput",
                desc: "填写链接"
            }, {
                value: "srcByUpload",
                desc: "上传图片"
            }],
            valueType: "enum",
            formType: "select",
            placeholder: "",
            tip: "",
            label: "上传方式"
        },
        srcByInput: {
            key: "srcByInput",
            value: "https://img1.baidu.com/it/u=3826315951,2112473128&fm=26&fmt=auto&gp=0.jpg",
            valueType: "string",
            formType: "input",
            placeholder: "请输入图片链接",
            tip: "请输入图片链接",
            when: (configMap) => {
                return configMap["srcType"].value === "srcByInput";
            },
            label: "图片链接"
        },
        srcByUpload: {
            key: "srcByUpload",
            value: "",
            valueType: "string",
            formType: "upload",
            placeholder: "",
            tip: "请上传图片",
            when: (configMap) => {
                return configMap["srcType"].value === "srcByUpload";
            },
            label: "图片链接"
        }
    },
    styleInfo: { // 样式
        "position": "relative",
        "z-index": "0",
        "width": "100%"
    }
};
