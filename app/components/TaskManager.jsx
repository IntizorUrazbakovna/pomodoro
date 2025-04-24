"use client";

import { useState } from "react";
import TaskInputCard from "./TaskInputCard";
import TaskList from "./TaskList";
import "./TaskManager.scss";

export default function TaskManager({ mode }) {
  const [tasks, setTasks] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  };

  return (
    <div className={`task-manager ${mode}`}>
      <div className="header-row">
        <h2>Tasks</h2>
        <div className="menu-icon">⋮</div>
      </div>
      <hr />
      {isAdding ? (
        <TaskInputCard onSave={handleAddTask} onCancel={() => setIsAdding(false)} />
      ) : (
        <div className="add-task-box" onClick={() => setIsAdding(true)}>
          <span>➕ Add Task</span>
        </div>
      )}

      <TaskList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}

