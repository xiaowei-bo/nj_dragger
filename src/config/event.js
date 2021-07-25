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
    }, {
        value: "jumpPage",
        desc: "跳转页面"
    }],
    valueType: "enum",
    formType: "select",
    placeholder: "请选择事件触发行为",
    tip: "请选择事件触发行为",
    label: "触发行为"
};
const configMap = {
    toast: {
        text: {
            key: "text",
            value: "toast提示",
            valueType: "string",
            formType: "input",
            placeholder: "请输入toast提示文案",
            tip: "请输入toast提示文案",
            label: "提示文案"
        },
        time: {
            key: "time",
            value: 3,
            valueType: "number",
            formType: "input",
            placeholder: "请输入toast提示时间",
            tip: "请输入toast提示时间",
            label: "提示时长"
        }
    }
};

export default {
    trigger,
    action,
    configMap
};
