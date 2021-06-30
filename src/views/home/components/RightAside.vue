<template>
    <el-aside class="app-right-aside clearfix" width="300px">
        <div v-show="!editingComponent.item">
            暂无操作信息
        </div>
        <div v-show="editingComponent.item">
            <p>当前操作组件为{{ editingComponent.item && editingComponent.item.name }}</p>
            {{ JSON.stringify(editingComponent) }}
        </div>
    </el-aside>
</template>

<script>
export default {
    props: {
        editingComponent: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
        };
    },
    methods: {
    }
};
</script>

<style lang="scss" scoped>
.app-right-aside{
    width: 300px;
    height: 100%;
    border-left: 1px solid #dcdfe6;
    padding: 20px;
    box-sizing: border-box;
}
</style>
