<template>
    <div class="home">
        <Header />
        <div class="content">
            <p class="title">让页面创作变得简单</p>
            <div class="eg-1">
                <img class="edit" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a3d38fb04d746aaa4625e7db6bfecca~tplv-k3u1fbpfcp-watermark.image" alt="" />
                <img class="view" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e45431c535a4a4ba1a97f42921ba4b6~tplv-k3u1fbpfcp-watermark.image" alt="" />
            </div>
            <div class="btn-group">
                <el-button type="primary" @click="$router.push({ name: 'dragList' })">开始使用</el-button>
                <el-button type="primary" plain @click="$router.push({ name: 'draggerDoc' })">文档</el-button>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
    name: "Home",
    components: { Header, Footer },
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
    .content{
        padding: 100px 350px 0;
        box-sizing: border-box;
        .title{
            font-size: 32px;
            font-weight: bold;
            padding-bottom: 32px;
        }
        .btn-group{
            display: flex;
            justify-content: center;
            padding: 50px 0;
            .el-button{
                margin-left: 40px;
            }
        }
        .eg-1{
            width: 100%;
            min-width: 1000px;
            display: flex;
            justify-content: space-between;
            .edit{
                width: 70%;
                border: 1px solid #d8d8d8;
                border-radius: 5px;
            }
            .view{
                width: 20%;
                border: 1px solid #d8d8d8;
                border-radius: 5px;
            }
        }
    }
}
</style>
