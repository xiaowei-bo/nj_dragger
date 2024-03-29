import * as THREE from "three";
export default function getStar(scene) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const w = canvas.width = window.innerWidth * 2;
    const h = canvas.height = window.innerHeight * 2;
    const hue = 217;
    const stars = [];
    const maxStars = 350;// 星星数量
    let count = 0;

    // 放背景图

    const canvas2 = document.createElement("canvas");
    const ctx2 = canvas2.getContext("2d");
    canvas2.width = 100;
    canvas2.height = 100;
    const half = canvas2.width / 2;
    const gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, "#CCC");
    gradient2.addColorStop(0.1, "hsl(" + hue + ", 61%, 33%)");
    gradient2.addColorStop(0.25, "hsl(" + hue + ", 64%, 6%)");
    gradient2.addColorStop(1, "transparent");

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

    // End cache

    function random(min, max) {
        if (arguments.length < 2) {
            max = min;
            min = 0;
        }

        if (min > max) {
            const hold = max;
            max = min;
            min = hold;
        }

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function maxOrbit(x, y) {
        const max = Math.max(x, y);
        const diameter = Math.round(Math.sqrt(max * max + max * max));
        return diameter / 2;
        // 星星移动范围，值越大范围越小，
    }

    const Star = function() {
        this.orbitRadius = random(maxOrbit(w, h));
        this.radius = random(60, this.orbitRadius) / 8;
        // 星星大小
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        this.speed = random(this.orbitRadius) / 150000;
        // 星星移动速度
        this.alpha = random(2, 10) / 10;

        count++;
        stars[count] = this;
    };

    Star.prototype.draw = function() {
        const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
        const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
        const twinkle = random(10);

        if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
        }

        ctx.globalAlpha = this.alpha;
        ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
    };

    for (let i = 0; i < maxStars; i++) {
        new Star();
    }

    function animation() {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 0.5; // 尾巴
        ctx.fillStyle = "hsla(" + hue + ", 64%, 6%, 2)";
        ctx.fillRect(0, 0, w, h);

        ctx.globalCompositeOperation = "lighter";
        for (let i = 1, l = stars.length; i < l; i++) {
            stars[i].draw();
        }

        window.requestAnimationFrame(animation);
    }

    const canvasBoxs = document.createElement("div");
    const images = document.createElement("img");
    images.src = "./img/in_top_bj.jpg";
    images.style.opacity = "0.4";
    images.style.width = "100%";
    images.style.height = "1280px";
    images.style.zIndex = "22";
    images.style.position = "absolute";
    images.style.background = "#000";
    canvasBoxs.appendChild(images);
    canvas.style.zIndex = "23";
    canvasBoxs.appendChild(canvas);
    const starBG = new THREE.Object3D(canvasBoxs);
    starBG.position.x = 0;
    starBG.position.y = 0;
    starBG.position.z = -5000;
    const scal = (window.innerWidth + 10000) / window.innerWidth / 2;
    starBG.scale.set(scal, scal, scal);
    scene.add(starBG);
    animation();
}
