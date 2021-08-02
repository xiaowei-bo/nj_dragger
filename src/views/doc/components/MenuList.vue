<template>
    <div class="menu-list">
        <el-menu
            class="el-menu-vertical-demo"
            :default-active="defaultActive"
            :default-openeds="defaultOpens"
        >
            <template v-for="item in menuList">
                <el-menu-item v-if="!item.child || !item.child.length" :key="item.code" :index="item.code" @click="onMenuSelected(item)">
                    <i :class="item.icon"></i>
                    <span slot="title" class="menu-title">{{ item.desc }}</span>
                </el-menu-item>
                <el-submenu v-if="item.child" :key="item.code" :index="item.code">
                    <template slot="title">
                        <span slot="title">{{ item.desc }}</span>
                    </template>
                    <el-menu-item-group v-for="childItem in item.child" :key="childItem.code">
                        <el-menu-item :index=" childItem.desc" @click="onMenuSelected(childItem)">{{ childItem.desc }}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "Menus",
    props: {
        menuList: {
            type: Array,
            default: () => ([])
        }
    },
    computed: {
        defaultActive() {
            const data = this.menuList.length && this.menuList[0] || null;
            this.onMenuSelected(data);
            return data.name || null;
        },
        defaultOpens() {
            return this.menuList.map(item => item.name);
        }
    },
    methods: {
        onMenuSelected(item) {
            this.$emit("onMenuSelected", item);
        }
    }
};
</script>

<style lang="scss" scoped>
.menu-list {
    height: 100%;
    .el-menu {
        height: 100%;
    }
}
</style>
