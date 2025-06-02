import React from 'react';
import Loading from '@/components/Loading';
import PIGGInput from '@/components/PIGGInput';
import style from './index.module.css';

const Playground: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.itemContainer}>
        <Loading />
      </div>
      <div className={style.itemContainer}>
        <PIGGInput />
      </div>
      <div className={style.placeholder}></div>
    </div>
  )
}

export default Playground;