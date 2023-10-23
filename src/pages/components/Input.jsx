import React from 'react';
import styles from '../CSS Components/Input.module.css';

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  max,
  min,
  error,
  onBlur,
  validate,
}) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        max={max}
        min={min}
        onBlur={onBlur}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
