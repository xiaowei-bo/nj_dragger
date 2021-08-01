<template>
    <div class="nj-video">
        <video
            webkit-playsinline
            playsinline
            x5-playsinline
            x-webkit-airplay="allow"
            preload
            controls
            autoplay
            :src="videoUrl"
        >
            <source id="source" :src="videoUrl" type="video/mp4" />
            <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a web browser that
                <span>supports HTML5 video</span>
            </p>
        </video>
    </div>
</template>

<script>
export default {
    name: "NjVideo",
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
        videoUrl() {
            return this.item.configMap.videoUrl.value;
        }
    },
    methods: {

    },
    created() {

    }
};
</script>

<style lang="scss" scoped>
.nj-video{
    width: 100%;
    height: 100%;
    overflow: hidden;
    video{
        width: 100%;
    }
}
</style>
