<template>
    <div class="auto">
        <Header />
        <div class="cicd-form">
            <p class="title">当前 CICD 项目为 nj_dragger </p>
            <el-button type="primary" :inline="true" @click="build">构建</el-button>
            <el-button type="primary" :inline="true" @click="deploy">部署</el-button>
            <p class="echo-wrapper">{{ output }}</p>
        </div>
    </div>
</template>

<script>
import Header from "./components/Header.vue";
import { build, deploy } from "@/api/auto";
export default {
    name: "Auto",
    components: { Header },
    data() {
        return {
            output: ""
        };
    },
    methods: {
        async build() {
            this.output = "开始构建>>>>>>>>>";
            const params = {
                project: "nj_dragger"
            };
            const res = await build(params);
            console.log(res);
            this.output = res.stdout + res.stderr;
        },
        async deploy() {
            this.output = "开始部署>>>>>>>>>";
            const params = {
                project: "nj_dragger"
            };
            const res = await deploy(params);
            console.log(res);
            this.output = res.stdout + res.stderr;
        }
    },
    created() {
    }
};
</script>

<style lang="scss">
.auto{
    width: 100%;
    height: 100%;
    .cicd-form{
        padding: 20px;
        .title{
            padding-bottom: 30px;
            font-weight: bold;
        }
        .echo-wrapper{
            margin-top: 30px;
            background-color: #000;
            color: #fff;
            font-size: 14px;
            padding: 20px;
            white-space: pre-line;
        }
    }
}
</style>
