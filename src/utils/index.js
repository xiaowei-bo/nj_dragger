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

export {
    deepClone
};
