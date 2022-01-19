import axios from "axios";
import { Message } from "element-ui";

const service = axios.create({
    timeout: 30000
});

service.interceptors.request.use(
    config => {
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
