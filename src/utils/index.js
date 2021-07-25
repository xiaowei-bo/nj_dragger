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

export {
    deepClone,
    copyText,
    getUrlParams,
    urlWithObj
};
