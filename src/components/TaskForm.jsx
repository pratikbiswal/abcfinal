import React, { useState } from "react";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [column, setColumn] = useState("column-1"); // Default to "To-Do"

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate) return;

    const newTask = {
      title,
      description,
      dueDate,
      column,
    };

    onAddTask(newTask);
    setTitle("");
    setDescription("");
    setDueDate("");
    setColumn("column-1"); // Reset to "To-Do" after submission
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select value={column} onChange={(e) => setColumn(e.target.value)}>
        <option value="column-1">To-Do</option>
        <option value="column-2">In Progress</option>
        <option value="column-3">Done</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
