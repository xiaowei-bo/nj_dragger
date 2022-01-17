<template>
    <el-form
        ref="activityForm"
        :model="activityData"
        :rules="rules"
        class="activity-config"
        label-suffix="："
        label-width="100px"
        label-position="left"
        size="mini"
    >
        <el-form-item label="活动标题" class="activity-config-item" prop="title">
            <el-input v-model="activityData.title" v-setDisableKeycode placeholder="请输入活动标题" />
            <el-tooltip
                effect="dark"
                content="请输入活动标题"
                placement="top"
            >
                <i class="el-icon-info"></i>
            </el-tooltip>
        </el-form-item>
        <el-form-item label="活动描述" class="activity-config-item" prop="description">
            <el-input v-model="activityData.description" v-setDisableKeycode placeholder="请输入活动描述" />
            <el-tooltip
                effect="dark"
                content="请输入活动描述"
                placement="top"
            >
                <i class="el-icon-info"></i>
            </el-tooltip>
        </el-form-item>
        <el-form-item label="活动封面" class="activity-config-item" prop="coverImage">
            <el-input v-model="activityData.coverImage" v-setDisableKeycode placeholder="请输入活动封面" />
            <el-tooltip
                effect="dark"
                content="请输入活动封面"
                placement="top"
            >
                <i class="el-icon-info"></i>
            </el-tooltip>
        </el-form-item>
    </el-form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            rules: {
                title: { required: true, message: "活动标题不能为空", trigger: "blur" },
                description: { required: true, message: "活动描述不能为空", trigger: "blur" },
                coverImage: { required: true, message: "活动封面不能为空", trigger: "blur" }
            }
        };
    },
    computed: {
        ...mapGetters(["activityData"])
    },
    async mounted() {
        await this.$nextTick();
        this.$store.dispatch("setAllForm", {
            key: "ACTIVITYCONFIG",
            errMessage: "活动配置信息未填写完整",
            validate: this.$refs.activityForm.validate
        });
    }
};
</script>

<style lang="scss" scoped>
.activity-config{
    padding: 0 20px;
}
.activity-config-item{
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
</style>
