import request from "@/utils/request";

/**
 * @description 获取活动列表
 * @returns
 */
export function getActivityList() {
    return request({
        url: "/api/drag/list",
        method: "get"
    });
}

/**
 * @description 获取活动详情
 * @param {*} id 活动Id
 * @returns
 */
export function getActivityDetail(id) {
    return request({
        url: "/api/drag/detail",
        method: "get",
        params: {
            id
        }
    });
}

/**
 * @description 修改活动详情
 * @param {*} data
 * @returns
 */
export function editActivityDetail(data) {
    return request({
        url: "/api/drag/update",
        method: "post",
        data
    });
}

/**
 * @description 增加活动详情
 * @param {*} data
 * @returns
 */
export function addActivityDetail(data) {
    return request({
        url: "/api/drag/add",
        method: "post",
        data
    });
}
