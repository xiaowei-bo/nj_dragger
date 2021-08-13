<template>
    <div class="nj-image">
        <img v-show="src" :src="src" :draggable="false" alt="nj-image" />
        <img v-show="!src" src="https://img1.baidu.com/it/u=3826315951,2112473128&fm=26&fmt=auto&gp=0.jpg" :draggable="false" alt="nj-image" />
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
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    img{
        width: 100%;
    }
}
</style>
