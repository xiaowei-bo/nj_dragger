<template>
    <div class="doc">
        <Header :has-middle-menu="false" />
        <el-row class="tac">
            <el-col :span="4">
                <MenuList :menu-list="menuListData" @onMenuSelected="onMenuSelected" />
            </el-col>
            <el-col :span="20">
                <div v-if="currentMdComponent" class="md-wrapper">
                    <keep-alive>
                        <component :is="currentMdComponent" />
                    </keep-alive>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import MenuList from "./components/MenuList.vue";
import { draggerMenuList, deployerMenuList } from "./menuList";
export default {
    name: "Doc",
    components: { Header, MenuList },
    data() {
        return {
            currentMdComponent: {}
        };
    },
    computed: {
        menuListData() {
            const { name } = this.$route;
            const menuMap = {
                draggerDoc: draggerMenuList,
                deployerDoc: deployerMenuList
            };
            return menuMap[name];
        }
    },
    methods: {
        onMenuSelected(item) {
            this.currentMdComponent = item.component;
            console.log("item", item);
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
        }
    }
}
</style>
