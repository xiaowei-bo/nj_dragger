import request from "@/utils/request";

export async function logout() {
    await request({
        url: "/api/user/logout",
        method: "get"
    });
    location.href = "/";
}

export function login(data) {
    return request({
        url: "/api/user/login",
        method: "post",
        data
    });
}

export function region(data) {
    return request({
        url: "/api/user/region",
        method: "post",
        data
    });
}

export function getUserInfo() {
    return request({
        url: "/api/user/info",
        method: "get"
    });
}
