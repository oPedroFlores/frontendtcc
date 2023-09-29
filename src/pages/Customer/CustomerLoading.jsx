import React from 'react';
import styles from './Customer.module.css';

const CustomerLoading = () => {
  return (
    <>
      <div className={styles.loadingP}>
        <p>Loading...</p>
      </div>
      <div className={styles.loadingWrapper}>
        <div className={styles.loadingCalendarEarsWrapper}>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
        <div className={styles.loadingCalendar}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default CustomerLoading;
