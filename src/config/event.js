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
    },
    time: {
        key: "time",
        value: 3,
        valueType: "number",
        formType: "input",
        placeholder: "请输入toast提示时间",
        tip: "请输入toast提示时间",
        label: "提示时长",
        when: (actionType) => {
            return actionType === "toast";
        }
    },
    url: {
        key: "url",
        value: "www.baidu.com",
        valueType: "string",
        formType: "input",
        placeholder: "请输入跳转链接",
        tip: "请输入跳转链接",
        label: "跳转链接",
        when: (actionType) => {
            return actionType === "jumpLink";
        }
    },
    targetUuid: {
        key: "targetUuid",
        value: "",
        valueType: "string",
        formType: "input",
        placeholder: "请输入页面uuid",
        tip: "请输入页面uuid",
        label: "页面uuid",
        when: (actionType) => {
            return actionType === "jumpPage";
        }
    }
};

export default {
    trigger,
    action,
    configMap
};
