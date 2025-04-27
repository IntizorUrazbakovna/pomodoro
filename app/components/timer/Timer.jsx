'use client';

import { useState, useEffect, useRef } from 'react';
import '../timer/Timer.scss';
import Image from "next/image";

export default function Timer({ times }) {
  const [mode, setMode] = useState('pomodoro');
  const [timeLeft, setTimeLeft] = useState(times.pomodoro * 60); // seconds formatida saqlaymiz
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);
  const tickSoundRef = useRef(null);
  const finishSoundRef = useRef(null);

  // Ovozlarni yuklash
  useEffect(() => {
    if (typeof window !== 'undefined') {
      tickSoundRef.current = new Audio("/tick.wav");
      tickSoundRef.current.volume = 0.2;
      tickSoundRef.current.playbackRate = 1.2;

      finishSoundRef.current = new Audio("/finish.wav");
      finishSoundRef.current.volume = 0.7;
    }
  }, []);

  // Ovozlarni ijro etish
  const playTick = () => {
    if (tickSoundRef.current) {
      tickSoundRef.current.pause();
      tickSoundRef.current.currentTime = 0;
      tickSoundRef.current.play().catch(err => console.error('Tick sound error:', err));
    }
  };

  const playFinish = () => {
    if (finishSoundRef.current) {
      finishSoundRef.current.pause();
      finishSoundRef.current.currentTime = 0;
      finishSoundRef.current.play().catch(err => console.error('Finish sound error:', err));
    }
  };

  // Rejimni o'zgartirish
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    clearInterval(intervalRef.current);

    let newTime;
    if (newMode === 'pomodoro') newTime = times.pomodoro * 60;
    if (newMode === 'short') newTime = times.shortBreak * 60;
    if (newMode === 'long') newTime = times.longBreak * 60;

    setTimeLeft(newTime);
  };

  // Timer boshlash/to'xtatish
  const handleStartPause = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      if (tickSoundRef.current) {
        tickSoundRef.current.pause();
        tickSoundRef.current.currentTime = 0;
      }
    } else {
      // Timer boshlanganda darhol birinchi tick
      playTick();
      
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 0) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            playFinish();
            return 0;
          }
          
          const newTime = prevTime - 1;
          // Har sekund oxirida ovoz chiqaramiz
          if (newTime > 0) {
            playTick();
          }
          return newTime;
        });
      }, 1000);
    }
    setIsRunning(prev => !prev);
  };

  // Vaqtni formatlash
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  // Tana rangini o'zgartirish
  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(mode);

    return () => {
      clearInterval(intervalRef.current);
      if (tickSoundRef.current) {
        tickSoundRef.current.pause();
        tickSoundRef.current.currentTime = 0;
      }
    };
  }, [mode]);

  // Vaqt parametrlari o'zgarganda yangilash
  useEffect(() => {
    if (mode === 'pomodoro') setTimeLeft(times.pomodoro * 60);
    if (mode === 'short') setTimeLeft(times.shortBreak * 60);
    if (mode === 'long') setTimeLeft(times.longBreak * 60);
  }, [times, mode]);

  return (
    <div className="timer-container">
      <div className="modes">
        <button className={mode === 'pomodoro' ? 'active' : ''} onClick={() => handleModeChange('pomodoro')}>
          Pomodoro
        </button>
        <button className={mode === 'short' ? 'active' : ''} onClick={() => handleModeChange('short')}>
          Short Break
        </button>
        <button className={mode === 'long' ? 'active' : ''} onClick={() => handleModeChange('long')}>
          Long Break
        </button>
      </div>

      <h1 className="time">{formatTime(timeLeft)}</h1>

      <div className="controls">
        <button onClick={handleStartPause}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
      </div>
    </div>
  );
}



