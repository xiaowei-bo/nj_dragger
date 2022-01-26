import { Message } from "element-ui";
/**
 * @description 深拷贝
 * @param {*} target
 * @returns
 */
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
/**
 * @description 节流函数
 * @param {*} delay
 * @returns
 */
const throttle = (delay) => {
    let run = false;
    return function(callback = () => {}) {
        if (run) return false;
        run = true;
        callback();
        setTimeout(() => {
            run = false;
        }, delay);
    };
};
/**
 * @description 复制文本
 * @param {*} text
 */
const copyText = (text) => {
    const hideInput = document.createElement("input");
    hideInput.value = text;
    document.body.appendChild(hideInput);
    hideInput.select();
    document.execCommand("Copy");
    hideInput.style.display = "none";
    hideInput.remove();
    Message.success("复制成功");
};
/**
 * @description 获取链接参数
 * @param {*} item
 * @param {*} url
 * @returns
 */
const getUrlParams = (item, url) => {
    function decodeLocationSearch(url = "") {
        if (!location.search && !url) return {};
        if (url && !url.includes("?")) return {};
        const query = {};
        let _url = "";
        if (url) {
            _url = `?${url.split("?")[1]}`;
        } else {
            _url = location.search;
        }
        _url.slice(1).split("&").forEach(function(kv) {
            query[kv.split("=")[0]] = decodeURIComponent(kv.split("=")[1]);
        });
        return query;
    }
    if (item) {
        var svalue = (url || location.search).match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
        return svalue ? decodeURIComponent(svalue[1]) : "";
    } else {
        return decodeLocationSearch(url);
    }
};
/**
 * @description 链接对象参数拼接
 * @param {*} url
 * @param {*} obj
 * @returns
 */
const urlWithObj = (url = "", obj = {}) => {
    if (typeof obj !== "object" || !Object.keys(obj).length) return url;
    const _arr = [];
    const _hasQuery = url && url.includes("?");
    if (_hasQuery) {
        const u_obj = getUrlParams("", url);
        Object.assign(obj, u_obj);
    }
    for (const k in obj) {
        _arr.push(`${k}=${obj[k]}`);
    }
    return `${url.split("?")[0]}?${_arr.join("&")}`;
};
/**
 * @description 检验图片链接有效性
 * @param {*} src
 * @returns
 */
const checkImg = (src) => {
    if (!src) return "";
    const status = ["http", "//"].some(i => src.startsWith(i));
    return status ? src : "";
};
/**
 * @description setTimeout 实现 setInterval
 * @param {Function} handler
 * @param {Number} interval
 */
const handlerInterval = (handler = () => {}, interval) => {
    handler();
    setTimeout(() => {
        handlerInterval(handler, interval);
    }, interval);
};

export {
    deepClone,
    copyText,
    getUrlParams,
    urlWithObj,
    checkImg,
    throttle,
    handlerInterval
};
