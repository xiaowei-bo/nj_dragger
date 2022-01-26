<template>
    <div class="app-header clearfix">
        <div class="header-left fl">
            <div class="logo-box" @click="toIndex">
                <img class="logo" src="../assets/logo.png" alt="" />
            </div>
        </div>
        <div class="header-middle fl">
            <slot name="middle"></slot>
        </div>
        <div class="header-right fl clearfix">
            <slot name="right"></slot>
            <div class="avatar-box fr">
                <el-dropdown @command="handleCommand">
                    <div class="el-dropdown-link">
                        <span class="name">{{ hasLogin ? userInfo.userName : "未登录" }}</span>
                        <el-avatar src="https://p9-passport.byteacctimg.com/img/user-avatar/2b6661024c2319cd39108c3153a0d8f8~300x300.image" />
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="home">首页</el-dropdown-item>
                        <el-dropdown-item command="github">项目地址</el-dropdown-item>
                        <el-dropdown-item command="doc">文档</el-dropdown-item>
                        <el-dropdown-item command="logout" divided>{{ hasLogin ? "退出登录" : "去登录" }}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
import { logout } from "@/api/user";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            github: "https://github.com/killWeb/nj_dragger"
        };
    },
    computed: {
        ...mapGetters(["userInfo"]),
        hasLogin() {
            return this.userInfo.userName;
        }
    },
    methods: {
        toIndex() {
            this.$router.push({
                name: "home"
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
                        name: "draggerDoc"
                    });
                    break;
                case "github":
                    window.open(this.github, "_blank");
                    break;
                case "logout":
                    if (this.hasLogin) {
                        logout();
                    } else {
                        this.$router.push({
                            name: "userLogin"
                        });
                    }
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
    }
    .header-right{
        width: 380px;
        height: 60px;
        line-height: 60px;
        .avatar-box{
            padding-right: 60px;
            cursor: pointer;
            .name{
                vertical-align: middle;
                margin-right: 10px;
                font-size: 16px;
            }
        }
        .el-avatar{
            vertical-align: middle;
        }
    }
}
</style>
