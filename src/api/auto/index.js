import request from "@/utils/request";

/**
 * @description 构建
 * @returns
 */
export function build(params) {
    return request({
        url: "/api/auto/ci",
        method: "get",
        params
    });
}

/**
 * @description 部署
 * @returns
 */
export function deploy(params) {
    return request({
        url: "/api/auto/cd",
        method: "get",
        params
    });
}
