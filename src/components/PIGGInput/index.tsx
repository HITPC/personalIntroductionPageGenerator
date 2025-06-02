import React, { forwardRef } from 'react';
import styles from './index.module.css';

// 定义 props 类型
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style' | 'className'> {
  style?: React.CSSProperties;
  className?: string;
}

const PIGGInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { 
    style = {}, 
    className = '', 
    ...rest 
  } = props;

  return (
    <input
      ref={ref}
      className={`${styles.pigginput} ${className}`}
      style={{...style}}
      {...rest}
    />
  );
});

export default PIGGInput;