/**
 * @description 执行 js 代码
 * @param {*} code
 * @returns
 */
const runJsCode = (code) => {
    if (!code) return;
    return new Function(code)();
};

export {
    runJsCode
};
