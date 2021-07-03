<template>
    <div class="nj-image">
        <img :src="src" alt="nj-image" />
    </div>
</template>

<script>
export default {
    name: "NjImage",
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
        src() {
            return this.item.configMap[this.item.configMap.srcType.value].value;
        }
    },
    methods: {

    },
    created() {

    }
};
</script>

<style lang="scss" scoped>
.nj-image{
    width: 100%;
    height: 100%;
    overflow: hidden;
    img{
        width: 100%;
    }
}
</style>
