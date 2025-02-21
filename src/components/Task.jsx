import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index, onEditTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const handleSave = () => {
    onEditTask({
      ...task,
      title,
      description,
      dueDate,
    });
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: "none",
            padding: "8px",
            margin: "0 0 8px 0",
            background: "var(--task-background)",
            border: "1px solid var(--task-border)",
            borderRadius: "4px",
            ...provided.draggableProps.style,
          }}
        >
          {isEditing ? (
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div onClick={() => setIsEditing(true)}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Due: {task.dueDate}</p>
              <button onClick={() => onDeleteTask(task.id)}>Delete</button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
