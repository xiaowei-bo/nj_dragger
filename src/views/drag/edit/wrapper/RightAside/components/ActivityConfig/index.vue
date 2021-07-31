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
            <el-input v-model="activityData.title" />
        </el-form-item>
        <el-form-item label="活动描述" class="activity-config-item" prop="description">
            <el-input v-model="activityData.description" />
        </el-form-item>
        <el-form-item label="活动封面" class="activity-config-item" prop="coverImage">
            <el-input v-model="activityData.coverImage" />
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    props: {
        activityData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            rules: {
                title: { required: true, message: "活动标题不能为空", trigger: "blur" },
                description: { required: true, message: "活动描述不能为空", trigger: "blur" },
                coverImage: { required: true, message: "活动封面不能为空", trigger: "blur" }
            }
        };
    },
    mounted() {
        this.$store.dispatch("setAllForm", {
            key: "activityForm",
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
    .el-select{
        display: block;
    }
}
</style>
