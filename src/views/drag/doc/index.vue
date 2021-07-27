<template>
    <div class="doc">
        <Header>
            <template v-slot:middle>mm</template>
        </Header>
    </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
    name: "Doc",
    components: { Header }
};
</script>

<style lang="scss">
.doc{}
</style>
