import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import style from "./index.module.css";

const Index: React.FC = () => {
	const introTextContainerRef = useRef<HTMLDivElement | null>(null);
	const startButtonRef = useRef<HTMLAnchorElement | null>(null);

	useGSAP(() => {
		if (startButtonRef.current && introTextContainerRef.current) {
			const tl = gsap.timeline();
			const introTexts = introTextContainerRef.current.querySelectorAll("div");
			const duration = 0.32;
			introTexts.forEach((text, index) => {
				tl.to(
					text,
					{
						y: -4,
						opacity: 1,
						duration,
						ease: "power2.in",
					},
					index * duration
				);
			});
			tl.to(startButtonRef.current, {
				y: -4,
				opacity: 1,
				duration,
				ease: "power2.in",
			});
		}
	}, [introTextContainerRef, startButtonRef]);

	return (
		<div className={style.container}>
			<div className={style.header}>
				<a
					className={style.author}
					href="https://github.com/HITPC"
					target="_blank"
				>
					PIAOCHEN
				</a>
				<a className={style.logo} href="/">
					{"- Personal Introduction Page Generator -"}
				</a>
				<div className={style.buttonContainer}>
					<a
						className={style.feedbackButton}
						href="https://github.com/HITPC/personalIntroductionPageGenerator/issues"
						target="_blank"
					>
						Feedback
					</a>
					<a className={style.startButton} href="/edit">
						Start
					</a>
				</div>
			</div>
			<div className={style.introContainer}>
				<div className={style.introTextContainer} ref={introTextContainerRef}>
					<div className={style.introText}>Create Your Own</div>
					<div className={`${style.introText} ${style.introTextStrong}`}>
						{"< Cool >"}
					</div>
					<div className={style.introText}>Personal Introduction Page</div>
				</div>
				<a href="/edit" className={style.introStart} ref={startButtonRef}>
					START
				</a>
			</div>
		</div>
	);
};

export default Index;
