<template>
    <div class="nj-btn" :style="styleInfo">{{ btnText }}</div>
</template>

<script>
export default {
    name: "NjButton",
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {

        };
    },
    computed: {
        btnText() {
            return this.item.configMap.btnText.value;
        },
        styleInfo() {
            const styleInfo = this.item.styleInfo;
            // 字体样式需特殊处理覆盖
            return { color: styleInfo["color"], fontSize: styleInfo["font-size"] };
        }
    },
    methods: {

    },
    created() {

    }
};
</script>

<style scoped>

</style>
