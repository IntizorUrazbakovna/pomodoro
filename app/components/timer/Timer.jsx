'use client';

import { useState, useEffect } from 'react';
import '../timer/Timer.scss';
import Image from "next/image";

export default function Timer() {
  const [mode, setMode] = useState('pomodoro');
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsRunning(false);

    if (newMode === 'pomodoro') setMinutes(25);
    if (newMode === 'short') setMinutes(5);
    if (newMode === 'long') setMinutes(15);

    setSeconds(0);
  };

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(mode);
  }, [mode]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsRunning(false);
          } else {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds]);

  const handleStartPause = () => setIsRunning((prev) => !prev);
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  return (
    <div className="timer-container">
      <div className="modes">
        <button
          className={mode === 'pomodoro' ? 'active' : ''}
          onClick={() => handleModeChange('pomodoro')}
        >
          Pomodoro
        </button>
        <button
          className={mode === 'short' ? 'active' : ''}
          onClick={() => handleModeChange('short')}
        >
          Short Break
        </button>
        <button
          className={mode === 'long' ? 'active' : ''}
          onClick={() => handleModeChange('long')}
        >
          Long Break
        </button>
      </div>

      <h1 className="time">{formatTime(minutes)}:{formatTime(seconds)}</h1>

      <div className="controls">
        <button onClick={handleStartPause}>
          {isRunning ? 'Pause' : 'Start'}
        </button>

        {isRunning && mode === 'pomodoro' && (
          <button className="mode-switch" onClick={() => handleModeChange('short')}>
            <Image src="/next.png" alt="Next" width={22} height={22} />
          </button>
        )}

        {isRunning && (mode === 'short' || mode === 'long') && (
          <button className="mode-switch" onClick={() => handleModeChange('pomodoro')}>
            <Image src="/next.png" alt="Next" width={22} height={22} />
          </button>
        )}
      </div>
    </div>
  );
}
