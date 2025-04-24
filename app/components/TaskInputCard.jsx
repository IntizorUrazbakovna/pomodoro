"use client";

import { useState } from "react";
import "./TaskInputCard.scss";

export default function TaskInputCard({ onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(1);

  const handleSubmit = () => {
    if (title.trim() === "") return;
    onSave({ title, count });
    setTitle("");
    setCount(1);
  };

  return (
    <div className="task-input-card">
      <textarea
        placeholder="What are you working on?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        <label>Est Pomodoros</label>
        <div className="counter">
          <button onClick={() => setCount(Math.max(1, count - 1))}>▼</button>
          <span>{count}</span>
          <button onClick={() => setCount(count + 1)}>▲</button>
        </div>
      </div>
      <div className="actions">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
}
