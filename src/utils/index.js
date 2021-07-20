import { Message } from "element-ui";
const deepClone = (target) => {
    const type = typeof target;
    let result;
    if (type === "object") {
        if (Array.isArray(target)) {
            result = [];
            for (const i of target) {
                result.push(deepClone(i));
            }
        } else {
            result = {};
            for (const k in target) {
                result[k] = deepClone(target[k]);
            }
        }
    } else {
        result = target;
    }
    return result;
};

const copyText = (text) => {
    const cacheInput = document.getElementById("hideInput");
    const hideInput = cacheInput || document.createElement("input");
    hideInput.value = text;
    !cacheInput && document.body.appendChild(hideInput);
    hideInput.select();
    document.execCommand("Copy");
    hideInput.className = "hide-input";
    hideInput.id = "hideInput";
    hideInput.style.display = "none";
    Message.success("复制成功");
};

export {
    deepClone,
    copyText
};
