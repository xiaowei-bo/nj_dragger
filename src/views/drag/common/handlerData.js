/**
 * @description 数据清洗车间
 */

import configList from "@/plugins/config";
import eventList from "@/config/event";
const eventMap = eventList["configMap"];
import { deepClone } from "@/utils";

/**
 * @description 为数据增添表单项供平台使用
 * @param {*} activityData
 * @returns
 */
export function setConfigMap(activityData) {
    if (!activityData || !activityData.pages || !activityData.pages.length) return activityData;
    activityData.pages.forEach(i => {
        i.elements.forEach(j => {
            // 组件基础配置处理
            const midMap = deepClone(configList[j.configCode].configMap);
            for (const k in j.configInfo) {
                midMap[k].value = j.configInfo[k];
            }
            j.configMap = midMap;
            j.configInfo && delete j.configInfo;

            // 组件事件配置处理
            j.events && j.events.forEach(x => {
                const midXMap = deepClone(eventMap);
                for (const k in x.configInfo) {
                    midXMap[k].value = x.configInfo[k];
                }
                x.configMap = midXMap;
                x.configInfo && delete x.configInfo;
            });
        });
    });
    return activityData;
}

/**
 * @description 为数据去掉表单项减少数据量，为前端提供更清晰的数据
 * @param {*} activityData
 * @returns
 */
export function removeConfigMap(activityData) {
    if (!activityData || !activityData.pages || !activityData.pages.length) return activityData;
    activityData.pages.forEach(i => {
        i.elements.forEach(j => {
            // 组件基础配置处理
            const midInfo = {};
            for (const k in j.configMap) {
                midInfo[k] = j.configMap[k].value;
            }
            j.configInfo = midInfo;
            j.configMap && delete j.configMap;

            // 组件事件配置处理
            j.events && j.events.forEach(x => {
                const midXInfo = {};
                for (const k in x.configMap) {
                    midXInfo[k] = x.configMap[k].value;
                }
                x.configInfo = midXInfo;
                x.configMap && delete x.configMap;
            });
        });
    });
    return activityData;
}
