<template>
    <el-form
        :model="activityData"
        class="activity-config"
        label-suffix="："
        label-width="90px"
        label-position="left"
        size="mini"
    >
        <el-form-item label="活动标题" class="activity-config-item">
            <el-input v-model="activityData.title" />
        </el-form-item>
        <el-form-item label="活动描述" class="activity-config-item">
            <el-input v-model="activityData.description" />
        </el-form-item>
        <el-form-item label="活动封面" class="activity-config-item">
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
    }
};
</script>

<style lang="scss" scoped>
.activity-config{
    padding: 0 20px;
}
.activity-config-item{
    display: inline-block;
    width: 60%;
}
</style>
