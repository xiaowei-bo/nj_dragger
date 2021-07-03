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
    data() {
        return {

        };
    },
    computed: {
        btnText() {
            return this.item.configMap.btnText.value;
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
