<template>
    <div class="app-header clearfix">
        <div class="header-left fl">
            <div class="logo-box" @click="toIndex">
                <img class="logo" src="../assets/logo.png" alt="" />
            </div>
            <slot name="left"></slot>
        </div>
        <div class="header-middle fl" :class="{'no-pd': hasMiddleMenu}">
            <el-menu
                v-if="hasMiddleMenu"
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
            >
                <el-menu-item index="drag">可视化编辑</el-menu-item>
                <el-menu-item index="auto">可视化CICD</el-menu-item>
            </el-menu>
            <slot name="middle"></slot>
        </div>
        <div class="header-right fl clearfix">
            <slot name="right"></slot>
            <div class="avatar-box fr">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        <span class="name">yibo.wei</span>
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="home">首页</el-dropdown-item>
                        <el-dropdown-item command="github">项目地址</el-dropdown-item>
                        <el-dropdown-item command="doc">使用文档</el-dropdown-item>
                        <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        hasMiddleMenu: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            activeIndex: "drag",
            github: "https://github.com/killWeb/nj_dragger"
        };
    },
    methods: {
        handleSelect(key) {
            const { name } = this.$route;
            if (key === "drag" && name !== "dragList") {
                this.$router.push({
                    name: "dragList"
                });
            } else if (key === "auto" && name !== "autoCICD") {
                this.$router.push({
                    name: "autoCICD"
                });
            }
        },
        toIndex() {
            this.$router.push({
                name: "dragList"
            });
        },
        handleCommand(commond) {
            switch (commond) {
                case "home":
                    this.$router.push({
                        name: "home"
                    });
                    break;
                case "doc":
                    this.$router.push({
                        name: "dragDoc"
                    });
                    break;
                case "github":
                    window.open(this.github, "_blank");
                    break;
                case "logout":
                    // TODO 注销登录态
                    break;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.app-header{
    width: 100%;
    border-bottom: 1px solid #dcdfe6;
    position: relative;
    z-index: 1;
    .header-left{
        width: 280px;
        height: 60px;
        .logo-box{
            display: inline-block;
            height: 100%;
            padding: 7px 0 7px 20px;
            box-sizing: border-box;
            cursor: pointer;
        }
        .logo{
            height: 100%;
        }
    }
    .header-middle{
        width: calc(100% - 660px);
        height: 60px;
        padding: 20px 20px 0;
        box-sizing: border-box;
        &.no-pd{
            padding: 0;
        }
    }
    .header-right{
        width: 380px;
        height: 60px;
        line-height: 60px;
        .avatar-box{
            padding-right: 60px;
            cursor: pointer;
            .name{
                position: relative;
                top: 10px;
                margin-right: 5px;
            }
        }
        .el-avatar{
            vertical-align: middle;
        }
    }
}
</style>
