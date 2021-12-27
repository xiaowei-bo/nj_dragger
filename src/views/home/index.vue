<template>
    <div class="home">
        <Header>
            <template v-slot:left>
                <div class="logo-box">
                    <img class="logo" src="../drag/assets/logo.png" alt="" />
                </div>
            </template>
        </Header>
        <div id="app-footer">
            <a href="https://beian.miit.gov.cn" target="_blank">备案号：京ICP备2021040594号</a>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
    name: "Home",
    components: { Header },
    data() {
        return {
        };
    },
    methods: {
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
#app-footer{
    width: 100%;
    background-color: #000;
    padding: 20px;
    text-align: center;
    position: fixed;
    left: 0;
    bottom: 0;
    >a{
        color: #fff;
        text-decoration: none;
    }
}
</style>
