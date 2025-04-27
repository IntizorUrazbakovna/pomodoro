'use client';

import { useState } from 'react';
import Header from './header/Header';
import Timer from './timer/Timer';

export default function Landing() {
  const [times, setTimes] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  });

  return (
    <>
      <Header setTimes={setTimes} />
      <Timer times={times} />
    </>
  );
}

