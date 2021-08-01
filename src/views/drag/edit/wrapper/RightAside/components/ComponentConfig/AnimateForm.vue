<template>
    <div class="animate-form">
        <el-form
            :model="editingComponent"
            label-suffix="："
            label-width="90px"
            label-position="left"
            size="mini"
        >
            <el-form-item
                class="right-form-item"
                label="入场动画"
            >
                <el-select v-model="editingComponent.animate">
                    <el-option
                        v-for="i in animateMap"
                        :key="i.value"
                        :label="i.desc"
                        :value="i.value"
                    />
                </el-select>
                <el-tooltip
                    effect="dark"
                    content="请选择组件入场动画"
                    placement="top"
                >
                    <i class="el-icon-info"></i>
                </el-tooltip>
            </el-form-item>
        </el-form>
        <div class="animate-demo">
            <p>动画演示：</p>
            <ul class="animate-list">
                <li
                    v-for="i in animateMap"
                    :key="i.value"
                    class="animate-item"
                    @mouseover="addClass(i.value)"
                    @click="editingComponent.animate = i.value"
                >
                    <p
                        :id="`id_${i.value}`"
                        class="animated target"
                    >
                        animate
                    </p>
                    <p class="desc">{{ i.desc }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import animateMap from "@/config/animate.js";
export default {
    name: "ConfigForm",
    props: {
        editingComponent: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            animateMap,
            timer: null
        };
    },
    methods: {
        addClass(className) {
            if (this[`${className}_timer`]) return;
            const id = `id_${className}`;
            const el = document.getElementById(id);
            el.classList.add(className);
            this[`${className}_timer`] = setTimeout(() => {
                clearTimeout(this[`${className}_timer`]);
                this[`${className}_timer`] = null;
                el.classList.remove(className);
            }, 1000);
        }
    }
};
</script>

<style lang="scss">
.right-form-item{
    display: inline-block;
    width: 85%;
    .el-input, .el-textarea, .el-select, .el-color-picker{
        display: inline-block;
        width: 85%;
        margin-right: 10px;
    }
    .el-select .el-input {
        width: 100%;
    }
}
.animate-demo{
    .animate-list{
        padding: 0;
        .animate-item{
            width: 90px;
            height: 90px;
            border-radius: 5px;
            border: 1px solid #dcdfe6;
            margin: 13px;
            display: inline-block;
            text-align: center;
            overflow: hidden;
            cursor: pointer;
            &:hover{
                border-color: #409eff;
                color: #409eff;
            }
            .target{
                color: inherit;
                line-height: 60px;
            }
            .desc{
                color: inherit;
                font-size: 12px;
            }
        }
    }
}
</style>
