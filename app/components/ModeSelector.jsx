"use client";

export default function ModeSelector({ currentMode, onModeChange }) {
  const modes = [
    { name: "pomodoro", label: "Pomodoro" },
    { name: "shortBreak", label: "Short Break" },
    { name: "longBreak", label: "Long Break" },
  ];

 

  return (
    <div className="mode-selector">
      {modes.map((mode) => (
        <button
          key={mode.name}
          onClick={() => onModeChange(mode.name)}
          className={currentMode === mode.name ? "active" : ""}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
