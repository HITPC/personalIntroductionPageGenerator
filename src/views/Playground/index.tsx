import React from 'react';
import Loading from '@/router/components/Loading';
import style from './index.module.css';

const Playground: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.itemContainer}>
        <Loading />
      </div>
    </div>
  )
}

export default Playground;