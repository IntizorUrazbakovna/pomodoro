"use client";

import { useState } from "react";

export default function TaskItem({ task, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [count, setCount] = useState(task.count);

  const handleSave = () => {
    onEdit({ ...task, title, count });
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <input
            type="number"
            value={count}
            min="1"
            onChange={(e) => setCount(Number(e.target.value))}
          />
          <button onClick={handleSave}>✅</button>
        </>
      ) : (
        <>
          <span>{task.title}</span> <span>x{task.count}</span>
          <button onClick={() => setIsEditing(true)}>✏️</button>
          <button onClick={onDelete}>🗑️</button>
        </>
      )}
    </div>
  );
}

