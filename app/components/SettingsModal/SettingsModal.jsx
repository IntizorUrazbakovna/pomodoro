'use client';

import { useState } from 'react';
import styles from './SettingsModal.module.scss';

export default function SettingsModal({ onClose, onSave }) {
  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);

  const handleSave = () => {
    onSave({
      pomodoro,
      shortBreak,
      longBreak
    });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>SETTING</h2>
        <div>
          <h3>TIMER</h3>
          <label>Pomodoro</label>
          <input type="number" value={pomodoro} onChange={(e) => setPomodoro(Number(e.target.value))} />
          <label>Short Break</label>
          <input type="number" value={shortBreak} onChange={(e) => setShortBreak(Number(e.target.value))} />
          <label>Long Break</label>
          <input type="number" value={longBreak} onChange={(e) => setLongBreak(Number(e.target.value))} />
        </div>
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}
