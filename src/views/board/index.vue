<template>
    <div>
        <canvas id="three"></canvas>
    </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import getStar from "@/utils/star";
export default {
    name: "Board",
    methods: {
        initThree() {
            const canvas = document.getElementById("three");
            // 创建场景
            const scene = new THREE.Scene();
            // 创建相机
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            // 创建渲染器
            const renderer = new THREE.WebGLRenderer({ canvas });
            // 设置尺寸并添加
            // getStar(scene);
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            const gltfLoader = new GLTFLoader();
            gltfLoader.load("/static/car/scene.gltf", (gltf) => {
                const model = gltf.scene;
                console.log(model);
                // 添加这段代码
                // 遍历模型每部分
                model.traverse((o) => {
                    // 将图片作为纹理加载
                    const explosionTexture = new THREE.TextureLoader().load(
                        "/static/car/textures/Bagaznik_baseColor.png"
                    );
                    // 调整纹理图的方向
                    explosionTexture.flipY = false;
                    // 将纹理图生成基础网格材质(MeshBasicMaterial)
                    const material = new THREE.MeshBasicMaterial({
                        map: explosionTexture
                        // bumpMap: explosionTexture1
                    });
                    // 给模型每部分上材质
                    o.material = material;
                });

                scene.add(model);
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0xb9d3ff, 1);
            camera.position.set(5, 5, 5);
            camera.lookAt(scene.position);
            // 渲染
            const animate = () => {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            };
            animate();
        }
    },
    async mounted() {
        await this.$nextTick();
        this.initThree();
    }
};
</script>

<style lang="scss">
.board{
    width: 100%;
    height: 100%;
    #three{
        width: 100%;
        height: 100%;
    }
}
</style>
