import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import style from './index.module.css'

const Loading: React.FC = () => {
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);

  useGSAP(()=>{
    if(textContainerRef.current){
      const texts = textContainerRef.current.querySelectorAll('p');
      const texttl = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });
      const interval = 0.2; // 各字母跳跃时间间隔
      const duration = 0.2; // 单个动画持续时间
      texts.forEach((text, index)=>{
        // 分开设置每个字母上跳下落各自的动画
        texttl.to(text, {
          y: -8, // 距离
          duration,
          ease: 'power1.inOut',
        }, index * interval); // 依次播放
        // 下落
        texttl.to(text, {
          y: 0,
          duration,
          ease: 'power1.inOut',
        }, index * interval + duration); // 下落开始时间 = 上跳结束时间
      });
    }

    if(circleRef.current){
      const circleTl = gsap.timeline({ repeat: -1 });
      circleTl.to(circleRef.current, {
        rotate: -15,
        duration: 0.2,
        ease: "power1.inOut",
      }, 0);
      circleTl.to(circleRef.current, {
        rotate: 285,
        duration: 1,
        ease: "power1.inOut",
      }, 0.2);
      circleTl.to(circleRef.current, {
        rotate: 255,
        duration: 0.2,
        ease: "power1.inOut",
      }, 1.2);
      circleTl.to(circleRef.current, {
        rotate: 720,
        duration: 1,
        ease: "power1.inOut",
      }, 1.45);
    }
  }, [textContainerRef, circleRef])

  return (
    <div className={style.container}>
      <div ref={circleRef} className={style.circleContainer}>
        <Loading3QuartersOutlined className={style.circle} />
      </div>
      <div ref={textContainerRef} className={style.textContainer}>
        <p className={style.text}>P</p>
        <p className={style.text}>L</p>
        <p className={style.text}>E</p>
        <p className={style.text}>A</p>
        <p className={style.text}>S</p>
        <p className={style.text}>E</p>
        <p className={style.text}></p>
        <p className={style.text}>W</p>
        <p className={style.text}>A</p>
        <p className={style.text}>I</p>
        <p className={style.text}>T</p>
      </div>
    </div>
  )
}

export default Loading;