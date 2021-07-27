<template>
    <div class="home">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :router="true"
            @select="handleSelect"
        >
            <el-menu-item index="drag/list">可视化编辑</el-menu-item>
            <el-menu-item index="auto/cicd">可视化CICD</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            activeIndex: "drag/list"
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    created() {
    }
};
</script>

<style lang="scss">
.home{
    width: 100%;
    height: 100%;
}
</style>
