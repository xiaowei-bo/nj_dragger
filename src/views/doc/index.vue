<template>
    <div class="doc">
        <Header :has-middle-menu="false" />
        <el-row class="tac">
            <el-col :span="4">
                <MenuList :menu-list="menuListData" @onMenuSelected="onMenuSelected" />
            </el-col>
            <el-col :span="20">
                <div class="md-wrapper">
                    <keep-alive>
                        <component :is="MdComponent" />
                    </keep-alive>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import MenuList from "./components/MenuList.vue";
import { draggerMenuList } from "./menuList";
export default {
    name: "Doc",
    components: { Header, MenuList },
    data() {
        return {
            MdComponent: ""
        };
    },
    computed: {
        menuListData() {
            const { name } = this.$route;
            const menuMap = {
                draggerDoc: draggerMenuList
            };
            return menuMap[name];
        }
    },
    methods: {
        onMenuSelected(item) {
            this.MdComponent = item.MdComponent;
        }
    }
};
</script>

<style lang="scss">
.doc{
    width: 100%;
    height: calc(100% - 80px);
    .tac{
        width: 100%;
        height: 100%;
        .el-col{
            height: 100%;
        }
        .md-wrapper{
            padding: 24px;
            box-sizing: border-box;
            height: 100%;
            overflow: auto;
        }
    }
}
</style>
