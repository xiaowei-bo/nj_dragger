<template>
    <div class="nj-video">
        <video
            id="myVideo"
            ref="myVideo"
            class="video-js vjs-default-skin"
            webkit-playsinline
            playsinline
            x5-playsinline
            x-webkit-airplay="allow"
            preload
            controls
            autoplay
        >
        </video>
    </div>
</template>

<script>
// 测试 mp4  https://media.w3.org/2010/05/sintel/trailer.mp4
// 测试 m3u8 https://dfchain.17zuoye.com/v1/get-m3u8?uid=1&live_id=5ed5b763928907ad35d7dc95&sign=7c2156253687c760ac0e59dfe75ac6096d23800f21638c538bbdbecf87960aa7&expire_time=1635651329&cdn=ali&app_id=59a91c3237d3d8d28516801c&timestamp=1627875329593
export default {
    name: "NjVideo",
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        initVideo(videoSrc) {
            const option = {
                autoplay: false, // 如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: "zh-CN",
                aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [
                    {
                        type: videoSrc.includes("m3u8") ? "application/x-mpegURL" : "video/mp4", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: videoSrc // url地址
                    }
                ],
                hls: true,
                poster: "", // 你的封面地址
                notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true // 全屏按钮
                }
            };
            const myVideo = videojs(this.$refs.myVideo, option);
            myVideo.play();
        }
    },
    async mounted() {
        await this.$nextTick();
        this.initVideo(this.item.configMap.videoUrl.value);
    }
};
</script>

<style lang="scss">
.nj-video{
    width: 100%;
    height: 100%;
    overflow: hidden;
    video{
        width: 100%;
        height: 100%;
    }
    .vjs-big-play-button{
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
    }
    .video-js{
        height: 100% !important;
    }
}
</style>
