
'use client';

import { useEffect, useState } from 'react';
import styles from './PomodoroStatus.module.scss';

export default function PomodoroStatus({
  current = 0,
  total = 0,
  sessionLengthMinutes = 25,
  mode = 'pomodoro'
}) {
  const [finishTime, setFinishTime] = useState('--:--');
  


  useEffect(() => {
    if (sessionLengthMinutes > 0) {
      const start = new Date();
      const end = new Date(start.getTime() + sessionLengthMinutes * 60000);

      const updateTime = () => {
        const hours = end.getHours().toString().padStart(2, '0');
        const minutes = end.getMinutes().toString().padStart(2, '0');
        setFinishTime(`${hours}:${minutes}`);
      };

      updateTime();
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    }
  }, [sessionLengthMinutes]);

  

 
  const getModeClass = () => {
    switch(mode.toLowerCase()) {
      case 'shortbreak': return styles.shortBreakMode;
      case 'longbreak': return styles.longBreakMode;
      default: return styles.pomodoroMode;
    }
  };

  return (
    <div className={`${styles.pomodoroContainer} ${getModeClass()}`}>
      <div className={styles.statusItem}>
        <span className={styles.label}>Pommos:</span>
        <span className={styles.value}>{current}/{total}</span>
      </div>
      <div className={styles.statusItem}>
        <span className={styles.label}>Finish At:</span>
        <span className={styles.value}>{finishTime}</span>
      </div>
    </div>
  );
}