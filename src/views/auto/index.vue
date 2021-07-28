<template>
    <div class="auto">
        <Header active-index="auto" />
        <el-form class="cicd-form">
            <el-form-item label="项目：">
                <el-select v-model="currentProject" class="select">
                    <el-option
                        v-for="i in projectMap"
                        :key="i.value"
                        :label="i.desc"
                        :value="i.value"
                    />
                </el-select>
                <el-button type="primary" :inline="true" class="btn" @click="build">构建</el-button>
                <el-button type="primary" :inline="true" class="btn" @click="deploy">部署</el-button>
            </el-form-item>
            <p class="echo-wrapper">{{ output }}</p>
        </el-form>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { build, deploy } from "@/api/auto";
export default {
    name: "Auto",
    components: { Header },
    data() {
        return {
            output: "> yibo.wei$",
            currentProject: "nj_dragger",
            projectMap: [
                {
                    value: "nj_dragger",
                    desc: "可视化前端项目",
                    op: ["build", "deploy"]
                }, {
                    value: "egg-project",
                    desc: "可视化后端项目",
                    op: ["deploy"]
                }
            ]
        };
    },
    computed: {
        showBuild() {
            const op = this.projectMap.find(i => i.value === this.currentProject).op;
            return op.includes('build');
        },
        showDeploy() {
            const op = this.projectMap.find(i => i.value === this.currentProject).op;
            return op.includes('deploy');
        }
    },
    methods: {
        async build() {
            this.output = "开始构建>>>>>>>>>";
            const params = {
                project: "nj_dragger"
            };
            const res = await build(params);
            if (res.code === 0) {
                this.output = this.output + res.stdout;
                return;
            }
            this.output = this.output + res.stdout + res.stderr;
        },
        async deploy() {
            this.output = "开始部署>>>>>>>>>";
            const params = {
                project: "nj_dragger"
            };
            const res = await deploy(params);
            if (res.code === 0) {
                this.output = this.output + res.stdout;
                return;
            }
            this.output = this.output + res.stdout + res.stderr;
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
        box-sizing: border-box;
        height: calc(100% - 60px);
        padding: 20px;
        .el-form-item{
            margin-bottom: 0;
        }
        .btn{
            margin-left: 20px;
        }
        .select{
            margin-right: 20px;
        }
        .title{
            padding-bottom: 30px;
            font-weight: bold;
        }
        .echo-wrapper{
            height: calc(100% - 100px);
            margin-top: 30px;
            background-color: #000;
            color: #fff;
            font-size: 14px;
            padding: 20px;
            white-space: pre-line;
            overflow: auto;
        }
    }
}
</style>
