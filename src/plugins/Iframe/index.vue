<template>
    <div class="nj-iframe">
        <iframe :src="webUrl"></iframe>
    </div>
</template>

<script>
export default {
    name: "NjIframe",
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
        webUrl() {
            return this.item.configMap.webUrl.value;
        }
    },
    methods: {

    },
    created() {

    }
};
</script>

<style lang="scss" scoped>
.nj-iframe{
    width: 100%;
    height: 100%;
    overflow: hidden;
    iframe{
        width: 100%;
        height: 100%;
    }
}
</style>
