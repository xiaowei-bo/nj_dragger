<template>
    <el-form
        :model="editingComponent.configMap"
        label-suffix="："
        label-width="90px"
        label-position="left"
        size="mini"
    >
        <div
            v-for="(item, key) in editingComponent.configMap"
            :key="key"
        >
            <el-form-item
                v-if="!item.when || item.when(editingComponent.configMap)"
                class="right-form-item"
                :label="item.label"
            >
                <el-input
                    v-if="item.formType === 'input'"
                    v-model="item.value"
                />
                <el-input
                    v-if="item.formType === 'textarea'"
                    v-model="item.value"
                    :autosize="{ minRows: 2, maxRows: 8}"
                    type="textarea"
                />
                <el-select
                    v-if="item.formType === 'select'"
                    v-model="item.value"
                >
                    <el-option
                        v-for="i in item.valueMap"
                        :key="i.value"
                        :label="i.desc"
                        :value="i.value"
                    />
                </el-select>
                <el-upload
                    v-if="item.formType === 'upload'"
                    action="/"
                    class="avatar-uploader"
                    :show-file-list="false"
                    :on-success="(res, file) => { handleSuccess(res, file, item) }"
                    :before-upload="(file) => { beforeUpload(file, item) }"
                >
                    <img v-if="item.value" :src="item.value" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </div>
    </el-form>
</template>

<script>
export default {
    name: "ConfigForm",
    props: {
        editingComponent: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        beforeUpload(file, item) {},
        handleSuccess(res, file, item) {
            item.value = URL.createObjectURL(file.raw);
            console.log(item.value);
        }
    }
};
</script>

<style lang="scss">
.right-form-item{
    display: inline-block;
    width: 85%;
    .el-select{
        display: block;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
}
</style>
