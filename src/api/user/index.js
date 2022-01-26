import request from "@/utils/request";
/**
 * @description 退出登录
 */
export async function logout() {
    await request({
        url: "/api/user/logout",
        method: "get"
    });
    location.href = "/";
}
/**
 * @description 用户登录
 * @param {*} data
 * @returns
 */
export function login(data) {
    return request({
        url: "/api/user/login",
        method: "post",
        data
    });
}
/**
 * @description 用户注册
 * @param {*} data
 * @returns
 */
export function region(data) {
    return request({
        url: "/api/user/region",
        method: "post",
        data
    });
}
/**
 * @description 获取用户信息
 * @returns
 */
export function getUserInfo() {
    return request({
        url: "/api/user/info",
        method: "get"
    });
}
/**
 * @description 获取用户列表
 * @param {*} params
 * @returns
 */
export function getUserList(params) {
    return request({
        url: "/api/user/list",
        method: "get",
        params
    });
}
export function reportOnlineTime(during) {
    return request({
        url: "/api/user/onlineTime",
        method: "post",
        data: {
            during
        }
    });
}
