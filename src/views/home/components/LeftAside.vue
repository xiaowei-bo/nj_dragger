<template>
    <el-aside class="app-left-aside clearfix" width="300px">
        <el-menu default-active="1" class="app-left-aside-menu fl" @select="menuSelect">
            <el-menu-item index="1">
                <i class="el-icon-setting"></i>
            </el-menu-item>
            <el-menu-item index="2">
                <i class="el-icon-document"></i>
            </el-menu-item>
        </el-menu>
        <div class="app-left-aside-content fl">
            <div v-show="+wrapperIndex === 1" class="component-wrapper">
                <ul class="wrapper">
                    <li
                        v-for="(item, index) in componentList"
                        :key="index"
                        class="wrapper-item"
                    >
                        <i :class="item.icon"></i>
                    </li>
                </ul>
            </div>
            <div v-show="+wrapperIndex === 2" class="page-wrapper">页面</div>
        </div>
    </el-aside>
</template>

<script>
export default {
    data() {
        return {
            wrapperIndex: 1,
            componentList: [{
                name: "Image",
                icon: "el-icon-picture"
            }, {
                name: "Link",
                icon: "el-icon-link"
            }, {
                name: "Copy",
                icon: "el-icon-connection"
            }, {
                name: "Product",
                icon: "el-icon-shopping-cart-full"
            }]
        };
    },
    methods: {
        menuSelect(i) {
            this.wrapperIndex = i;
        }
    }
};
</script>

<style lang="scss" scoped>
.app-left-aside{
    width: 300px;
    height: 100%;
    border-right: 1px solid #dcdfe6;
    .app-left-aside-menu{
        width: 70px;
        height: 100%;
        box-sizing: border-box;
    }
    .app-left-aside-content{
        width: calc(100% - 70px);
        box-sizing: border-box;
        .wrapper{
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            padding-left: 0;
            .wrapper-item{
                width: 50px;
                height: 50px;
                line-height: 50px;
                text-align: center;
            }
        }
    }
}
</style>
