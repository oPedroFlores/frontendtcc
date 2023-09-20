import React from 'react';
import styles from '../CSS Components/Button.module.css';

const button = ({ children, ...props }) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};

export default button;
