"use client";

import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onEdit }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={() => onDelete(task.id)}
          onEdit={(updated) => onEdit(task.id, updated)}
        />
      ))}
    </div>
  );
}



