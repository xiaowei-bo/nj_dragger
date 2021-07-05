<template>
    <el-main class="app-edit">
        <div
            class="mobile-view"
            draggable
            @drop="handleDrop"
            @dragover="handleDragOver"
        >
            <Draggable v-model="curPageData.elements">
                <NjElementBox
                    v-for="item in curPageData.elements"
                    :key="item.uuid"
                    :style="item.styleInfo"
                    :class="{'active': item.uuid === editingComponent.uuid}"
                    @clickElement="() => { setEditingComponent(item) }"
                >
                    <component :is="item.name" class="nj-element" :item="item" />
                </NjElementBox>
            </Draggable>
        </div>
    </el-main>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { deepClone } from "@/utils/index.js";
import configList from "@/plugins/config.js";
import NjElementBox from "./NjElementBox.vue";
import Draggable from "vuedraggable";
export default {
    components: { NjElementBox, Draggable },
    props: {
        editingComponent: {
            type: Object,
            default: () => ({})
        },
        curPageData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            configList,
            dragIndex: 0,
            enterIndex: 0
        };
    },
    methods: {
        // start 页面接收组件拖拽进页面方法
        handleDragOver(e) {
            e.preventDefault();
        },
        handleDrop(e) {
            const key = e.dataTransfer.getData("index");
            if (!key) return;
            console.log("dropData 接收：", key);
            const item = deepClone(this.configList[key]);
            const curPageData = this.curPageData;
            item.uuid = uuidv4();
            this.setEditingComponent(item);
            curPageData.elements.push(item);
            this.$emit("update:curPageData", curPageData);
        },
        // end
        // start 设置当前操作组件数据
        setEditingComponent(item) {
            this.$emit("update:editingComponent", item);
        }
        // end
    },
    created() {
    }
};
</script>

<style lang="scss">
.app-edit{
    width: calc(100% - 600px);
    height: 100%;
    .mobile-view{
        width: 375px;
        height: 667px;
        margin: 5px auto;
        border: 1px solid #dcdfe6;
        overflow: auto;
        .nj-element{
            user-select: none;
        }
    }
}
</style>
