<template>
    <div class="home">
        <Header />
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
    name: "Home",
    components: { Header },
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

<style lang="scss">
.home{
    width: 100%;
    height: 100%;
}
</style>
