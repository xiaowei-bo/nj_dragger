<template>
    <div v-show="show" class="toast-tip">{{ text }}</div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: ""
        }
    }
};
</script>

<style lang="scss" scoped>
.toast-tip{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 6px 12px;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, .7);
    font-size: 14px;
    color: #fff;
}
</style>
