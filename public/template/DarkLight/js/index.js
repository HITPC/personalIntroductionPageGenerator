gsap.registerPlugin(ScrollTrigger);
console.log("GSAP相关脚本加载了");

const startContainer = document.getElementById("startContainer");
const topImg = startContainer.querySelector(".top-img");
const bottomImg = startContainer.querySelector(".bottom-img");

// 创建滚动动画
// gsap.to([topImg, bottomImg], {
//   yPercent: (i, target) => (target === topImg ? -150 : 150), // 上图上飞，下图下飞
//   opacity: 0,
//   duration: 1.5,
//   ease: "power3.inOut",
//   scrollTrigger: {
//     trigger: startContainer,
//     start: "top center",     // 开始位置：容器顶部到达视口中间
//     end: "bottom center",    // 结束位置：容器底部到达视口中间
//     scrub: true,             // 动画与滚动同步
//     pin: true,               // 固定容器
//     // markers: true          // 可选调试标记
//   }
// });

// === 动画：鼠标移动视差效果（优化后）===
let ticking = false;

function updateParallax(e) {
	const width = window.innerWidth;
	const height = window.innerHeight;

	const percentX = e.clientX / width;
	const percentY = e.clientY / height;

	const normalizedX = (percentX - 0.5) * 2;
	const normalizedY = (percentY - 0.5) * 2;

	const baseOffsetX = 10;
	const baseOffsetY = 8;

	const offsetX = normalizedX * baseOffsetX;
	const offsetY = normalizedY * baseOffsetY;

	const imgs = startContainer.querySelectorAll("img");
	imgs.forEach((img, index) => {
		let depthFactor = index === 0 ? 1 : 1.8; // 第一张偏移小，第二张大
		const finalOffsetX = offsetX * depthFactor;
		const finalOffsetY = offsetY * depthFactor * 0.8;

		gsap.to(img, {
			duration: 0.5,
			ease: "power2.out",
			x: finalOffsetX,
			y: finalOffsetY,
			overwrite: "auto",
		});
	});
}

startContainer.addEventListener("mousemove", (e) => {
	if (!ticking) {
		requestAnimationFrame(() => {
			updateParallax(e);
			ticking = false;
		});
		ticking = true;
	}
});

startContainer.addEventListener("mouseleave", () => {
	const imgs = startContainer.querySelectorAll("img");
	imgs.forEach((img) => {
		gsap.to(img, {
			duration: 0.5,
			ease: "power2.out",
			x: 0,
			y: 0,
		});
	});
});
