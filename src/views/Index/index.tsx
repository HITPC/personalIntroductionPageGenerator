import React from 'react';
import style from './index.module.css';

const Index: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <a className={style.author} href='https://github.com/HITPC' target='_blank'>PIAOCHEN</a>
        <a className={style.logo} href='/'>{"- Personal Introduction Page Generator -"}</a>
        <div className={style.buttonContainer}>
          <a className={style.feedbackButton}>Feedback</a>
          <a className={style.startButton}>Start</a>
        </div>
      </div>
    </div>
  )
}

export default Index;