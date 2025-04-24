
'use client';

import { useSound } from '@/hooks/useSound';

export default function Controls() {
  const { play } = useSound('/sounds/start-sound.mp3', {
    volume: 0.5,
    loop: false,
    onend: () => console.log('Tovush tugadi')
  });

  const handleStart = () => {
    play();
  };

  return (
    <button 
      onClick={handleStart}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Start
    </button>
  );
}
import Controls from '@/app/components/Controls';

export default function Home() {
  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <Controls />
    </div>
  );
}