"use client";

import { useState, useRef, useEffect } from "react";
import TaskInputCard from "./TaskInputCard";
import TaskList from "./TaskList";
import "./TaskManager.scss";
import Image from 'next/image';

export default function TaskManager({ mode }) {
  const [tasks, setTasks] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Dropdown menyuni tashqariga bosilganda yopish
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const clearFinishedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
    setShowDropdown(false);
  };

  const clearAllTasks = () => {
    setTasks([]);
    setShowDropdown(false);
  };

  return (
    <div className={`task-manager ${mode}`}>
      <div className="header-row">
        <h2>Tasks</h2>
        <div 
          className="menu-icon" 
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(!showDropdown);
          }}
          ref={dropdownRef}
        >
          ⋮
          {showDropdown && (

           <div className="dropdown-menu">
           <div className="dropdown-item" onClick={clearFinishedTasks}>
             <Image src="/trash1.png" alt="Trash" width={20} height={20} />
             <span>Clear finished tasks</span>
           </div>
         
           <div className="dropdown-item" onClick={clearAllTasks}>
             <Image src="/trash2.png" alt="Trash" width={20} height={20} />
             <span>Clear all tasks</span>
           </div>
         </div>
         
          )}
        </div>
      </div>
      <hr />
      {isAdding ? (
        <TaskInputCard onSave={handleAddTask} onCancel={() => setIsAdding(false)} />
      ) : (
        <div className="add-task-box" onClick={() => setIsAdding(true)}>
          <span>➕ Add Task</span>
        </div>
      )}

      <TaskList 
        tasks={tasks} 
        onDelete={handleDelete} 
        onEdit={handleEdit}
        onToggleComplete={toggleTaskCompletion}
      />
    </div>
  );
}

