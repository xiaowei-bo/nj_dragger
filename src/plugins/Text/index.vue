<template>
    <div class="nj-text">{{ text }}</div>
</template>

<script>
export default {
    name: "NjText",
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        text() {
            return this.item.configMap.text.value;
        }
    },
    data() {
        return {

        };
    },
    methods: {

    },
    created() {

    }
};
</script>

<style lang="scss" scoped>
.nj-text{
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: inherit;
}
</style>
