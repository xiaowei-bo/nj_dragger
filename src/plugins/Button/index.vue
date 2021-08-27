<template>
    <div class="nj-btn">{{ btnText }}</div>
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
    computed: {
        btnText() {
            return this.item.configMap.btnText.value;
        }
    }
};
</script>

<style lang="scss" scoped>
.nj-btn{
    font-size: inherit;
    color: inherit;
    font-weight: inherit;
}

</style>
