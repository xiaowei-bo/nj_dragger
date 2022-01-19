import axios from "axios";
import { Message } from "element-ui";
import { VUE_APP_BASE_URI } from "../config";

const getToken = () => {
    return "test";
};

const service = axios.create({
    baseURL: VUE_APP_BASE_URI,
    timeout: 30000
});

service.interceptors.request.use(
    config => {
        const token = getToken();
        config.headers["authorization"] = token;
        return config;
    },
    error => {
        console.error(error);
    }
);

service.interceptors.response.use(
    response => {
        const res = response.data;
        return res;
    },
    error => {
        Message({
            message: error.message,
            type: "error",
            duration: 5 * 1000
        });
        throw error;
    }
);

export default service;
