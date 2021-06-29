<template>
    <div>
        <el-header class="app-header" height="80px">Header</el-header>
        <el-container class="app-container">
            <el-aside class="app-aside" width="200px">
                aside
            </el-aside>
            <el-main class="app-main">
                main
            </el-main>
        </el-container>
    </div>
</template>
<script>
export default {
    data() {
        return {

        };
    },
    methods: {

    }
    // setup() {
    //     const type = "";
    //     return {
    //         type
    //     }
    // }
};
</script>
<style lang="scss" scoped>
.app-header{
    width: 100%;
    padding: 20px;
    border-bottom: 1px solid #dcdfe6;
}
.app-container{
    width: 100%;
    height: calc(100% - 80px);
    .app-aside{
        height: 100%;
        padding: 20px;
        border-right: 1px solid #dcdfe6;
    }
    .app-main{
        width: calc(100% - 200px);
        height: 100%;
    }
}
</style>
